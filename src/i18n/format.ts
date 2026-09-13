import type { Locale } from './config'

/** Intl-Locale für Zahlen: DE „2.500 €“, EN „€2,500“, ME „2.500 €“, TR „€2.500“. */
export const intlLocale: Record<Locale, string> = {
  de: 'de-DE',
  en: 'en-GB',
  me: 'sr-Latn-ME',
  tr: 'tr-TR',
}

export function formatZahl(wert: number, locale: Locale, optionen?: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat(intlLocale[locale], optionen).format(wert)
}

export function formatEuro(wert: number, locale: Locale, nachkommastellen = 0): string {
  return new Intl.NumberFormat(intlLocale[locale], {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: nachkommastellen,
    maximumFractionDigits: nachkommastellen,
  }).format(wert)
}

/** CMS-Text oder Rückfallwert — auch leere Felder fallen zurück. */
export function text(value: unknown, fallback: string): string {
  return typeof value === 'string' && value.trim() ? value : fallback
}

/** Setzt Platzhalter wie `{wochen}` in eine im Backend gepflegte Vorlage ein. */
export function fuelle(vorlage: string, werte: Record<string, string | number>): string {
  return vorlage.replace(/\{(\w+)\}/g, (platzhalter, name: string) =>
    name in werte ? String(werte[name]) : platzhalter,
  )
}
