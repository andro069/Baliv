import type { GlobalConfig } from 'payload'

export const LagePage: GlobalConfig = {
  slug: 'lage-page',
  label: 'Lage-Seite',
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
          defaultValue: 'Zwischen Festung, Meer und Bergen.',
        },
        {
          name: 'subline',
          label: 'Unterzeile',
          type: 'text',
          defaultValue: 'Die Lage',
        },
        {
          name: 'description',
          label: 'Beschreibung',
          type: 'textarea',
          defaultValue:
            'Bar — am südlichen Ende der montenegrinischen Riviera. Authentisch, gewachsen, und am Beginn einer Entwicklung, die Budva und Kotor bereits hinter sich haben.',
        },
      ],
    },
    {
      name: 'distances',
      label: 'Entfernungen',
      type: 'array',
      fields: [
        { name: 'place', label: 'Ort', type: 'text', required: true },
        { name: 'distance', label: 'Entfernung (z.B. 5 min)', type: 'text', required: true },
        { name: 'detail', label: 'Detail (z.B. zu Fuß)', type: 'text' },
        { name: 'note', label: 'Hinweis', type: 'text' },
      ],
    },
    {
      name: 'highlights',
      label: 'Highlights',
      type: 'array',
      fields: [
        { name: 'title', label: 'Titel', type: 'text', required: true },
        { name: 'text', label: 'Text', type: 'textarea' },
        {
          name: 'image',
          label: 'Bild',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'markt',
      label: 'Marktvergleich',
      type: 'group',
      fields: [
        {
          name: 'headline',
          label: 'Überschrift',
          type: 'text',
          defaultValue: 'Was Budva und Kotor vor 15 Jahren waren.',
        },
        {
          name: 'description',
          label: 'Beschreibung',
          type: 'textarea',
          defaultValue:
            'Kotor kostet heute 4.000–6.000 €/m². Budva 3.500–5.000 €/m². Bar liegt bei 2.500 €/m² — mit denselben natürlichen Vorteilen: Adriaküste, Berge, mediterranes Klima. Der Unterschied: Bar entwickelt sich gerade erst.',
        },
      ],
    },
  ],
}
