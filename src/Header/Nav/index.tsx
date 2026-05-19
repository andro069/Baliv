'use client'

import React from 'react'
import type { Header as HeaderType } from '@/payload-types'
import Link from 'next/link'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="flex gap-3 items-center">
      {navItems.map((item, i) => (
        <Link key={i} href={item.href} className="text-sm hover:underline">
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
