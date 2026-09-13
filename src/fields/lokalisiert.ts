import type { Field } from 'payload'

/**
 * Felder, die in jeder Sprache gleich bleiben: Links, Kontaktdaten und technische
 * Schlüssel. Links werden deutsch gepflegt und im Frontend über `localizeHref`
 * automatisch in die jeweilige Sprachadresse übersetzt.
 */
const BLEIBT_GLEICH = /(link|href|url)$|^(email|whatsapp|telefon|phone|icon|key|formSlug)$/i

/**
 * Markiert rekursiv alle Text-, Textarea- und Rich-Text-Felder als übersetzbar.
 *
 * Arrays und Gruppen selbst bleiben unübersetzt — die Struktur (Anzahl und
 * Reihenfolge der Einträge, Bilder, Zahlen) ist in allen Sprachen gleich, nur die
 * Texte darin werden je Sprache gepflegt.
 *
 * `required` entfällt bei übersetzten Feldern: Sonst ließe sich eine teilweise
 * übersetzte Seite nicht speichern. Leere Felder zeigen im Frontend den deutschen
 * Text (Payload-Fallback).
 */
export function lokalisiert(fields: Field[]): Field[] {
  return fields.map((field): Field => {
    if (field.type === 'tabs') {
      return { ...field, tabs: field.tabs.map((tab) => ({ ...tab, fields: lokalisiert(tab.fields) })) }
    }
    if ('fields' in field && Array.isArray(field.fields)) {
      return { ...field, fields: lokalisiert(field.fields) } as Field
    }
    const istText = field.type === 'text' || field.type === 'textarea' || field.type === 'richText'
    if (istText && 'name' in field && !BLEIBT_GLEICH.test(field.name) && field.localized === undefined) {
      const { required: _required, ...rest } = field as typeof field & { required?: boolean }
      return { ...rest, localized: true } as Field
    }
    return field
  })
}

/**
 * Hält ein Feld ausdrücklich unübersetzt. Für die SEO-Felder der ungenutzten
 * Vorlagen-Collections „Pages" und „Posts": Das SEO-Plugin markiert sie von sich
 * aus als übersetzbar, was mit deren Versionsverwaltung eine mehrdeutige
 * Schemaänderung erzeugt.
 */
export const nichtUebersetzt = <T extends Field>(field: T): T => ({ ...field, localized: false })
