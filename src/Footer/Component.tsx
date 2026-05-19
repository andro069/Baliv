import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)()
  const legalLinks = footerData?.legalLinks || []

  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white">
      <div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        <Link href="/">Baliv Residence</Link>
        <nav className="flex flex-col md:flex-row gap-4">
          {legalLinks.map((item, i) => (
            <Link className="text-white text-sm" key={i} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}
