import type { GlobalConfig } from 'payload'
import { revalidatePages } from '@/utilities/revalidatePages'

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
          name: 'eyebrow',
          label: 'Kleine Überschrift',
          type: 'text',
          defaultValue: 'Kontakt & Exposé',
        },
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
    {
      name: 'direktkontakt',
      label: 'Sektion „Direktkontakt“ (links)',
      type: 'group',
      fields: [
        {
          name: 'eyebrow',
          label: 'Kleine Überschrift',
          type: 'text',
          defaultValue: 'Direktkontakt',
        },
        {
          name: 'headline',
          label: 'Überschrift (erste Zeile)',
          type: 'text',
          defaultValue: 'Ihr direkter Draht',
        },
        {
          name: 'headlineZweiteZeile',
          label: 'Überschrift (zweite Zeile)',
          type: 'text',
          defaultValue: 'zum Bauträger.',
        },
        {
          name: 'description',
          label: 'Beschreibung',
          type: 'textarea',
          defaultValue:
            'Kein Makler, keine Provision — Sie sprechen direkt mit Real Living d.o.o., dem Bauträger von Baliv Residence. Alle Informationen, Grundrisse und Preislisten erhalten Sie auf Anfrage kostenlos.',
        },
        {
          name: 'labelEmail',
          label: 'Beschriftung E-Mail',
          type: 'text',
          defaultValue: 'E-Mail',
        },
        {
          name: 'labelWhatsapp',
          label: 'Beschriftung WhatsApp',
          type: 'text',
          defaultValue: 'WhatsApp',
        },
        {
          name: 'labelAdresse',
          label: 'Beschriftung Adresse',
          type: 'text',
          defaultValue: 'Adresse',
        },
      ],
    },
    {
      name: 'exposeTeaser',
      label: 'Exposé-Kasten (links unten)',
      type: 'group',
      fields: [
        {
          name: 'eyebrow',
          label: 'Kleine Überschrift',
          type: 'text',
          defaultValue: 'Kostenloses Exposé',
        },
        {
          name: 'text',
          label: 'Text',
          type: 'textarea',
          defaultValue:
            'Grundrisse aller Wohntypen, vollständige Preisliste, Zahlungsplan, Lageplan und Baubeschreibung — auf Deutsch, direkt per E-Mail.',
        },
      ],
    },
    {
      name: 'formular',
      label: 'Kontaktformular',
      type: 'group',
      fields: [
        {
          name: 'headline',
          label: 'Überschrift',
          type: 'text',
          defaultValue: 'Anfrage senden',
        },
        {
          name: 'subline',
          label: 'Unterzeile',
          type: 'text',
          defaultValue: 'Alle Felder mit * sind Pflichtfelder.',
        },
        {
          name: 'exposeCheckboxTitle',
          label: 'Exposé-Checkbox — Titel',
          type: 'text',
          defaultValue: 'Kostenloses Exposé zusenden',
        },
        {
          name: 'exposeCheckboxText',
          label: 'Exposé-Checkbox — Text',
          type: 'text',
          defaultValue: 'Grundrisse, Preisliste & Baubeschreibung — auf Deutsch per E-Mail',
        },
        {
          name: 'felder',
          label: 'Formularfelder',
          labels: { singular: 'Feld', plural: 'Felder' },
          type: 'array',
          admin: {
            initCollapsed: true,
            description:
              'Reihenfolge per Drag-and-drop. Felder lassen sich umbenennen, hinzufügen und entfernen. Der technische Name landet so in der E-Mail und in den Anfragen.',
            components: {
              RowLabel: '@/globals/KontaktPage/FeldRowLabel#FeldRowLabel',
            },
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'label',
                  label: 'Beschriftung',
                  type: 'text',
                  required: true,
                  admin: { width: '50%' },
                },
                {
                  name: 'key',
                  label: 'Technischer Name',
                  type: 'text',
                  required: true,
                  admin: {
                    width: '50%',
                    description: 'Nur Kleinbuchstaben, ohne Leerzeichen — z. B. budget',
                  },
                  validate: (value: unknown) =>
                    typeof value === 'string' && /^[a-z][a-z0-9_]*$/.test(value)
                      ? true
                      : 'Nur Kleinbuchstaben, Ziffern und Unterstriche; muss mit einem Buchstaben beginnen.',
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'typ',
                  label: 'Feldtyp',
                  type: 'select',
                  required: true,
                  defaultValue: 'text',
                  admin: { width: '50%' },
                  options: [
                    { label: 'Text (einzeilig)', value: 'text' },
                    { label: 'E-Mail', value: 'email' },
                    { label: 'Telefonnummer', value: 'tel' },
                    { label: 'Zahl', value: 'number' },
                    { label: 'Text (mehrzeilig)', value: 'textarea' },
                    { label: 'Auswahl (Schaltflächen)', value: 'auswahl' },
                    { label: 'Auswahl (Aufklappliste)', value: 'dropdown' },
                    { label: 'Ja/Nein-Häkchen', value: 'checkbox' },
                  ],
                },
                {
                  name: 'breite',
                  label: 'Breite',
                  type: 'select',
                  defaultValue: 'voll',
                  admin: { width: '50%' },
                  options: [
                    { label: 'Volle Breite', value: 'voll' },
                    { label: 'Halbe Breite', value: 'halb' },
                  ],
                },
              ],
            },
            {
              name: 'platzhalter',
              label: 'Platzhalter',
              type: 'text',
              admin: {
                condition: (_, sibling) =>
                  !['auswahl', 'dropdown', 'checkbox'].includes(sibling?.typ),
              },
            },
            {
              name: 'optionen',
              label: 'Auswahlmöglichkeiten',
              type: 'array',
              admin: {
                condition: (_, sibling) => ['auswahl', 'dropdown'].includes(sibling?.typ),
              },
              fields: [{ name: 'label', label: 'Text', type: 'text', required: true }],
            },
            {
              name: 'pflichtfeld',
              label: 'Pflichtfeld',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
        },
        {
          name: 'datenschutzText',
          label: 'Datenschutz-Hinweis',
          type: 'textarea',
          defaultValue:
            'Mit dem Absenden stimmen Sie zu, dass wir Ihre Daten zur Bearbeitung Ihrer Anfrage verwenden. Keine Weitergabe an Dritte. Keine Werbung ohne Ihre Zustimmung.',
        },
        {
          name: 'fehlerText',
          label: 'Fehlermeldung',
          type: 'textarea',
          defaultValue:
            'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt per E-Mail.',
        },
        {
          name: 'buttonSending',
          label: 'Button-Text (wird gesendet)',
          type: 'text',
          defaultValue: 'Wird gesendet …',
        },
        {
          name: 'buttonMitExpose',
          label: 'Button-Text (mit Exposé)',
          type: 'text',
          defaultValue: 'Exposé & Anfrage senden',
        },
        {
          name: 'buttonOhneExpose',
          label: 'Button-Text (ohne Exposé)',
          type: 'text',
          defaultValue: 'Anfrage senden',
        },
        {
          name: 'erfolgHeadline',
          label: 'Danke-Seite — Überschrift',
          type: 'text',
          defaultValue: 'Vielen Dank!',
        },
        {
          name: 'erfolgText',
          label: 'Danke-Seite — Text',
          type: 'textarea',
          defaultValue:
            'Ihre Anfrage ist bei uns eingegangen. Wir melden uns innerhalb von 24 Stunden persönlich bei Ihnen — auf Deutsch, direkt vom Bauträger.',
        },
        {
          name: 'erfolgLinkLabel',
          label: 'Danke-Seite — Link-Text',
          type: 'text',
          defaultValue: 'Zurück zur Startseite',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidatePages(['/kontakt'])],
  },
}
