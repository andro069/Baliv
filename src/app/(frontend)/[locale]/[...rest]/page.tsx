import { notFound } from 'next/navigation'

/** Unbekannte Adressen innerhalb einer Sprache zeigen die 404-Seite dieser Sprache. */
export default function UnbekannteSeite() {
  notFound()
}
