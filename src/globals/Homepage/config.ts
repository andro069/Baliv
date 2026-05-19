import type { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Startseite',
  access: {
    read: () => true,
  },
  fields: [
    // ── HERO ──────────────────────────────────────────────────────
    {
      name: 'hero',
      label: 'Hero',
      type: 'group',
      fields: [
        {
          name: 'headline',
          label: 'Überschrift',
          type: 'text',
          defaultValue: 'Modern wohnen. Ursprünglich leben.',
          required: true,
        },
        {
          name: 'subline',
          label: 'Unterzeile',
          type: 'text',
          defaultValue: 'BAR · MONTENEGRO',
        },
        {
          name: 'description',
          label: 'Beschreibungstext',
          type: 'textarea',
          defaultValue:
            'Am Fuße von Stari Bar entsteht ein Wohnensemble mit 39 Einheiten, zwischen Olivenhainen, Bergen und Meer.',
        },
        {
          name: 'slides',
          label: 'Slider Bilder',
          type: 'array',
          minRows: 1,
          maxRows: 5,
          fields: [
            {
              name: 'image',
              label: 'Bild',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'alt',
              label: 'Bildbeschreibung',
              type: 'text',
            },
          ],
        },
        {
          name: 'stats',
          label: 'Kennzahlen (unter dem Hero)',
          type: 'array',
          minRows: 3,
          maxRows: 3,
          fields: [
            {
              name: 'value',
              label: 'Wert',
              type: 'text',
              required: true,
            },
            {
              name: 'label',
              label: 'Bezeichnung',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },

    // ── LAGE ──────────────────────────────────────────────────────
    {
      name: 'lage',
      label: 'Die Lage',
      type: 'group',
      fields: [
        {
          name: 'headline',
          label: 'Überschrift',
          type: 'text',
          defaultValue: 'Zwischen Festung, Meer und Olivenhain.',
        },
        {
          name: 'text1',
          label: 'Erster Absatz',
          type: 'textarea',
          defaultValue:
            'Stari Bar zu Füßen, Rumija im Rücken, die Adria in Sichtweite. Ein Ort, an dem sich Orient und Okzident seit Jahrhunderten begegnen — und an dem Baliv Residence entsteht.',
        },
        {
          name: 'text2',
          label: 'Zweiter Absatz',
          type: 'textarea',
          defaultValue:
            'Eingebettet in über 100.000 Olivenbäume, nur 1,4 Kilometer unterhalb der historischen Festungsstadt. Sieben Minuten zur Bucht, zehn zum Hafen.',
        },
        {
          name: 'gallery',
          label: 'Bildergalerie',
          type: 'array',
          minRows: 1,
          maxRows: 4,
          fields: [
            {
              name: 'image',
              label: 'Bild',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'alt',
              label: 'Bildbeschreibung',
              type: 'text',
            },
          ],
        },
        {
          name: 'distances',
          label: 'Entfernungen',
          type: 'array',
          minRows: 4,
          maxRows: 4,
          fields: [
            {
              name: 'value',
              label: 'Wert (z.B. 1,4 km)',
              type: 'text',
              required: true,
            },
            {
              name: 'label',
              label: 'Bezeichnung (z.B. Stari Bar Festung)',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },

    // ── WOHNUNGEN ─────────────────────────────────────────────────
    {
      name: 'wohnungen',
      label: 'Die Wohnungen',
      type: 'group',
      fields: [
        {
          name: 'headline',
          label: 'Überschrift',
          type: 'text',
          defaultValue: 'Drei Typen. Ihre Wahl.',
        },
        {
          name: 'types',
          label: 'Wohnungstypen',
          type: 'array',
          minRows: 3,
          maxRows: 3,
          fields: [
            {
              name: 'type',
              label: 'Typ (z.B. Studio)',
              type: 'text',
              required: true,
            },
            {
              name: 'tag',
              label: 'Etikett (z.B. Erdgeschoss)',
              type: 'text',
            },
            {
              name: 'size',
              label: 'Größe (z.B. 28–30 m²)',
              type: 'text',
            },
            {
              name: 'description',
              label: 'Beschreibung',
              type: 'textarea',
            },
            {
              name: 'price',
              label: 'Preis (z.B. ab 2.400 €/m²)',
              type: 'text',
            },
            {
              name: 'image',
              label: 'Bild',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
      ],
    },

    // ── INVESTMENT ────────────────────────────────────────────────
    {
      name: 'investment',
      label: 'Investment',
      type: 'group',
      fields: [
        {
          name: 'headline',
          label: 'Überschrift',
          type: 'text',
          defaultValue: 'Warum Bar. Warum jetzt.',
        },
        {
          name: 'text',
          label: 'Text',
          type: 'textarea',
          defaultValue:
            'Montenegro ist der am schnellsten wachsende Immobilienmarkt Europas. Während vergleichbare Neubauten in Budva oder Kotor 2.700–5.000 €/m² kosten, starten Sie bei Baliv Residence ab 2.400 €/m² — schlüsselfertig, hochwertig ausgestattet.',
        },
        {
          name: 'stats',
          label: 'Kennzahlen',
          type: 'array',
          minRows: 3,
          maxRows: 3,
          fields: [
            {
              name: 'value',
              label: 'Wert (z.B. 6–8%)',
              type: 'text',
              required: true,
            },
            {
              name: 'label',
              label: 'Bezeichnung (z.B. Bruttorendite)',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'badge',
          label: 'Badge Text (z.B. +20% Preissteigerung 2025)',
          type: 'text',
          defaultValue: '+20% Preissteigerung 2025',
        },
      ],
    },

    // ── CTA ───────────────────────────────────────────────────────
    {
      name: 'cta',
      label: 'Abschluss CTA',
      type: 'group',
      fields: [
        {
          name: 'headline',
          label: 'Überschrift',
          type: 'text',
          defaultValue: 'Bereit für das erste Gespräch?',
        },
        {
          name: 'description',
          label: 'Beschreibung',
          type: 'textarea',
          defaultValue:
            'Vollständiges Exposé mit Grundrissen, Preisliste und Verfügbarkeit — direkt vom Bauträger, deutschsprachig, ohne Makler.',
        },
        {
          name: 'note',
          label: 'Hinweistext',
          type: 'text',
          defaultValue: 'Antwort in < 24 Stunden · Deutschsprachige Beratung · Direkt vom Bauträger',
        },
      ],
    },

    // ── KONTAKT ───────────────────────────────────────────────────
    {
      name: 'kontakt',
      label: 'Kontakt',
      type: 'group',
      fields: [
        {
          name: 'email',
          label: 'E-Mail Adresse',
          type: 'email',
          defaultValue: 'info@baliv-residence.com',
        },
        {
          name: 'whatsapp',
          label: 'WhatsApp Nummer',
          type: 'text',
          defaultValue: '+38268517873',
        },
      ],
    },
  ],
}
