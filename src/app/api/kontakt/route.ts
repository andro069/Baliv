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

    // Einstellungen zum abgeschickten Formular. Ältere Einträge ohne
    // Verknüpfung greifen weiter über die Formular-ID.
    const formConfigResult = await payload.find({
      collection: 'form-configs' as any,
      where: formId
        ? { or: [{ form: { equals: formId } }, { formSlug: { equals: 'kontakt' } }] }
        : { formSlug: { equals: 'kontakt' } },
      // depth: 1, damit der Anhang mit url und filename mitkommt.
      depth: 1,
      limit: 10,
    })
    const docs = formConfigResult.docs as any[]
    // Ein direkt verknüpfter Eintrag hat Vorrang vor der Rückfallebene.
    const formConfig =
      docs.find((d) => {
        const linked = typeof d.form === 'object' ? d.form?.id : d.form
        return linked && String(linked) === String(formId)
      }) ?? docs[0]

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

        // Anhang, sofern hinterlegt. Standardmässig nur, wenn der Interessent
        // das Exposé-Häkchen gesetzt hat.
        const anhang = formConfig.autoresponderAnhang
        const nurMitExpose = formConfig.autoresponderNurMitExpose !== false
        if (anhang?.url && (expose || !nurMitExpose)) {
          try {
            const url = anhang.url.startsWith('http')
              ? anhang.url
              : new URL(anhang.url, req.nextUrl.origin).toString()
            const pdfRes = await fetch(url)
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
