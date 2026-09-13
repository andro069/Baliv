import type { Field, GlobalConfig } from 'payload'

import { lokalisiert } from '@/fields/lokalisiert'
import { seoStandard, uiStandard } from '@/i18n/ui'
import { revalidateAlleSeiten } from '@/utilities/revalidatePages'

type Texte = typeof seoStandard & typeof uiStandard
const standard: Texte = { ...seoStandard, ...uiStandard }

/** Textfeld mit deutschem Standardwert aus `src/i18n/ui.ts`. */
const t = (name: keyof Texte, label: string, type: 'text' | 'textarea' = 'text'): Field =>
  ({ name, label, type, defaultValue: standard[name] }) as Field

/**
 * Seitenübergreifende Einstellungen: welche Sprachen freigegeben sind, und die
 * allgemeinen Texte in gemeinsamen Bauteilen (Navigation, Footer, WhatsApp-Knopf,
 * 404-Seite, Preisstaffel …). Die Texte werden je Sprache gepflegt; die
 * Freigabe-Schalter gelten sprachübergreifend.
 */
export const Website: GlobalConfig = {
  slug: 'website',
  label: 'Website & Sprachen',
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  admin: {
    group: 'Seiten-Inhalte',
    description:
      'Sprachen freigeben und allgemeine Texte pflegen. Die Sprache der Texte wählen Sie oben rechts.',
  },
  fields: [
    {
      name: 'sprachen',
      label: 'Sprachen freigeben',
      type: 'group',
      admin: {
        description:
          'Deutsch ist immer aktiv. Eine weitere Sprache erscheint erst im Sprachumschalter und in Suchmaschinen, wenn sie hier freigegeben ist. Fehlende Übersetzungen zeigen den deutschen Text.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'en', label: 'English freigeben', type: 'checkbox', defaultValue: false, admin: { width: '33%' } },
            { name: 'me', label: 'Crnogorski freigeben', type: 'checkbox', defaultValue: false, admin: { width: '33%' } },
            { name: 'tr', label: 'Türkçe freigeben', type: 'checkbox', defaultValue: false, admin: { width: '34%' } },
          ],
        },
      ],
    },
    ...lokalisiert([
      {
        name: 'seo',
        label: 'Standard-Texte für Suchmaschinen und geteilte Links',
        type: 'group',
        fields: [
          t('titel', 'Standard-Seitentitel'),
          t('beschreibung', 'Standard-Beschreibung', 'textarea'),
          t('ogTitel', 'Geteilte Links — Titel'),
          t('ogBeschreibung', 'Geteilte Links — Beschreibung', 'textarea'),
          t('ogBildAlt', 'Geteilte Links — Bildbeschreibung'),
        ],
      },
      {
        name: 'ui',
        label: 'Allgemeine Texte',
        type: 'group',
        admin: { description: 'Texte in Bauteilen, die auf mehreren Seiten vorkommen.' },
        fields: [
          {
            type: 'collapsible',
            label: 'Navigation und Footer',
            fields: [
              t('menueOeffnen', 'Menü öffnen (für Screenreader)'),
              t('menueSchliessen', 'Menü schließen (für Screenreader)'),
              t('sprachwahl', 'Beschriftung der Sprachwahl (für Screenreader)'),
              t('zurueckZurStartseite', 'Footer — Link zur Startseite'),
            ],
          },
          {
            type: 'collapsible',
            label: 'WhatsApp',
            fields: [
              t('whatsappNachricht', 'Vorbelegte Nachricht', 'textarea'),
              t('whatsappLabel', 'Button-Text'),
              t('whatsappHinweis', 'Hinweis am schwebenden Knopf'),
              t('whatsappAria', 'Beschriftung für Screenreader'),
            ],
          },
          {
            type: 'collapsible',
            label: 'Preise, Einheiten und Bilder',
            fields: [
              t('ab', 'Vorsatz „ab" vor Preisen'),
              t('proQm', 'Einheit pro Quadratmeter'),
              t('sieSindHier', 'Preisstaffel — aktuelle Stufe'),
              t('grundriss', 'Grundriss'),
              t('sliderBild', 'Bild im Slider für Screenreader (Platzhalter {n})'),
            ],
          },
          {
            type: 'collapsible',
            label: 'Formular',
            fields: [t('bitteWaehlen', 'Aufklappliste — erste Zeile')],
          },
          {
            type: 'collapsible',
            label: 'Seite nicht gefunden (404)',
            fields: [
              t('notFoundEyebrow', 'Kleine Überschrift'),
              t('notFoundHeadline', 'Überschrift'),
              t('notFoundText', 'Text', 'textarea'),
              t('notFoundStartseite', 'Button — Startseite'),
              t('notFoundWohnungen', 'Button — Wohnungen'),
              t('notFoundKontakt', 'Button — Kontakt'),
            ],
          },
        ],
      },
    ]),
  ],
  hooks: {
    afterChange: [revalidateAlleSeiten],
  },
}
