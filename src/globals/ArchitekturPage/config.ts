import type { GlobalConfig } from 'payload'
import { revalidatePages } from '@/utilities/revalidatePages'
import { lokalisiert } from '@/fields/lokalisiert'

export const ArchitekturPage: GlobalConfig = {
  slug: 'architektur-page',
  label: 'Architektur-Seite',
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  admin: {
    group: 'Seiten-Inhalte',
  },
  fields: lokalisiert([
    {
      name: 'meta',
      label: 'SEO / Meta-Angaben',
      type: 'group',
      fields: [
        { name: 'title', label: 'Seitentitel (Browser-Tab und Google)', type: 'text', defaultValue: "Architektur — Baliv Residence, Bar Montenegro" },
        { name: 'description', label: 'Meta-Beschreibung', type: 'textarea', defaultValue: "Entworfen von Ahmed Divanović (ArchDesign Studio Bar). Natursteinfassade, Bögen, Loggias — mediterrane Architektur die sich in ihre Umgebung einfügt, nicht über sie hinwegsetzt." },
      ],
    },
    {
      name: 'hero',
      label: 'Hero',
      type: 'group',
      fields: [
        { name: 'imageAlt', label: "Bildbeschreibung", type: 'text', defaultValue: "Blick vom Penthouse durch den Rundbogen über Bar und die Adria" },
        { name: 'eyebrow', label: 'Kleine Überschrift', type: 'text', defaultValue: 'Architektur' },
        {
          name: 'headline',
          label: 'Überschrift (erste Zeile)',
          type: 'text',
          defaultValue: 'Als hätte es',
        },
        {
          name: 'headlineZweiteZeile',
          label: 'Überschrift (zweite Zeile)',
          type: 'text',
          defaultValue: 'schon immer',
        },
        {
          name: 'headlineAccent',
          label: 'Überschrift (goldener Teil)',
          type: 'text',
          defaultValue: 'hier gestanden.',
        },
        {
          name: 'description',
          label: 'Beschreibung',
          type: 'textarea',
          defaultValue:
            'Entworfen von Ahmed Divanović, ArchDesign Studio Bar. Ein Gebäude, das seinen Ort nicht dominiert — sondern fortsetzt.',
        },
        { name: 'image', label: 'Hintergrundbild', type: 'upload', relationTo: 'media' },
        {
          name: 'architektLabel',
          label: 'Architekten-Box — Bezeichnung',
          type: 'text',
          defaultValue: 'Entwurf',
        },
        {
          name: 'architektName',
          label: 'Architekten-Box — Name',
          type: 'text',
          defaultValue: 'Ahmed Divanović',
        },
        {
          name: 'architektStudio',
          label: 'Architekten-Box — Büro',
          type: 'text',
          defaultValue: 'ArchDesign Studio, Bar',
        },
      ],
    },
    {
      name: 'zitat',
      label: 'Leitendes Zitat',
      type: 'group',
      fields: [
        {
          name: 'text',
          label: 'Zitat (erster Teil)',
          type: 'textarea',
          defaultValue:
            'Das Gebäude soll wirken, als hätte es schon immer hier gestanden. Modern, aber',
        },
        {
          name: 'textAccent',
          label: 'Zitat (goldener Teil)',
          type: 'text',
          defaultValue: 'im Einklang mit dem Ort.',
        },
        {
          name: 'autor',
          label: 'Autor',
          type: 'text',
          defaultValue: 'Ahmed Divanović · Architekt, ArchDesign Studio Bar',
        },
      ],
    },
    {
      name: 'prinzipien',
      label: 'Gestaltungsprinzipien',
      type: 'group',
      fields: [
        { name: 'imageAlt', label: "Bildbeschreibung", type: 'text', defaultValue: "Fassadendetail Baliv Residence" },
        {
          name: 'eyebrow',
          label: 'Kleine Überschrift',
          type: 'text',
          defaultValue: 'Gestaltungsprinzipien',
        },
        {
          name: 'headline',
          label: 'Überschrift (erste Zeile)',
          type: 'text',
          defaultValue: 'Vier Prinzipien.',
        },
        {
          name: 'headlineAccent',
          label: 'Überschrift (zweite Zeile, goldene Farbe)',
          type: 'text',
          defaultValue: 'Ein Gebäude.',
        },
        {
          name: 'description',
          label: 'Beschreibung',
          type: 'textarea',
          defaultValue:
            'Jede Entscheidung bei Baliv Residence lässt sich auf einen von vier Grundsätzen zurückführen — die gemeinsam ein Gebäude ergeben, das sich seiner Umgebung bewusst ist.',
        },
        { name: 'image', label: 'Sektionsbild', type: 'upload', relationTo: 'media' },
        {
          name: 'items',
          label: 'Prinzipien',
          type: 'array',
          fields: [
            { name: 'nr', label: 'Nummer (z.B. 01)', type: 'text', required: true },
            { name: 'title', label: 'Titel', type: 'text', required: true },
            { name: 'text', label: 'Text', type: 'textarea' },
          ],
        },
      ],
    },
    {
      name: 'fassade',
      label: 'Fassade',
      type: 'group',
      fields: [
        { name: 'imageAlt', label: "Bildbeschreibung", type: 'text', defaultValue: "Baliv Residence Gebäudeansicht" },
        { name: 'eyebrow', label: 'Kleine Überschrift', type: 'text', defaultValue: 'Fassade' },
        {
          name: 'headline',
          label: 'Überschrift (erste Zeile)',
          type: 'text',
          defaultValue: 'Von allen Seiten',
        },
        {
          name: 'headlineAccent',
          label: 'Überschrift (zweite Zeile, goldene Farbe)',
          type: 'text',
          defaultValue: 'hochwertig.',
        },
        {
          name: 'description',
          label: 'Beschreibung',
          type: 'textarea',
          defaultValue:
            'Die Fassade variiert in ihrer Tiefe — Loggias, Rücksprünge und vorgelagerte Pergolen erzeugen ein Spiel aus Licht und Schatten, das sich mit dem Sonnenstand verändert. Kein Geschoss sieht aus wie das andere.',
        },
        { name: 'image', label: 'Sektionsbild', type: 'upload', relationTo: 'media' },
        {
          name: 'items',
          label: 'Merkmale',
          type: 'array',
          defaultValue: [
            { title: 'Natursteinfassade', text: 'Regional gebrochen, nach lokalem Baucode — aber hier bewusste Gestaltungsentscheidung.' },
            { title: 'Rundbogen-Motiv', text: 'Wiederkehrendes Element aus der Festungsarchitektur von Stari Bar.' },
            { title: 'Schmiedeeisen-Geländer', text: 'Geländer und Details in Schmiedeeisen als bewusster Gegenentwurf zu industriellen Standardlösungen.' },
            { title: 'Bepflanzte Loggias', text: 'Lavendel und Rosmarin zwischen den Etagen — die Fassade lebt und wächst.' },
          ],
          fields: [
            { name: 'title', label: 'Titel', type: 'text', required: true },
            { name: 'text', label: 'Text', type: 'textarea' },
          ],
        },
      ],
    },
    {
      name: 'materialien',
      label: 'Materialpalette',
      type: 'group',
      fields: [
        { name: 'imageAlt', label: "Bildbeschreibung", type: 'text', defaultValue: "Materialpalette Baliv Residence" },
        {
          name: 'eyebrow',
          label: 'Kleine Überschrift',
          type: 'text',
          defaultValue: 'Materialpalette',
        },
        {
          name: 'headline',
          label: 'Überschrift (erste Zeile)',
          type: 'text',
          defaultValue: 'Natürlich.',
        },
        {
          name: 'headlineAccent',
          label: 'Überschrift (zweite Zeile, goldene Farbe)',
          type: 'text',
          defaultValue: 'Langlebig. Ehrlich.',
        },
        {
          name: 'description',
          label: 'Beschreibung',
          type: 'textarea',
          defaultValue:
            'Materialien, die zum Ort passen — ausgewählt nach Herkunft, Langlebigkeit und handwerklicher Verarbeitung.',
        },
        { name: 'image', label: 'Sektionsbild', type: 'upload', relationTo: 'media' },
        {
          name: 'items',
          label: 'Materialien',
          type: 'array',
          defaultValue: [
            { name: 'Regionaler Naturstein', use: 'Fassade & Böden', detail: 'Stein aus der Region' },
            { name: 'Eiche', use: 'Innenraum', detail: 'Holzoberflächen im Innenraum' },
            { name: 'Weißputz', use: 'Innenwände', detail: 'Mineralisch, atmungsaktiv' },
            { name: 'Schmiedeeisen', use: 'Außenbereiche', detail: 'Geländer und Details' },
            { name: 'Terrakotta', use: 'Außenbereiche', detail: 'Gebrannter Ton im traditionellen Langformat' },
            { name: 'Lavendel & Rosmarin', use: 'Terrassenbegrünung', detail: 'Mediterrane Wildpflanzen, pflegeleicht' },
          ],
          fields: [
            { name: 'name', label: 'Material', type: 'text', required: true },
            { name: 'use', label: 'Verwendung', type: 'text' },
            { name: 'detail', label: 'Detail', type: 'text' },
          ],
        },
        {
          name: 'hinweis',
          label: 'Hinweis unter der Materialliste',
          type: 'textarea',
          defaultValue:
            'Materialangaben sind Planungsstand. Verbindlich ist die Baubeschreibung im Kaufvertrag.',
        },
      ],
    },
    {
      name: 'galerie',
      label: 'Galerie',
      type: 'group',
      fields: [
        { name: 'eyebrow', label: 'Kleine Überschrift', type: 'text', defaultValue: 'Einblicke' },
        {
          name: 'headline',
          label: 'Überschrift (erster Teil)',
          type: 'text',
          defaultValue: 'Details, die',
        },
        {
          name: 'headlineAccent',
          label: 'Überschrift (goldener Teil)',
          type: 'text',
          defaultValue: 'zählen.',
        },
        {
          name: 'images',
          label: 'Bilder',
          type: 'array',
          fields: [
            { name: 'image', label: 'Bild', type: 'upload', relationTo: 'media' },
            { name: 'alt', label: 'Bildbeschreibung', type: 'text' },
            {
              name: 'aspect',
              label: 'Format',
              type: 'select',
              defaultValue: 'wide',
              options: [
                { label: 'Hochformat (3:4)', value: 'tall' },
                { label: 'Querformat (4:3)', value: 'wide' },
                { label: 'Quadratisch (1:1)', value: 'square' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'gebaeude',
      label: 'Gebäude-Kennzahlen',
      type: 'group',
      fields: [
        { name: 'eyebrow', label: 'Kleine Überschrift', type: 'text', defaultValue: 'Das Gebäude' },
        { name: 'headline', label: 'Überschrift', type: 'text', defaultValue: 'In Zahlen.' },
        {
          name: 'stats',
          label: 'Kennzahlen',
          type: 'array',
          defaultValue: [
            { value: '7', label: 'Geschosse' },
            { value: '39', label: 'Wohneinheiten' },
            { value: '20', label: 'Stellplätze' },
            { value: 'EC 8', label: 'Erdbebenstandard' },
          ],
          fields: [
            { name: 'value', label: 'Wert', type: 'text', required: true },
            { name: 'label', label: 'Bezeichnung', type: 'text', required: true },
          ],
        },
        {
          name: 'features',
          label: 'Ausstattungsmerkmale',
          type: 'array',
          defaultValue: [
            { title: 'Fahrradabstellraum', text: 'Im Erdgeschoss, wettergeschützt und abschließbar — für nachhaltigen Alltag.' },
            { title: 'Bepflanzte Gemeinschaftsterrassen', text: 'Lavendel, Rosmarin und mediterrane Begrünung auf mehreren Ebenen.' },
            { title: 'Stellplätze', text: '20 Stellplätze in der Tiefgarage und im Außenbereich — Tiefgaragenplatz optional.' },
          ],
          fields: [
            { name: 'title', label: 'Titel', type: 'text', required: true },
            { name: 'text', label: 'Text', type: 'textarea' },
          ],
        },
      ],
    },
    {
      name: 'cta',
      label: 'CTA-Sektion (unten)',
      type: 'group',
      fields: [
        {
          name: 'eyebrow',
          label: 'Kleine Überschrift',
          type: 'text',
          defaultValue: 'Mehr erfahren',
        },
        {
          name: 'headline',
          label: 'Überschrift (erste Zeile)',
          type: 'text',
          defaultValue: 'Architekturpläne',
        },
        {
          name: 'headlineAccent',
          label: 'Überschrift (zweite Zeile, goldene Farbe)',
          type: 'text',
          defaultValue: 'auf Anfrage.',
        },
        {
          name: 'description',
          label: 'Beschreibung',
          type: 'textarea',
          defaultValue:
            'Vollständige Grundrisse, Schnitte und Materialspezifikationen sind Bestandteil des Exposés — kostenlos, in vier Sprachen, direkt vom Bauträger.',
        },
        {
          name: 'buttonLabel',
          label: 'Button 1 — Text',
          type: 'text',
          defaultValue: 'Exposé & Pläne anfordern',
        },
        { name: 'buttonLink', label: 'Button 1 — Link', type: 'text', defaultValue: '/kontakt' },
        {
          name: 'buttonSecondaryLabel',
          label: 'Button 2 — Text',
          type: 'text',
          defaultValue: 'Zu den Wohnungen',
        },
        {
          name: 'buttonSecondaryLink',
          label: 'Button 2 — Link',
          type: 'text',
          defaultValue: '/wohnungen',
        },
      ],
    },
  ]),
  hooks: {
    afterChange: [revalidatePages(['/architektur'])],
  },
}
