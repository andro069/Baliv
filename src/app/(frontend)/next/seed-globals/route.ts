import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

// Seed Header and Footer globals with default data.
// Call once: GET /next/seed-globals?secret=<PAYLOAD_SECRET>
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const secret = searchParams.get('secret')

  if (secret !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payload = await getPayload({ config })

  await Promise.all([
    payload.updateGlobal({
      slug: 'header',
      data: {
        navItems: [
          { label: 'Projekt', href: '/projekt' },
          { label: 'Lage', href: '/lage' },
          { label: 'Architektur', href: '/architektur' },
          { label: 'Wohnungen', href: '/wohnungen' },
          { label: 'Investment', href: '/investment' },
          { label: 'Preise', href: '/preise' },
          { label: 'FAQ', href: '/faq' },
          { label: 'Kontakt', href: '#kontakt' },
        ],
      },
    }),
    payload.updateGlobal({
      slug: 'footer',
      data: {
        address: 'Bjeliši BB · 85000 Bar, Montenegro',
        copyright: '© 2026 Real Living d.o.o. · Baliv Residence, Bar, Montenegro',
        legalLinks: [
          { label: 'Impressum', href: '/impressum' },
          { label: 'Datenschutz', href: '/datenschutz' },
        ],
      },
    }),
  ])

  return NextResponse.json({ ok: true, message: 'Header and Footer seeded successfully' })
}
