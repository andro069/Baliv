/**
 * Deutsche Standardtexte des Globals „Website & Sprachen“. Dienen im Backend als
 * Vorbelegung und im Frontend als Rückfall, falls ein Feld leer ist.
 */

export const seoStandard = {
  titel: 'Baliv Residence — Neubau in Bar, Montenegro',
  beschreibung:
    '39 Wohneinheiten am Fuße von Stari Bar, zwischen Olivenhainen, Bergen und Meer. Ab 2.500 €/m², direkt vom Bauträger, Beratung in vier Sprachen, ohne Makler.',
  ogTitel: 'Baliv Residence — Wohnen am Fuße von Stari Bar',
  ogBeschreibung:
    '39 Einheiten zwischen Olivenhainen, Bergen und Meer. Bar, Montenegro. Ab 2.500 €/m², direkt vom Bauträger.',
  ogBildAlt: 'Baliv Residence in Bar, Montenegro',
}

export const uiStandard = {
  menueOeffnen: 'Menü öffnen',
  menueSchliessen: 'Menü schließen',
  sprachwahl: 'Sprache',
  zurueckZurStartseite: '← Zurück zur Startseite',
  whatsappNachricht: 'Guten Tag, ich interessiere mich für Baliv Residence.',
  whatsappLabel: 'WhatsApp',
  whatsappHinweis: 'Jetzt anfragen',
  whatsappAria: 'WhatsApp Kontakt',
  ab: 'ab',
  proQm: '€/m²',
  sieSindHier: 'Sie sind hier',
  grundriss: 'Grundriss',
  sliderBild: 'Bild {n}',
  bitteWaehlen: 'Bitte wählen …',
  notFoundEyebrow: 'Fehler 404',
  notFoundHeadline: 'Diese Seite gibt es nicht.',
  notFoundText:
    'Die Adresse ist vermutlich falsch geschrieben oder die Seite wurde verschoben. Von hier aus geht es weiter:',
  notFoundStartseite: 'Zur Startseite',
  notFoundWohnungen: 'Die Wohnungen',
  notFoundKontakt: 'Kontakt',
}

export type SeoTexte = typeof seoStandard
export type UiTexte = typeof uiStandard
