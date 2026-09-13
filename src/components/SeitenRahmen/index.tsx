'use client'

import React, { createContext, useContext } from 'react'

import type { Locale } from '@/i18n/config'
import type { UiTexte } from '@/i18n/ui'

type Link = { label: string; href: string }

/** Vom Layout je Sprache geladen; Links sind bereits in die Sprache übersetzt. */
export type Rahmen = {
  locale: Locale
  sprachen: Locale[]
  ui: UiTexte
  navItems: Link[]
  footer: { copyright: string; legalLinks: Link[] }
}

const RahmenContext = createContext<Rahmen | null>(null)

export function RahmenProvider({ value, children }: { value: Rahmen; children: React.ReactNode }) {
  return <RahmenContext.Provider value={value}>{children}</RahmenContext.Provider>
}

export function useRahmen(): Rahmen {
  const rahmen = useContext(RahmenContext)
  if (!rahmen) throw new Error('useRahmen außerhalb des Layouts unter app/(frontend)/[locale]')
  return rahmen
}
