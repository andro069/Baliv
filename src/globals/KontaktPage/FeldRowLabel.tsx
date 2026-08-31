'use client'

import { useRowLabel } from '@payloadcms/ui'

const TYP_LABEL: Record<string, string> = {
  text: 'Text',
  email: 'E-Mail',
  tel: 'Telefon',
  number: 'Zahl',
  textarea: 'Mehrzeilig',
  auswahl: 'Auswahl',
  dropdown: 'Aufklappliste',
  checkbox: 'Ja/Nein',
}

export const FeldRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{
    label?: string
    key?: string
    typ?: string
    pflichtfeld?: boolean
  }>()

  const nr = String((rowNumber ?? 0) + 1).padStart(2, '0')
  const name = data?.label || data?.key || 'Neues Feld'
  const typ = data?.typ ? TYP_LABEL[data.typ] ?? data.typ : ''
  const pflicht = data?.pflichtfeld ? ' · Pflichtfeld' : ''

  return <span>{`${nr} — ${name}${typ ? ` (${typ})` : ''}${pflicht}`}</span>
}
