import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

function fillTemplate(template: string, vars: Record<string, string>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => vars[key] ?? '')
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Neues Format vom Form-Builder: { formId, data, labels }.
    // Das alte Flach-Format bleibt als Rückfallebene erhalten.
    const data: Record<string, unknown> = body.data ?? body
    const labels: Record<string, string> = body.labels ?? body._labels ?? {}
    const formId = body.formId

    const str = (v: unknown) => (v === undefined || v === null ? '' : String(v))
    const name = str(data.name)
    const email = str(data.email)
    const phone = str(data.phone)
    const nachricht = str(data.nachricht)
    const expose = Boolean(data.expose)

    if (!name || !email) {
      return NextResponse.json({ error: 'Name und E-Mail sind pflicht.' }, { status: 400 })
    }

    const payload = await getPayload({ config })

    // Auswahlfelder speichern einen Wert (z. B. "penthouse"); für Mail und
    // Anfragenliste soll aber die Beschriftung stehen ("Penthouse (ab 85 m²)").
    let form: any = null
    if (formId) {
      try {
        form = await payload.findByID({ collection: 'forms', id: formId, depth: 0 })
      } catch {
        /* Formular gelöscht — dann bleibt es beim Rohwert. */
      }
    }
    const optionLabel = (feldName: string, wert: string): string => {
      const feld = (form?.fields ?? []).find((x: any) => x?.name === feldName)
      const opt = (feld?.options ?? []).find((o: any) => o?.value === wert)
      return opt?.label ?? wert
    }

    const interesse = data.interesse ? optionLabel('interesse', str(data.interesse)) : ''

    // Alles ausser den festen Spalten — damit ein im Backend ergänztes Feld
    // ohne Code-Änderung in Mail und Anfrage landet.
    const STANDARD_KEYS = ['name', 'email', 'phone', 'interesse', 'nachricht', 'expose']
    const zusatzFelder = Object.entries(data)
      .filter(([k, v]) => !STANDARD_KEYS.includes(k) && v !== '' && v !== null && v !== undefined)
      .map(([k, v]) => ({
        feld: labels[k] || k,
        wert: typeof v === 'boolean' ? (v ? 'Ja' : 'Nein') : optionLabel(k, String(v)),
      }))

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

    // Zusätzlich in die Einsendungen des Form-Builders, damit jedes unter
    // „Forms" angelegte Formular seine Einsendungen dort gesammelt hat.
    if (formId) {
      try {
        await payload.create({
          collection: 'form-submissions',
          data: {
            form: formId,
            submissionData: Object.entries(data).map(([field, value]) => ({
              field,
              value: typeof value === 'boolean' ? (value ? 'Ja' : 'Nein') : String(value ?? ''),
            })),
          },
          // Die Mails verschickt diese Route bereits selbst.
          context: { disableEmails: true },
        })
      } catch (subErr) {
        console.error('Form submission save error:', subErr)
      }
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Kontakt API error:', err)
    return NextResponse.json({ error: 'Serverfehler.' }, { status: 500 })
  }
}
