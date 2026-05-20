// Run: npx payload run seed-globals.mjs
import { getPayload } from 'payload'
import config from './src/payload.config.ts'

const payload = await getPayload({ config })

console.log('Seeding Header...')
await payload.updateGlobal({
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
})

console.log('Seeding Footer...')
await payload.updateGlobal({
  slug: 'footer',
  data: {
    address: 'Bjeliši BB · 85000 Bar, Montenegro',
    copyright: '© 2026 Real Living d.o.o. · Baliv Residence, Bar, Montenegro',
    legalLinks: [
      { label: 'Impressum', href: '/impressum' },
      { label: 'Datenschutz', href: '/datenschutz' },
    ],
  },
})

console.log('Done!')
process.exit(0)
