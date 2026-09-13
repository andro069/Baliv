import type { GlobalConfig } from 'payload'
import { revalidatePages } from '@/utilities/revalidatePages'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Startseite',
  access: {
    read: () => true,
  },
  admin: {
    description: 'Die Preisstaffelung wird separat unter „Preisstaffelung" gepflegt.',
  },
  fields: [
    // ── SEO ───────────────────────────────────────────────────────
    {
      name: 'meta',
      label: 'SEO / Meta-Angaben',
      type: 'group',
      fields: [
        {
          name: 'title',
          label: 'Seitentitel (Browser-Tab und Google)',
          type: 'text',
          defaultValue: 'Baliv Residence — Neubau in Bar, Montenegro',
        },
        {
          name: 'description',
          label: 'Meta-Beschreibung',
          type: 'textarea',
          defaultValue:
            '39 Wohneinheiten am Fuße von Stari Bar, zwischen Olivenhainen, Bergen und Meer. Ab 2.500 €/m², direkt vom Bauträger, deutschsprachig, ohne Makler.',
        },
      ],
    },

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
          type: 'row',
          fields: [
            {
              name: 'primaryButtonLabel',
              label: 'Button 1 — Text',
              type: 'text',
              defaultValue: 'Exposé anfragen',
              admin: { width: '50%' },
            },
            {
              name: 'primaryButtonLink',
              label: 'Button 1 — Link',
              type: 'text',
              defaultValue: '/kontakt',
              admin: { width: '50%' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'secondaryButtonLabel',
              label: 'Button 2 — Text',
              type: 'text',
              defaultValue: 'Projekt entdecken',
              admin: { width: '50%' },
            },
            {
              name: 'secondaryButtonLink',
              label: 'Button 2 — Link',
              type: 'text',
              defaultValue: '/architektur',
              admin: { width: '50%' },
            },
          ],
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
            'Eingebettet in über 100.000 Olivenbäume, nur rund einen Kilometer unterhalb der historischen Festungsstadt. Acht Minuten zum ersten Strand, acht zum Hafen.',
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
          admin: {
            description: 'Bitte mit der Erreichbarkeitstabelle auf der Lage-Seite abstimmen.',
          },
          fields: [
            {
              name: 'value',
              label: 'Wert (z. B. ca. 1 km)',
              type: 'text',
              required: true,
            },
            {
              name: 'label',
              label: 'Bezeichnung (z. B. Stari Bar Festung)',
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
              type: 'row',
              fields: [
                {
                  name: 'type',
                  label: 'Typ (z. B. Studio)',
                  type: 'text',
                  required: true,
                  admin: { width: '50%' },
                },
                {
                  name: 'tag',
                  label: 'Etikett (z. B. Erdgeschoss)',
                  type: 'text',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'units',
                  label: 'Einheiten (z. B. 2 Einheiten)',
                  type: 'text',
                  admin: { width: '33%' },
                },
                {
                  name: 'size',
                  label: 'Fläche (z. B. 28,1–29,7 m²)',
                  type: 'text',
                  admin: { width: '33%' },
                },
                {
                  name: 'price',
                  label: 'Preis (z. B. ab 2.700 €/m²)',
                  type: 'text',
                  admin: { width: '34%' },
                },
              ],
            },
            {
              name: 'description',
              label: 'Beschreibung',
              type: 'textarea',
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
          name: 'hinweis',
          label: 'Hinweis unter den Karten',
          type: 'textarea',
          defaultValue:
            'Alle Flächen sind Netto-Nutzflächen einschließlich Terrasse. Der Preis richtet sich nach Etage und Aussicht. Die vollständige Preisliste erhalten Sie mit dem Exposé.',
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
            'Ein Neubau am Fuß von Stari Bar, ab 2.500 €/m² — direkt vom Bauträger, ohne Makler. Schlüsselfertig übergeben; Einbauküche und Tiefgaragenplatz optional.',
        },
        {
          name: 'stats',
          label: 'Kennzahlen',
          type: 'array',
          minRows: 3,
          maxRows: 3,
          admin: {
            description: 'Nur belegbare Angaben — keine Rendite- oder Wachstumszahlen ohne Quelle.',
          },
          fields: [
            {
              name: 'value',
              label: 'Wert (z. B. 9 %)',
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
        {
          type: 'row',
          fields: [
            {
              name: 'badgeValue',
              label: 'Goldkachel — grosser Wert',
              type: 'text',
              defaultValue: '0 €',
              admin: { width: '40%' },
            },
            {
              name: 'badgeLabel',
              label: 'Goldkachel — Beschriftung',
              type: 'text',
              defaultValue: 'Maklerprovision — direkt vom Bauträger',
              admin: { width: '60%' },
            },
          ],
        },
      ],
    },

    // ── VERTRAUEN ─────────────────────────────────────────────────
    {
      name: 'vertrauen',
      label: 'Vertrauensleiste',
      labels: { singular: 'Punkt', plural: 'Punkte' },
      type: 'array',
      maxRows: 4,
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'icon',
              label: 'Symbol',
              type: 'text',
              admin: { width: '15%' },
            },
            {
              name: 'title',
              label: 'Titel',
              type: 'text',
              required: true,
              admin: { width: '40%' },
            },
            {
              name: 'sub',
              label: 'Unterzeile',
              type: 'text',
              admin: { width: '45%' },
            },
          ],
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
          name: 'eyebrow',
          label: 'Band über der Überschrift',
          type: 'text',
          defaultValue: '39 Einheiten · Die Auswahl ist jetzt am größten',
        },
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
          defaultValue:
            'In der Regel Antwort innerhalb von 24 Stunden · Deutschsprachige Beratung · Direkt vom Bauträger',
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
          label: 'Telefon / WhatsApp (so wie angezeigt, z. B. +382 68 517 873)',
          type: 'text',
          defaultValue: '+382 68 517 873',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidatePages(['/'])],
  },
}
