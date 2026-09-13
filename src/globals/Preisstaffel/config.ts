import type { GlobalConfig } from 'payload'
import { revalidatePages } from '@/utilities/revalidatePages'
import { lokalisiert } from '@/fields/lokalisiert'

export const Preisstaffel: GlobalConfig = {
  slug: 'preisstaffel',
  label: 'Preisstaffelung',
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  admin: {
    group: 'Seiten-Inhalte',
    description: 'Erscheint auf der Startseite und auf der Wohnungen-Seite.',
  },
  fields: lokalisiert([
    {
      name: 'eyebrow',
      label: 'Kleine Überschrift',
      type: 'text',
      defaultValue: 'Preisstaffelung',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'headlineStart',
          label: 'Überschrift — Anfang',
          type: 'text',
          defaultValue: 'Früh einsteigen.',
          admin: { width: '40%' },
        },
        {
          name: 'headlineAccent',
          label: 'Hervorgehobenes Wort (gold, kursiv)',
          type: 'text',
          defaultValue: 'Preisvorteil',
          admin: { width: '30%' },
        },
        {
          name: 'headlineEnd',
          label: 'Überschrift — Ende',
          type: 'text',
          defaultValue: 'sichern.',
          admin: { width: '30%' },
        },
      ],
    },
    {
      name: 'intro',
      label: 'Einleitung',
      type: 'textarea',
      defaultValue:
        'Die Preise für Baliv Residence steigen mit dem Baufortschritt. Der Quadratmeterpreis ist heute am niedrigsten.',
    },
    {
      name: 'stages',
      label: 'Preisstufen',
      labels: { singular: 'Stufe', plural: 'Stufen' },
      type: 'array',
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'phase',
              label: 'Phase (z. B. Ab Rohbauabschluss · Q2 2027)',
              type: 'text',
              required: true,
              admin: { width: '60%' },
            },
            {
              name: 'price',
              label: 'Preis in €/m² (z. B. 2.700)',
              type: 'text',
              required: true,
              admin: { width: '40%' },
            },
          ],
        },
        {
          name: 'label',
          label: 'Unterzeile',
          type: 'text',
        },
        {
          name: 'description',
          label: 'Beschreibung',
          type: 'textarea',
        },
        {
          name: 'active',
          label: 'Aktuelle Stufe („Sie sind hier")',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
  ]),
  hooks: {
    afterChange: [revalidatePages(['/', '/wohnungen'])],
  },
}
