import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

import { defaultLocale, isLocale, localeNames, type Locale } from '@/i18n/config'

function fillTemplate(template: string, vars: Record<string, string>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => vars[key] ?? '')
}

/** Fehlermeldungen an den Besucher, in der Sprache der Seite. */
const meldungen: Record<Locale, Record<'pflicht' | 'datenschutz' | 'versand' | 'server', string>> = {
  de: {
    pflicht: 'Name und E-Mail sind Pflicht.',
    datenschutz: 'Bitte stimmen Sie der Datenschutzerklärung zu.',
    versand: 'E-Mail konnte nicht gesendet werden.',
    server: 'Serverfehler.',
  },
  en: {
    pflicht: 'Name and email are required.',
    datenschutz: 'Please accept the privacy policy.',
    versand: 'The email could not be sent.',
    server: 'Server error.',
  },
  me: {
    pflicht: 'Ime i e-mail su obavezni.',
    datenschutz: 'Molimo vas da prihvatite politiku privatnosti.',
    versand: 'E-mail nije moguće poslati.',
    server: 'Greška na serveru.',
  },
  tr: {
    pflicht: 'Ad ve e-posta zorunludur.',
    datenschutz: 'Lütfen gizlilik politikasını kabul edin.',
    versand: 'E-posta gönderilemedi.',
    server: 'Sunucu hatası.',
  },
}

