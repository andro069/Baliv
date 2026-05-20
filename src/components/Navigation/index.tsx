import { getPayload } from 'payload'
import config from '@payload-config'
import { NavigationClient } from './NavigationClient'

const defaultNavItems = [
  { label: 'Lage', href: '/lage' },
  { label: 'Architektur', href: '/architektur' },
  { label: 'Wohnungen', href: '/wohnungen' },
  { label: 'Investment', href: '/investment' },
  { label: 'Preise', href: '/preise' },
  { label: 'Kontakt', href: '/kontakt' },
]

export async function Navigation() {
  const payload = await getPayload({ config })
  const header = await payload.findGlobal({ slug: 'header' }).catch(() => null)

  const navItems =
    header?.navItems && header.navItems.length > 0
      ? (header.navItems as { label: string; href: string }[])
      : defaultNavItems

  return <NavigationClient navItems={navItems} />
}
