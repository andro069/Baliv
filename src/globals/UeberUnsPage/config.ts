import type { Field, GlobalConfig } from 'payload'
import { revalidatePages } from '@/utilities/revalidatePages'

const sektionskopf = (defaults: { eyebrow: string; headline: string }): Field[] => [
  {
    type: 'row',
    fields: [
      {
        name: 'eyebrow',
        label: 'Kleine Überschrift',
        type: 'text',
        defaultValue: defaults.eyebrow,
        admin: { width: '35%' },
      },
      {
        name: 'headline',
        label: 'Überschrift',
        type: 'text',
        defaultValue: defaults.headline,
        admin: { width: '65%' },
      },
    ],
  },
]

const punkte = (label: string): Field => ({
  name: 'punkte',
  label,
  labels: { singular: 'Punkt', plural: 'Punkte' },
  type: 'array',
  maxRows: 6,
  fields: [
    { name: 'title', label: 'Titel', type: 'text', required: true },
    { name: 'text', label: 'Text', type: 'textarea' },
  ],
})

export const UeberUnsPage: GlobalConfig = {
  slug: 'ueber-uns-page',
  label: 'Über-uns-Seite',
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  admin: {
    group: 'Seiten-Inhalte',
    description: 'Keine Personennamen verwenden — Absender ist die Gesellschaft.',
  },
  fields: [
    {
      name: 'meta',
      label: 'SEO / Meta-Angaben',
      type: 'group',
      fields: [
        {
          name: 'title',
          label: 'Seitentitel',
          type: 'text',
          defaultValue: 'Über uns — Baliv Residence, Bar Montenegro',
        },
        {
          name: 'description',
          label: 'Meta-Beschreibung',
          type: 'textarea',
          defaultValue:
            'Real Living d.o.o. baut Baliv Residence in Bar: inhabergeführt, deutschsprachig, direkt vom Bauträger. Die Baugenehmigung liegt vor, gekauft wird mit notariellem Hauptvertrag.',
        },
      ],
    },
    {
      name: 'hero',
      label: 'Hero',
      type: 'group',
      fields: [
        ...sektionskopf({ eyebrow: 'Über uns', headline: 'Wer Baliv Residence baut.' }),
        {
          name: 'description',
          label: 'Beschreibung',
          type: 'textarea',
          defaultValue:
            'Real Living d.o.o. ist der Bauträger von Baliv Residence — inhabergeführt, mit Sitz in Bar und mit Beratung auf Deutsch.',
        },
        { name: 'image', label: 'Hintergrundbild', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'werWirSind',
      label: '1 · Wer wir sind',
      type: 'group',
      fields: [
        ...sektionskopf({ eyebrow: 'Wer wir sind', headline: 'Inhabergeführt. Deutschsprachig. Direkt.' }),
        {
          name: 'text',
          label: 'Text',
          type: 'textarea',
          defaultValue:
            'Hinter Baliv Residence steht Real Living d.o.o., eine in Montenegro registrierte Gesellschaft mit Sitz in Bar. Wir verkaufen selbst, ohne Makler dazwischen — Sie sprechen direkt mit dem Bauträger, und zwar auf Deutsch.',
        },
        punkte('Eckdaten'),
      ],
    },
    {
      name: 'warumBar',
      label: '2 · Warum Bar',
      type: 'group',
      fields: [
        ...sektionskopf({ eyebrow: 'Warum Bar', headline: 'Ein Ort mit eigenem Alltag.' }),
        {
          name: 'text',
          label: 'Text',
          type: 'textarea',
          defaultValue:
            'Baliv Residence entsteht am Fuß der historischen Festungsstadt Stari Bar, eingebettet in über 100.000 Olivenbäume, zwischen dem Rumija-Gebirge und der Adria. Rund einen Kilometer sind es zur Festung, etwa acht Minuten zum ersten Strand und zum Hafen mit der Fähre nach Bari. Bar ist eine gewachsene Küstenstadt — nicht nur ein Ferienort.',
        },
        {
          type: 'row',
          fields: [
            {
              name: 'linkLabel',
              label: 'Link-Text',
              type: 'text',
              defaultValue: 'Mehr zur Lage',
              admin: { width: '50%' },
            },
            {
              name: 'linkHref',
              label: 'Link-Ziel',
              type: 'text',
              defaultValue: '/lage',
              admin: { width: '50%' },
            },
          ],
        },
        { name: 'image', label: 'Bild', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'wieWirBauen',
      label: '3 · Wie wir bauen',
      type: 'group',
      fields: [
        ...sektionskopf({ eyebrow: 'Wie wir bauen', headline: 'Geplant. Geprüft. Genehmigt.' }),
        {
          name: 'text',
          label: 'Text',
          type: 'textarea',
          defaultValue:
            'Die Baugenehmigung liegt vor. Grundlage ist ein vollständig ausgearbeitetes Hauptprojekt, das eine unabhängige Revision bestanden hat.',
        },
        punkte('Punkte'),
      ],
    },
    {
      name: 'kauf',
      label: '4 · Wie der Kauf abläuft',
      type: 'group',
      fields: [
        ...sektionskopf({ eyebrow: 'Kaufablauf', headline: 'So läuft der Kauf.' }),
        {
          name: 'text',
          label: 'Einleitung',
          type: 'textarea',
          defaultValue:
            'Drei Zahlungen, gebunden an den Baufortschritt statt an Kalenderdaten. Einen Vorvertrag oder eine Reservierungsgebühr gibt es nicht.',
        },
        {
          name: 'schritte',
          label: 'Schritte',
          labels: { singular: 'Schritt', plural: 'Schritte' },
          type: 'array',
          maxRows: 5,
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'step', label: 'Nr.', type: 'text', admin: { width: '15%' } },
                { name: 'title', label: 'Titel', type: 'text', required: true, admin: { width: '60%' } },
                { name: 'amount', label: 'Anteil', type: 'text', admin: { width: '25%' } },
              ],
            },
            { name: 'text', label: 'Text', type: 'textarea' },
          ],
        },
        {
          name: 'nebenkosten',
          label: 'Hinweis Nebenkosten',
          type: 'textarea',
          defaultValue:
            'Nebenkosten für Notar, Anwalt, Übersetzung und Grundbuch: ca. 1,5–2,5 %. MwSt. im Kaufpreis enthalten. Keine Maklerprovision. Keine Grunderwerbsteuer — beim Kauf vom Bauträger entfällt sie.',
        },
      ],
    },
    {
      name: 'cta',
      label: 'Abschluss CTA',
      type: 'group',
      fields: [
        ...sektionskopf({ eyebrow: 'Kontakt', headline: 'Lernen Sie uns kennen.' }),
        {
          name: 'description',
          label: 'Beschreibung',
          type: 'textarea',
          defaultValue:
            'Fragen zum Projekt, zum Kaufablauf oder zu einzelnen Einheiten beantworten wir persönlich — auf Deutsch, direkt vom Bauträger.',
        },
        {
          type: 'row',
          fields: [
            {
              name: 'buttonLabel',
              label: 'Button-Text',
              type: 'text',
              defaultValue: 'Kontakt aufnehmen',
              admin: { width: '50%' },
            },
            {
              name: 'buttonLink',
              label: 'Button-Link',
              type: 'text',
              defaultValue: '/kontakt',
              admin: { width: '50%' },
            },
          ],
        },
        {
          name: 'note',
          label: 'Hinweis unter dem Button',
          type: 'text',
          defaultValue: 'In der Regel Antwort innerhalb von 24 Stunden · Deutschsprachige Beratung',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidatePages(['/ueber-uns'])],
  },
}
