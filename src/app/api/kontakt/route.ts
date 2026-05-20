import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, interesse, nachricht, expose } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Name und E-Mail sind pflicht.' }, { status: 400 })
    }

    // Build plain-text email body
    const lines = [
      `Neue Anfrage über baliv-residence.com`,
      ``,
      `Name:      ${name}`,
      `E-Mail:    ${email}`,
      `Telefon:   ${phone || '—'}`,
      `Interesse: ${interesse || '—'}`,
      `Exposé:    ${expose ? 'Ja, gewünscht' : 'Nein'}`,
      ``,
      `Nachricht:`,
      nachricht || '—',
    ].join('\n')

    const subject = expose
      ? `Exposé-Anfrage von ${name}`
      : `Kontaktanfrage von ${name}`

    // Send via Resend (or fall through to console in dev)
    const RESEND_API_KEY = process.env.RESEND_API_KEY
    const TO_EMAIL = process.env.CONTACT_EMAIL || 'info@baliv-residence.com'

    if (RESEND_API_KEY) {
      const res = await fetch('https://api.resend.com/emails', {
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

      if (!res.ok) {
        const err = await res.text()
        console.error('Resend error:', err)
        return NextResponse.json({ error: 'E-Mail konnte nicht gesendet werden.' }, { status: 500 })
      }
    } else {
      // Dev fallback — log to console
      console.log('\n📬 Kontaktformular-Einsendung:\n', lines)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Kontakt API error:', err)
    return NextResponse.json({ error: 'Serverfehler.' }, { status: 500 })
  }
}
