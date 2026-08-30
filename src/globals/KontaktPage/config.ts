import type { GlobalConfig } from 'payload'

export const KontaktPage: GlobalConfig = {
  slug: 'kontakt-page',
  label: 'Kontakt-Seite',
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
          defaultValue: 'Sprechen wir miteinander.',
        },
        {
          name: 'description',
          label: 'Beschreibung',
          type: 'textarea',
          defaultValue: 'Wir antworten innerhalb von 24 Stunden — auf Deutsch, persönlich, ohne Verkaufsdruck.',
        },
      ],
    },
    {
      name: 'info',
      label: 'Kontaktinformationen',
      type: 'group',
      fields: [
        {
          name: 'email',
          label: 'E-Mail',
          type: 'email',
          defaultValue: 'info@baliv-residence.com',
        },
        {
          name: 'telefon',
          label: 'Telefon',
          type: 'text',
          defaultValue: '+382 68 517 873',
        },
        {
          name: 'whatsapp',
          label: 'WhatsApp',
          type: 'text',
          defaultValue: '+38268517873',
        },
        {
          name: 'adresse',
          label: 'Adresse',
          type: 'textarea',
          defaultValue: 'Real Living d.o.o.\nBjeliši BB\n85000 Bar\nMontenegro',
        },
        {
          name: 'officeHours',
          label: 'Öffnungszeiten',
          type: 'text',
          defaultValue: 'Mo–Fr 9–18 Uhr (CEST)',
        },
      ],
    },
  ],
}
