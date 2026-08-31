import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

function fillTemplate(template: string, vars: Record<string, string>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => vars[key] ?? '')
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, interesse, nachricht, expose, _labels } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Name und E-Mail sind pflicht.' }, { status: 400 })
    }

    // Felder, die der Kunde im Backend ergänzt hat — alles ausser den festen Spalten.
    const STANDARD_KEYS = ['name', 'email', 'phone', 'interesse', 'nachricht', 'expose', '_labels']
    const labels: Record<string, string> = _labels ?? {}
    const zusatzFelder = Object.entries(body)
      .filter(([k, v]) => !STANDARD_KEYS.includes(k) && v !== '' && v !== null && v !== undefined)
      .map(([k, v]) => ({
        feld: labels[k] || k,
        wert: typeof v === 'boolean' ? (v ? 'Ja' : 'Nein') : String(v),
      }))

    const payload = await getPayload({ config })

    // Load form config for "kontakt"
    const formConfigResult = await payload.find({
      collection: 'form-configs' as any,
      where: { formSlug: { equals: 'kontakt' } },
      limit: 1,
    })
    const formConfig = formConfigResult.docs[0] as any | undefined

    const TO_EMAIL =
      formConfig?.benachrichtigungsEmail ||
      process.env.CONTACT_EMAIL ||
      'info@baliv-residence.com'

    // Build admin notification email
    const lines = [
      `Neue Anfrage über baliv-residence.com`,
      ``,
      `${(labels.name || 'Name').padEnd(10)} ${name}`,
      `${(labels.email || 'E-Mail').padEnd(10)} ${email}`,
      `${(labels.phone || 'Telefon').padEnd(10)} ${phone || '—'}`,
      `${(labels.interesse || 'Interesse').padEnd(10)} ${interesse || '—'}`,
      `${'Exposé'.padEnd(10)} ${expose ? 'Ja, gewünscht' : 'Nein'}`,
      ...(zusatzFelder.length
        ? ['', ...zusatzFelder.map((z) => `${z.feld}: ${z.wert}`)]
        : []),
      ``,
      `${labels.nachricht || 'Nachricht'}:`,
      nachricht || '—',
    ].join('\n')

    const subject = expose ? `Exposé-Anfrage von ${name}` : `Kontaktanfrage von ${name}`

    const RESEND_API_KEY = process.env.RESEND_API_KEY

    if (RESEND_API_KEY) {
      // 1. Send internal notification
      const notifyRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Baliv Residence <noreply@baliv-residence.com>',
          to: [TO_EMAIL],
          reply_to: email,
          subject,
          text: lines,
        }),
      })

      if (!notifyRes.ok) {
        const err = await notifyRes.text()
        console.error('Resend notification error:', err)
        return NextResponse.json({ error: 'E-Mail konnte nicht gesendet werden.' }, { status: 500 })
      }

      // 2. Send autoresponder if configured
      if (formConfig?.autoresponderAktiv && formConfig.autoresponderBetreff && formConfig.autoresponderNachricht) {
        const vars: Record<string, string> = {
          name: name || '',
          email: email || '',
          interesse: interesse || '',
          nachricht: nachricht || '',
        }

        const arSubject = fillTemplate(formConfig.autoresponderBetreff, vars)
        const arBody = fillTemplate(formConfig.autoresponderNachricht, vars)

        const arPayload: Record<string, any> = {
          from: 'Baliv Residence <noreply@baliv-residence.com>',
          to: [email],
          subject: arSubject,
          text: arBody,
        }

        // Attach PDF if configured
        const anhang = formConfig.autoresponderAnhang
        if (anhang?.url) {
          try {
            const pdfRes = await fetch(anhang.url)
            if (pdfRes.ok) {
              const buffer = await pdfRes.arrayBuffer()
              arPayload.attachments = [
                {
                  filename: anhang.filename || 'Expose-Baliv-Residence.pdf',
                  content: Buffer.from(buffer).toString('base64'),
                },
              ]
            }
          } catch (attachErr) {
            console.error('Attachment fetch error:', attachErr)
          }
        }

        const arRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(arPayload),
        })

        if (!arRes.ok) {
          console.error('Resend autoresponder error:', await arRes.text())
        }
      }
    } else {
      console.log('\n📬 Kontaktformular-Einsendung:\n', lines)
    }

    // Save to Payload DB
    try {
      await payload.create({
        collection: 'contact-submissions' as any,
        data: {
          name,
          email,
          phone: phone || '',
          interesse: interesse || '',
          nachricht: nachricht || '',
          expose: Boolean(expose),
          ...(zusatzFelder.length ? { weitereAngaben: zusatzFelder } : {}),
        },
      })
    } catch (dbErr) {
      console.error('DB save error:', dbErr)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Kontakt API error:', err)
    return NextResponse.json({ error: 'Serverfehler.' }, { status: 500 })
  }
}
