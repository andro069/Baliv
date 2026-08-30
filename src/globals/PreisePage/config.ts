import type { GlobalConfig } from 'payload'

export const PreisePage: GlobalConfig = {
  slug: 'preise-page',
  label: 'Preise-Seite',
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  admin: {
    group: 'Seiten-Inhalte',
  },
  fields: [
    {
      name: 'hero',
      label: 'Hero',
      type: 'group',
      fields: [
        {
          name: 'headline',
          label: 'Überschrift',
          type: 'text',
          defaultValue: 'Transparent. Direkt vom Bauträger.',
        },
        {
          name: 'description',
          label: 'Beschreibung',
          type: 'textarea',
          defaultValue:
            'Keine Maklergebühren, keine versteckten Kosten. MwSt. ist im Kaufpreis enthalten. Frühbucherpreise gelten bis zur Baugenehmigung im Oktober 2026.',
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
        { name: 'tag', label: 'Tag', type: 'text' },
        { name: 'size', label: 'Größe', type: 'text' },
        { name: 'pricePerSqm', label: 'Preis pro m²', type: 'text' },
        { name: 'units', label: 'Einheiten', type: 'text' },
        { name: 'highlight', label: 'Hervorheben', type: 'checkbox', defaultValue: false },
        { name: 'exampleSize', label: 'Beispiel Größe (m²)', type: 'number' },
        { name: 'examplePrice', label: 'Beispiel Preis (€)', type: 'number' },
        {
          name: 'floorplan',
          label: 'Grundriss',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'features',
          label: 'Merkmale',
          type: 'array',
          fields: [
            { name: 'label', label: 'Merkmal', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'paymentSteps',
      label: 'Zahlungsplan',
      type: 'array',
      fields: [
        { name: 'step', label: 'Schritt (z.B. 01)', type: 'text', required: true },
        { name: 'date', label: 'Datum', type: 'text' },
        { name: 'label', label: 'Bezeichnung', type: 'text', required: true },
        { name: 'amount', label: 'Betrag (z.B. 40 %)', type: 'text', required: true },
        { name: 'note', label: 'Hinweis', type: 'text' },
      ],
    },
    {
      name: 'included',
      label: 'Im Kaufpreis enthalten',
      type: 'array',
      fields: [
        { name: 'label', label: 'Bezeichnung', type: 'text', required: true },
        { name: 'included', label: 'Enthalten', type: 'checkbox', defaultValue: true },
        { name: 'note', label: 'Hinweis', type: 'text' },
      ],
    },
  ],
}
