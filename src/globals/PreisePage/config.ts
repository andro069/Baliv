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
          name: 'eyebrow',
          label: 'Kleine Überschrift',
          type: 'text',
          defaultValue: 'Preisübersicht',
        },
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
        {
          name: 'statPrefix',
          label: 'Präfix vor den Preisen (Quick-Stats)',
          type: 'text',
          defaultValue: 'ab',
        },
        {
          name: 'extraStatValue',
          label: 'Vierte Kennzahl — Wert',
          type: 'text',
          defaultValue: '0 €',
        },
        {
          name: 'extraStatLabel',
          label: 'Vierte Kennzahl — Bezeichnung',
          type: 'text',
          defaultValue: 'Maklergebühr',
        },
      ],
    },
    {
      name: 'typesSection',
      label: 'Wohnungstypen (Sektion)',
      type: 'group',
      fields: [
        { name: 'eyebrow', label: 'Kleine Überschrift', type: 'text', defaultValue: 'Wohnungstypen' },
        { name: 'headline', label: 'Überschrift', type: 'text', defaultValue: 'Drei Typen, ein Preisniveau.' },
        {
          name: 'highlightLabel',
          label: 'Badge bei hervorgehobenem Typ',
          type: 'text',
          defaultValue: 'Meistgewählt',
        },
        { name: 'typeLabelPrefix', label: 'Präfix vor der Typ-Nummer', type: 'text', defaultValue: 'Typ' },
        { name: 'exampleLabel', label: 'Beschriftung Beispielpreis-Box', type: 'text', defaultValue: 'Beispiel' },
        {
          name: 'exampleNote',
          label: 'Hinweis unter dem Beispielpreis',
          type: 'text',
          defaultValue: 'Frühbucher · inkl. MwSt.',
        },
        { name: 'buttonLabel', label: 'Button-Text', type: 'text', defaultValue: 'Exposé anfragen' },
        { name: 'buttonLink', label: 'Button-Link', type: 'text', defaultValue: '/kontakt' },
      ],
    },
    {
      name: 'includedSection',
      label: 'Im Kaufpreis enthalten (Sektion)',
      type: 'group',
      fields: [
        { name: 'eyebrow', label: 'Kleine Überschrift', type: 'text', defaultValue: 'Im Kaufpreis' },
        { name: 'headline', label: 'Überschrift (erste Zeile)', type: 'text', defaultValue: 'Was der Preis' },
        {
          name: 'headlineAccent',
          label: 'Überschrift (zweite Zeile, goldene Farbe)',
          type: 'text',
          defaultValue: 'beinhaltet.',
        },
        {
          name: 'description',
          label: 'Beschreibung',
          type: 'textarea',
          defaultValue:
            'Alle Wohnungen werden schlüsselfertig übergeben. Was im Kaufpreis enthalten ist — und was optional hinzugebucht werden kann.',
        },
        { name: 'includedLabel', label: 'Label bei enthaltenen Punkten', type: 'text', defaultValue: 'inklusive' },
      ],
    },
    {
      name: 'paymentSection',
      label: 'Zahlungsplan (Sektion)',
      type: 'group',
      fields: [
        { name: 'eyebrow', label: 'Kleine Überschrift', type: 'text', defaultValue: 'Zahlungsplan' },
        { name: 'headline', label: 'Überschrift (erste Zeile)', type: 'text', defaultValue: 'Kapital schützen.' },
        {
          name: 'headlineAccent',
          label: 'Überschrift (zweite Zeile, goldene Farbe)',
          type: 'text',
          defaultValue: 'Schrittweise investieren.',
        },
        {
          name: 'amountNote',
          label: 'Hinweis unter dem Prozentwert',
          type: 'text',
          defaultValue: 'des Kaufpreises',
        },
      ],
    },
    {
      name: 'nebenkosten',
      label: 'Nebenkosten-Boxen (unter dem Zahlungsplan)',
      type: 'array',
      fields: [
        { name: 'label', label: 'Bezeichnung', type: 'text', required: true },
        { name: 'value', label: 'Wert', type: 'text', required: true },
        { name: 'note', label: 'Hinweis', type: 'text' },
      ],
    },
    {
      name: 'beispielSection',
      label: 'Beispielrechnung (Sektion)',
      type: 'group',
      fields: [
        { name: 'eyebrow', label: 'Kleine Überschrift', type: 'text', defaultValue: 'Beispielrechnung' },
        { name: 'headline', label: 'Überschrift (erster Teil)', type: 'text', defaultValue: 'Was kostet eine' },
        {
          name: 'headlineAccent',
          label: 'Überschrift (zweiter Teil, goldene Farbe)',
          type: 'text',
          defaultValue: 'konkret?',
        },
        { name: 'rowArea', label: 'Zeile: Wohnfläche', type: 'text', defaultValue: 'Wohnfläche' },
        { name: 'rowPricePerSqm', label: 'Zeile: Preis pro m²', type: 'text', defaultValue: 'Preis/m²' },
        { name: 'rowPurchase', label: 'Zeile: Kaufpreis', type: 'text', defaultValue: 'Kaufpreis' },
        {
          name: 'rowExtraCosts',
          label: 'Zeile: Nebenkosten',
          type: 'text',
          defaultValue: 'Nebenkosten (~2 %)',
        },
        { name: 'rowTotal', label: 'Zeile: Gesamt', type: 'text', defaultValue: 'Gesamt' },
        {
          name: 'extraCostsRate',
          label: 'Nebenkosten-Satz in Prozent (für die Berechnung)',
          type: 'number',
          defaultValue: 2,
        },
      ],
    },
    {
      name: 'cta',
      label: 'CTA-Sektion (unten)',
      type: 'group',
      fields: [
        { name: 'eyebrow', label: 'Kleine Überschrift', type: 'text', defaultValue: 'Jetzt reservieren' },
        { name: 'headline', label: 'Überschrift (erste Zeile)', type: 'text', defaultValue: 'Frühbucherpreise' },
        {
          name: 'headlineAccent',
          label: 'Überschrift (zweite Zeile, goldene Farbe)',
          type: 'text',
          defaultValue: 'bis Oktober 2026.',
        },
        {
          name: 'description',
          label: 'Beschreibung',
          type: 'textarea',
          defaultValue:
            'Nach Erteilung der Baugenehmigung im Oktober 2026 werden die Preise angepasst. Sichern Sie sich jetzt Ihre Einheit zum Frühbucherpreis.',
        },
        {
          name: 'buttonLabel',
          label: 'Button-Text',
          type: 'text',
          defaultValue: 'Aktuelle Preisliste anfordern',
        },
        { name: 'buttonLink', label: 'Button-Link', type: 'text', defaultValue: '/kontakt' },
        { name: 'whatsappLabel', label: 'WhatsApp-Button-Text', type: 'text', defaultValue: 'WhatsApp' },
        {
          name: 'whatsappUrl',
          label: 'WhatsApp-Link',
          type: 'text',
          defaultValue:
            'https://wa.me/38268517873?text=Guten%20Tag%2C%20ich%20m%C3%B6chte%20die%20aktuelle%20Preisliste%20und%20Verf%C3%BCgbarkeit%20von%20Baliv%20Residence%20anfragen.',
        },
        {
          name: 'note',
          label: 'Hinweis unter den Buttons',
          type: 'text',
          defaultValue: 'Antwort in < 24 Stunden · Deutschsprachig · Direkt vom Bauträger · Kein Makler',
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
