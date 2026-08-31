import type { GlobalConfig } from 'payload'
import { revalidatePages } from '@/utilities/revalidatePages'

export const WohnungenPage: GlobalConfig = {
  slug: 'wohnungen-page',
  label: 'Wohnungen-Seite',
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  admin: {
    group: 'Seiten-Inhalte',
  },
  fields: [
    {
      name: 'meta',
      label: 'SEO / Meta-Angaben',
      type: 'group',
      fields: [
        {
          name: 'title',
          label: 'Seitentitel (Browser-Tab)',
          type: 'text',
          defaultValue: 'Die Wohnungen — Baliv Residence, Bar Montenegro',
        },
        {
          name: 'description',
          label: 'Meta-Beschreibung',
          type: 'textarea',
          defaultValue:
            'Studio, Zweizimmer und Penthouse. 39 Einheiten, schlüsselfertig ab 2.500 €/m². Hochwertige Ausstattung mit Hansgrohe und LG. Fertigstellung Q1 2028.',
        },
      ],
    },
    {
      name: 'hero',
      label: 'Hero',
      type: 'group',
      fields: [
        {
          name: 'eyebrow',
          label: 'Kleine Überschrift',
          type: 'text',
          defaultValue: 'Die Wohnungen',
        },
        {
          name: 'headline',
          label: 'Überschrift',
          type: 'text',
          defaultValue: 'Drei Typen. Ihre Wahl.',
        },
        {
          name: 'description',
          label: 'Beschreibung',
          type: 'textarea',
          defaultValue:
            '39 Einheiten in sieben Geschossen — vom kompakten Studio bis zur großzügigen Dachgeschosswohnung mit Panoramablick.',
        },
        {
          name: 'image',
          label: 'Hintergrundbild',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'buildingStats',
      label: 'Kennzahlen-Leiste (unter dem Hero)',
      type: 'array',
      maxRows: 4,
      fields: [
        { name: 'value', label: 'Wert', type: 'text', required: true },
        { name: 'label', label: 'Bezeichnung', type: 'text', required: true },
      ],
    },
    {
      name: 'typesSection',
      label: 'Wohnungstypen (Sektions-Texte)',
      type: 'group',
      fields: [
        {
          name: 'eyebrow',
          label: 'Kleine Überschrift',
          type: 'text',
          defaultValue: 'Grundrisse & Details',
        },
        {
          name: 'headline',
          label: 'Überschrift (erste Zeile)',
          type: 'text',
          defaultValue: 'Drei Wohnungstypen.',
        },
        {
          name: 'headlineLine2',
          label: 'Überschrift (zweite Zeile)',
          type: 'text',
          defaultValue: 'Sieben Geschosse.',
        },
        {
          name: 'unitsLabel',
          label: 'Label über Einheiten-Zahl',
          type: 'text',
          defaultValue: 'Einheiten',
        },
        {
          name: 'priceLabel',
          label: 'Label über Preis',
          type: 'text',
          defaultValue: 'Preis',
        },
        {
          name: 'exampleNote',
          label: 'Hinweis unter dem Beispielpreis',
          type: 'text',
          defaultValue: 'Frühbucher · inkl. MwSt. · ohne Makler',
        },
        {
          name: 'ctaLabel',
          label: 'Button-Text je Wohnungstyp',
          type: 'text',
          defaultValue: 'Exposé anfragen',
        },
      ],
    },
    {
      name: 'types',
      label: 'Wohnungstypen',
      type: 'array',
      minRows: 3,
      maxRows: 3,
      fields: [
        { name: 'nr', label: 'Nummer', type: 'text', required: true },
        { name: 'type', label: 'Typ', type: 'text', required: true },
        { name: 'tag', label: 'Tag (z.B. Erdgeschoss)', type: 'text' },
        { name: 'size', label: 'Größe (z.B. 28–30 m²)', type: 'text' },
        { name: 'terrace', label: 'Terrasse/Balkon', type: 'text' },
        { name: 'units', label: 'Einheiten', type: 'text' },
        { name: 'price', label: 'Preis (z.B. ab 2.500 €/m²)', type: 'text' },
        { name: 'layout', label: 'Grundriss-Beschreibung', type: 'text' },
        { name: 'description', label: 'Beschreibung', type: 'textarea' },
        { name: 'exampleSize', label: 'Beispiel Größe (m²)', type: 'number' },
        { name: 'examplePrice', label: 'Beispiel Preis (€)', type: 'number' },
        {
          name: 'floorplan',
          label: 'Grundriss',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'image',
          label: 'Bild',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'ausstattungSection',
      label: 'Ausstattung (Sektions-Texte)',
      type: 'group',
      fields: [
        {
          name: 'eyebrow',
          label: 'Kleine Überschrift',
          type: 'text',
          defaultValue: 'Ausstattung',
        },
        {
          name: 'headline',
          label: 'Überschrift (weißer Teil)',
          type: 'text',
          defaultValue: 'Schlüsselfertig übergeben.',
        },
        {
          name: 'headlineAccent',
          label: 'Überschrift (goldener Teil)',
          type: 'text',
          defaultValue: 'Hochwertig ausgestattet.',
        },
        {
          name: 'description',
          label: 'Beschreibung',
          type: 'textarea',
          defaultValue:
            'Jede Wohnung wird vollständig fertiggestellt übergeben — mit geprüften Markenprodukten, die dem mitteleuropäischen Qualitätsstandard entsprechen.',
        },
        {
          name: 'premiumTitle',
          label: 'Titel der Premium-Box',
          type: 'text',
          defaultValue: 'Premium-Paket optional',
        },
      ],
    },
    {
      name: 'premiumPaket',
      label: 'Premium-Paket (Punkte in der Box)',
      type: 'array',
      fields: [{ name: 'label', label: 'Text', type: 'text', required: true }],
    },
    {
      name: 'interiorImages',
      label: 'Interieur-Bilder (3 Stück unter der Ausstattung)',
      type: 'array',
      maxRows: 3,
      fields: [
        { name: 'image', label: 'Bild', type: 'upload', relationTo: 'media' },
        { name: 'alt', label: 'Bildunterschrift / Alt-Text', type: 'text', required: true },
      ],
    },
    {
      name: 'gebaeude',
      label: 'Das Gebäude (Sektion)',
      type: 'group',
      fields: [
        {
          name: 'eyebrow',
          label: 'Kleine Überschrift',
          type: 'text',
          defaultValue: 'Das Gebäude',
        },
        {
          name: 'headline',
          label: 'Überschrift',
          type: 'text',
          defaultValue: 'Mehr als vier Wände.',
        },
        {
          name: 'image',
          label: 'Sektionsbild',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'gebaeudeFeatures',
      label: 'Gebäude-Merkmale',
      type: 'array',
      fields: [
        { name: 'title', label: 'Titel', type: 'text', required: true },
        { name: 'text', label: 'Text', type: 'textarea' },
      ],
    },
    {
      name: 'cta',
      label: 'CTA-Sektion (unten)',
      type: 'group',
      fields: [
        {
          name: 'eyebrow',
          label: 'Kleine Überschrift',
          type: 'text',
          defaultValue: 'Jetzt anfragen',
        },
        {
          name: 'headline',
          label: 'Überschrift',
          type: 'text',
          defaultValue: 'Interesse an einer Einheit?',
        },
        {
          name: 'description',
          label: 'Beschreibung',
          type: 'textarea',
          defaultValue:
            'Vollständiges Exposé mit allen Grundrissen, Preisliste und aktueller Verfügbarkeit — direkt vom Bauträger, deutschsprachig, ohne Makler.',
        },
        {
          name: 'buttonLabel',
          label: 'Button-Text (primär)',
          type: 'text',
          defaultValue: 'Exposé anfordern',
        },
        {
          name: 'buttonLink',
          label: 'Button-Link (primär)',
          type: 'text',
          defaultValue: '/kontakt',
        },
        {
          name: 'whatsappLabel',
          label: 'WhatsApp-Button-Text',
          type: 'text',
          defaultValue: 'WhatsApp',
        },
        {
          name: 'whatsappUrl',
          label: 'WhatsApp-Link',
          type: 'text',
          defaultValue:
            'https://wa.me/38268517873?text=Guten%20Tag%2C%20ich%20interessiere%20mich%20f%C3%BCr%20eine%20Wohnung%20bei%20Baliv%20Residence.',
        },
        {
          name: 'note',
          label: 'Hinweis unter den Buttons',
          type: 'text',
          defaultValue: 'Antwort in < 24 Stunden · Deutschsprachige Beratung · Direkt vom Bauträger',
        },
      ],
    },
    {
      name: 'ausstattung',
      label: 'Ausstattung',
      type: 'array',
      fields: [
        { name: 'brand', label: 'Marke', type: 'text', required: true },
        { name: 'label', label: 'Bezeichnung', type: 'text', required: true },
      ],
    },
    {
      name: 'included',
      label: 'Standard-Ausstattung (immer dabei)',
      type: 'array',
      fields: [
        { name: 'label', label: 'Bezeichnung', type: 'text', required: true },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidatePages(['/wohnungen'])],
  },
}