export async function POST(req: NextRequest) {
  let locale: Locale = defaultLocale
  try {
    const body = await req.json()

    // Sprache der Seite, auf der das Formular abgeschickt wurde. Bestimmt Formular-
    // beschriftungen, Autoresponder-Texte und das angehängte Exposé.
    if (isLocale(body.locale)) locale = body.locale

    // Neues Format vom Form-Builder: { formId, data, labels, locale }.
    // Das alte Flach-Format bleibt als Rückfallebene erhalten.
    const data: Record<string, unknown> = body.data ?? body
    const formId = body.formId

    const str = (v: unknown) => (v === undefined || v === null ? '' : String(v))
    const name = str(data.name)
    const email = str(data.email)
    const phone = str(data.phone)
    const nachricht = str(data.nachricht)
    const expose = Boolean(data.expose)

    if (!name || !email) {
      return NextResponse.json({ error: meldungen[locale].pflicht }, { status: 400 })
    }

    const payload = await getPayload({ config })

    // Das Formular zweimal: deutsch für die Mail ans Büro und die Anfragenliste,
    // in der Sprache des Besuchers für seine Bestätigungsmail.
    const ladeFormular = async (sprache: Locale): Promise<any> => {
      if (!formId) return null
      try {
        return await payload.findByID({ collection: 'forms', id: formId, depth: 0, locale: sprache })
      } catch {
        return null // Formular gelöscht — dann bleibt es beim Rohwert.
      }
    }
    const [formDe, formBesucher] = await Promise.all([
      ladeFormular(defaultLocale),
      locale === defaultLocale ? null : ladeFormular(locale),
    ])
    const form = formDe

    // Einwilligung serverseitig prüfen, sobald das Formular sie als Pflicht abfragt.
    const datenschutzPflicht = (form?.fields ?? []).some(
      (x: any) => x?.blockType === 'checkbox' && x?.name === 'datenschutz' && x?.required,
    )
    const einwilligung = data.datenschutz === true
    if (datenschutzPflicht && !einwilligung) {
      return NextResponse.json({ error: meldungen[locale].datenschutz }, { status: 400 })
    }

    // Auswahlfelder speichern einen Wert (z. B. "penthouse"); in Mails und
    // Anfragenliste soll aber die Beschriftung stehen ("Penthouse-Ebene").
    const optionLabel = (formular: any, feldName: string, wert: string): string => {
      const feld = (formular?.fields ?? []).find((x: any) => x?.name === feldName)
      const opt = (feld?.options ?? []).find((o: any) => o?.value === wert)
      return opt?.label ?? wert
    }
    // Deutsche Feldbeschriftung fürs Büro; sonst die vom Browser mitgeschickte.
    const besucherLabels: Record<string, string> = body.labels ?? body._labels ?? {}
    const labelDe = (feldName: string, standard: string): string =>
      (form?.fields ?? []).find((x: any) => x?.name === feldName)?.label ||
      besucherLabels[feldName] ||
      standard

    const interesse = data.interesse ? optionLabel(form, 'interesse', str(data.interesse)) : ''
    const interesseBesucher = data.interesse
      ? optionLabel(formBesucher ?? form, 'interesse', str(data.interesse))
      : ''

    // Alles ausser den festen Spalten — damit ein im Backend ergänztes Feld
    // ohne Code-Änderung in Mail und Anfrage landet.
    const STANDARD_KEYS = ['name', 'email', 'phone', 'interesse', 'nachricht', 'expose', 'datenschutz']
    const zusatzFelder = Object.entries(data)
      .filter(([k, v]) => !STANDARD_KEYS.includes(k) && v !== '' && v !== null && v !== undefined)
      .map(([k, v]) => ({
        feld: labelDe(k, k),
        wert: typeof v === 'boolean' ? (v ? 'Ja' : 'Nein') : optionLabel(form, k, String(v)),
      }))

    // Einstellungen zum abgeschickten Formular, in der Sprache des Besuchers.
    // Leere Übersetzungen fallen auf Deutsch zurück. Ältere Einträge ohne
    // Verknüpfung greifen weiter über die Formular-ID.
    const formConfigResult = await payload.find({
      collection: 'form-configs' as any,
      where: formId
        ? { or: [{ form: { equals: formId } }, { formSlug: { equals: 'kontakt' } }] }
        : { formSlug: { equals: 'kontakt' } },
      // depth: 1, damit der Anhang mit url und filename mitkommt.
      depth: 1,
      limit: 10,
      locale,
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

    // Mail ans Büro — immer deutsch, mit der Sprache der Anfrage.
    const lines = [
      `Neue Anfrage über baliv-residence.com`,
      ``,
      `${labelDe('name', 'Name').padEnd(10)} ${name}`,
      `${labelDe('email', 'E-Mail').padEnd(10)} ${email}`,
      `${labelDe('phone', 'Telefon').padEnd(10)} ${phone || '—'}`,
      `${labelDe('interesse', 'Interesse').padEnd(10)} ${interesse || '—'}`,
      `${'Exposé'.padEnd(10)} ${expose ? 'Ja, gewünscht' : 'Nein'}`,
      `${'Sprache'.padEnd(10)} ${localeNames[locale]}`,
      ...('datenschutz' in data ? [`Einwilligung Datenschutz: ${einwilligung ? 'Ja' : 'Nein'}`] : []),
      ...(zusatzFelder.length
        ? ['', ...zusatzFelder.map((z) => `${z.feld}: ${z.wert}`)]
        : []),
      ``,
      `${labelDe('nachricht', 'Nachricht')}:`,
      nachricht || '—',
    ].join('\n')

    const sprachHinweis = locale === defaultLocale ? '' : ` [${locale.toUpperCase()}]`
    const subject = `${expose ? 'Exposé-Anfrage' : 'Kontaktanfrage'} von ${name}${sprachHinweis}`

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
        return NextResponse.json({ error: meldungen[locale].versand }, { status: 500 })
      }

      // 2. Send autoresponder if configured
      if (formConfig?.autoresponderAktiv && formConfig.autoresponderBetreff && formConfig.autoresponderNachricht) {
        const vars: Record<string, string> = {
          name: name || '',
          email: email || '',
          interesse: interesseBesucher || '',
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

        // Anhang in der Sprache des Besuchers, sofern hinterlegt (sonst das deutsche
        // Exposé). Standardmässig nur, wenn der Interessent das Exposé-Häkchen gesetzt hat.
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
          sprache: locale,
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
            submissionData: [
              ...Object.entries(data).map(([field, value]) => ({
                field,
                value: typeof value === 'boolean' ? (value ? 'Ja' : 'Nein') : String(value ?? ''),
              })),
              { field: 'sprache', value: localeNames[locale] },
            ],
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
    return NextResponse.json({ error: meldungen[locale].server }, { status: 500 })
  }
}
