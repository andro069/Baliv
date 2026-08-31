import type { GlobalConfig } from 'payload'

export const InvestmentPage: GlobalConfig = {
  slug: 'investment-page',
  label: 'Investment-Seite',
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
          defaultValue: 'Investieren, wo Europa wächst.',
        },
        {
          name: 'description',
          label: 'Beschreibung',
          type: 'textarea',
          defaultValue:
            'Montenegro vor dem EU-Beitritt: stabile Währung, niedrigste Steuern Europas, zweistellige Renditen — und ein Markt, der gerade erst entdeckt wird.',
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
      name: 'warumMontenegro',
      label: 'Warum Montenegro? (Sektion)',
      type: 'group',
      fields: [
        {
          name: 'headline',
          label: 'Überschrift',
          type: 'text',
          defaultValue: 'Warum Montenegro?',
        },
        {
          name: 'description',
          label: 'Beschreibung',
          type: 'textarea',
          defaultValue:
            'Montenegro kombiniert westliche Rechtssicherheit mit den Wachstumsraten eines Schwellenmarkts. Das Fenster vor dem EU-Beitritt — in dem die größten Wertsteigerungen stattfinden — schließt sich 2028.',
        },
        {
          name: 'image',
          label: 'Sektionsbild',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'vorteile',
          label: 'Vorteile (4 Punkte)',
          type: 'array',
          maxRows: 4,
          fields: [
            { name: 'title', label: 'Titel', type: 'text', required: true },
            { name: 'text', label: 'Text', type: 'textarea' },
          ],
        },
      ],
    },
    {
      name: 'steuerDaten',
      label: 'Steuerdaten',
      type: 'array',
      fields: [
        { name: 'label', label: 'Bezeichnung', type: 'text', required: true },
        { name: 'value', label: 'Wert', type: 'text', required: true },
        { name: 'note', label: 'Hinweis', type: 'text' },
      ],
    },
    {
      name: 'mietRendite',
      label: 'Mietrendite Beispiel',
      type: 'group',
      fields: [
        { name: 'headline', label: 'Überschrift', type: 'text', defaultValue: '6–8 % Rendite. Brutto. Realistisch.' },
        { name: 'purchase', label: 'Kaufpreis (€)', type: 'number', defaultValue: 125000 },
        { name: 'size', label: 'Größe (m²)', type: 'number', defaultValue: 50 },
        { name: 'pricePerSqm', label: 'Preis pro m² (€)', type: 'number', defaultValue: 2500 },
        { name: 'weeklyRate', label: 'Wochenrate Hauptsaison (€)', type: 'number', defaultValue: 550 },
        { name: 'occupancyWeeks', label: 'Belegungswochen', type: 'number', defaultValue: 20 },
        { name: 'annualRent', label: 'Jahreseinnahmen (€)', type: 'number', defaultValue: 11000 },
        { name: 'yield', label: 'Rendite (%)', type: 'number', defaultValue: 8.8 },
        { name: 'appreciationLow', label: 'Wertsteigerung konservativ (€)', type: 'number', defaultValue: 30000 },
        { name: 'appreciationHigh', label: 'Wertsteigerung optimistisch (€)', type: 'number', defaultValue: 48000 },
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
  ],
}
