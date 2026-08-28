import type { CollectionConfig } from 'payload'

export const FormConfigs: CollectionConfig = {
  slug: 'form-configs',
  labels: {
    singular: 'Formular-Einstellung',
    plural: 'Formular-Einstellungen',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'formSlug', 'sprache', 'autoresponderAktiv'],
    group: 'Anfragen',
  },
  access: {
    create: ({ req }) => Boolean(req.user),
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Formular-Name',
          required: true,
          admin: {
            width: '50%',
            description: 'z.B. "Kontaktformular Deutsch"',
          },
        },
        {
          name: 'formSlug',
          type: 'text',
          label: 'Formular-ID',
          required: true,
          admin: {
            width: '50%',
            description: 'Interner Bezeichner, z.B. "kontakt"',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'sprache',
          type: 'select',
          label: 'Sprache',
          defaultValue: 'de',
          options: [
            { label: 'Deutsch', value: 'de' },
            { label: 'English', value: 'en' },
            { label: 'Srpski', value: 'sr' },
            { label: 'Русский', value: 'ru' },
          ],
          admin: { width: '50%' },
        },
        {
          name: 'benachrichtigungsEmail',
          type: 'email',
          label: 'Interne Benachrichtigungs-E-Mail',
          admin: {
            width: '50%',
            description: 'Leer lassen = Standard-Adresse aus Umgebungsvariable',
          },
        },
      ],
    },
    {
      name: 'autoresponderAktiv',
      type: 'checkbox',
      label: 'Autoresponder aktiviert',
      defaultValue: false,
      admin: {
        description: 'Sendet dem Kunden nach der Formularabsendung automatisch eine Antwort',
      },
    },
    {
      name: 'autoresponderBetreff',
      type: 'text',
      label: 'Autoresponder Betreff',
      admin: {
        condition: (data) => Boolean(data?.autoresponderAktiv),
        description: 'Verfügbare Variablen: {{name}}, {{email}}',
      },
    },
    {
      name: 'autoresponderNachricht',
      type: 'textarea',
      label: 'Autoresponder Nachricht',
      admin: {
        condition: (data) => Boolean(data?.autoresponderAktiv),
        description: 'Verfügbare Variablen: {{name}}, {{email}}, {{interesse}}, {{nachricht}}',
        rows: 10,
      },
    },
    {
      name: 'autoresponderAnhang',
      type: 'upload',
      relationTo: 'media',
      label: 'Anhang (z.B. Exposé PDF)',
      admin: {
        condition: (data) => Boolean(data?.autoresponderAktiv),
        description: 'PDF wird als Anhang an die Autoresponder-E-Mail angehängt',
      },
    },
  ],
  timestamps: true,
}
