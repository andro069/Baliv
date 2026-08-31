import type { CollectionConfig } from 'payload'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  labels: {
    singular: 'Kontakt-Anfrage',
    plural: 'Kontakt-Anfragen',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'phone', 'interesse', 'expose', 'createdAt'],
    listSearchableFields: ['name', 'email', 'phone'],
    group: 'Anfragen',
    pagination: {
      defaultLimit: 50,
    },
  },
  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: () => false,
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Name',
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'email',
          type: 'email',
          label: 'E-Mail',
          required: true,
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'phone',
          type: 'text',
          label: 'Telefon / WhatsApp',
          admin: { width: '50%' },
        },
        {
          name: 'interesse',
          type: 'text',
          label: 'Interesse',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'nachricht',
      type: 'textarea',
      label: 'Nachricht',
    },
    {
      name: 'expose',
      type: 'checkbox',
      label: 'Exposé angefordert',
      defaultValue: false,
    },
    {
      name: 'weitereAngaben',
      type: 'array',
      label: 'Weitere Angaben',
      admin: {
        readOnly: true,
        description:
          'Antworten auf Felder, die im Backend zum Formular hinzugefügt wurden.',
        condition: (data) => Boolean(data?.weitereAngaben?.length),
      },
      fields: [
        { name: 'feld', type: 'text', label: 'Feld' },
        { name: 'wert', type: 'text', label: 'Antwort' },
      ],
    },
  ],
  timestamps: true,
}
