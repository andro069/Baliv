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
          name: 'labelName',
          label: 'Beschriftung Name',
          type: 'text',
          defaultValue: 'Name *',
        },
        {
          name: 'placeholderName',
          label: 'Platzhalter Name',
          type: 'text',
          defaultValue: 'Ihr vollständiger Name',
        },
        {
          name: 'labelEmail',
          label: 'Beschriftung E-Mail',
          type: 'text',
          defaultValue: 'E-Mail *',
        },
        {
          name: 'placeholderEmail',
          label: 'Platzhalter E-Mail',
          type: 'text',
          defaultValue: 'ihre@email.de',
        },
        {
          name: 'labelTelefon',
          label: 'Beschriftung Telefon',
          type: 'text',
          defaultValue: 'Telefon / WhatsApp',
        },
        {
          name: 'placeholderTelefon',
          label: 'Platzhalter Telefon',
          type: 'text',
          defaultValue: '+49 …',
        },
        {
          name: 'labelInteresse',
          label: 'Beschriftung Interesse',
          type: 'text',
          defaultValue: 'Mich interessiert',
        },
        {
          name: 'interesseOptionen',
          label: 'Auswahl-Optionen „Mich interessiert“',
          type: 'array',
          fields: [{ name: 'label', label: 'Text', type: 'text', required: true }],
        },
        {
          name: 'labelNachricht',
          label: 'Beschriftung Nachricht',
          type: 'text',
          defaultValue: 'Nachricht',
        },
        {
          name: 'placeholderNachricht',
          label: 'Platzhalter Nachricht',
          type: 'text',
          defaultValue:
            'Haben Sie konkrete Fragen zu Grundrissen, Finanzierung oder dem Kaufprozess?',
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
