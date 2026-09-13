import type { GlobalConfig } from 'payload'
import { revalidatePages } from '@/utilities/revalidatePages'
import { lokalisiert } from '@/fields/lokalisiert'

export const WohnungenPage: GlobalConfig = {
  slug: 'wohnungen-page',
  label: 'Wohnungen-Seite',
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
        {
          name: 'title',
          label: 'Seitentitel (Browser-Tab)',
          type: 'text',
          defaultValue: 'Die Wohnungen — Baliv Residence, Bar Montenegro',
        },
        {
          name: 'description',
          label: 'Meta-Beschreibung',
          type: 'textarea',
          defaultValue:
            'Studio, Zweizimmer und Penthouse-Ebene. 39 Einheiten ab 2.500 €/m², schlüsselfertig übergeben. Übergabe Q2 2028.',
        },
      ],
    },
    {
      name: 'hero',
      label: 'Hero',
      type: 'group',
      fields: [
        { name: 'imageAlt', label: "Bildbeschreibung", type: 'text', defaultValue: "Baliv Residence Gebäude" },
        {
          name: 'eyebrow',
          label: 'Kleine Überschrift',
          type: 'text',
          defaultValue: 'Die Wohnungen',
        },
        {
          name: 'headline',
          label: 'Überschrift',
          type: 'text',
          defaultValue: 'Drei Typen. Ihre Wahl.',
        },
        {
          name: 'description',
          label: 'Beschreibung',
          type: 'textarea',
          defaultValue:
            '39 Einheiten in sieben Geschossen — vom kompakten Studio bis zur Penthouse-Ebene mit eigener Dachterrasse.',
        },
        {
          name: 'image',
          label: 'Hintergrundbild',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'buildingStats',
      label: 'Kennzahlen-Leiste (unter dem Hero)',
      type: 'array',
      maxRows: 4,
      defaultValue: [
        { value: '7', label: 'Geschosse' },
        { value: '39', label: 'Wohneinheiten' },
        { value: '20', label: 'Stellplätze' },
        { value: 'Q2 2028', label: 'Übergabe' },
      ],
      fields: [
        { name: 'value', label: 'Wert', type: 'text', required: true },
        { name: 'label', label: 'Bezeichnung', type: 'text', required: true },
      ],
    },
    {
      name: 'typesSection',
      label: 'Wohnungstypen (Sektions-Texte)',
      type: 'group',
      fields: [
        { name: 'exampleLabel', label: "Label Beispielpreis", type: 'text', defaultValue: "Beispiel" },
        {
          name: 'eyebrow',
          label: 'Kleine Überschrift',
          type: 'text',
          defaultValue: 'Grundrisse & Details',
        },
        {
          name: 'headline',
          label: 'Überschrift (erste Zeile)',
          type: 'text',
          defaultValue: 'Drei Wohnungstypen.',
        },
        {
          name: 'headlineLine2',
          label: 'Überschrift (zweite Zeile)',
          type: 'text',
          defaultValue: 'Sieben Geschosse.',
        },
        {
          name: 'unitsLabel',
          label: 'Label über Einheiten-Zahl',
          type: 'text',
          defaultValue: 'Einheiten',
        },
        {
          name: 'priceLabel',
          label: 'Label über Preis',
          type: 'text',
          defaultValue: 'Preis',
        },
        {
          name: 'exampleNote',
          label: 'Hinweis unter dem Beispielpreis',
          type: 'text',
          defaultValue: 'inkl. MwSt.',
        },
        {
          name: 'hinweis',
          label: 'Hinweis unter den Wohnungstypen (Flächen & Preise)',
          type: 'textarea',
          defaultValue:
            'Alle Flächen sind Netto-Nutzflächen einschließlich Terrasse. Der Preis richtet sich nach Etage und Aussicht. Die vollständige Preisliste erhalten Sie mit dem Exposé.',
        },
        {
          name: 'ctaLabel',
          label: 'Button-Text je Wohnungstyp',
          type: 'text',
          defaultValue: 'Exposé anfragen',
        },
      ],
    },
    {
      name: 'types',
      label: 'Wohnungstypen',
      type: 'array',
      minRows: 3,
      maxRows: 3,
      defaultValue: [
        {
          nr: '01',
          type: 'Studio',
          tag: 'Erdgeschoss',
          size: '28,1–29,7 m²',
          terrace: 'Eigener Garten',
          units: '2 Einheiten',
          price: 'ab 2.700 €/m²',
          layout: '1 Wohn-/Schlafraum · Küchenzeile · Bad',
          description:
            'Kompakter Einstieg mit eigenem Garten, mindestens 4 Meter tief. Geeignet als Pied-à-terre oder Ferienwohnung.',
          exampleSize: 28.08,
          examplePrice: 75800,
        },
        {
          nr: '02',
          type: 'Zweizimmerwohnung',
          tag: 'Alle Etagen',
          size: '46,7–48,8 m²',
          terrace: 'Balkon oder Terrasse',
          units: '34 Einheiten',
          price: 'ab 2.500 €/m²',
          layout: '1 Schlafzimmer · Wohn-/Essbereich · Küche · Bad',
          description:
            'Die Wahl der meisten Käufer. Mit steigender Etage wächst der Ausblick — von den Olivenhainen im Erdgeschoss bis zum Meer in den oberen Etagen. Im Erdgeschoss mit Terrasse und eigenem Gartenanteil, mindestens 4 Meter tief.',
          exampleSize: 46.79,
          examplePrice: 116975,
        },
        {
          nr: '03',
          type: 'Penthouse-Ebene',
          tag: '6. Obergeschoss',
          size: '51,6–81,2 m²',
          terrace: 'Eigene Dachterrasse',
          units: '3 Einheiten',
          price: 'ab 3.600 €/m²',
          layout: 'Zwei- oder Dreizimmer · Wohn-/Essbereich · Küche · Bad',
          description:
            'Zwei- und Dreizimmer auf der obersten Etage, jeweils mit eigener Dachterrasse: 38,5 m² · 42,9 m² · 65,9 m² zur alleinigen Nutzung, nicht Bestandteil der Wohnfläche. Panoramablick über Adria, Rumija und Stari Bar.',
          exampleSize: 51.61,
          examplePrice: 185800,
        },
      ],
      fields: [
        { name: 'nr', label: 'Nummer', type: 'text', required: true },
        { name: 'type', label: 'Typ (Überschrift)', type: 'text', required: true },
        { name: 'tag', label: 'Lage im Haus (z.B. Erdgeschoss) — Bild-Etikett und Zeile unter dem Typ', type: 'text' },
        { name: 'size', label: 'Fläche (z.B. 28,1–29,7 m²)', type: 'text' },
        { name: 'terrace', label: 'Außenbereich (Garten/Balkon/Terrasse)', type: 'text' },
        { name: 'units', label: 'Einheiten', type: 'text' },
        { name: 'price', label: 'Preis (z.B. ab 2.500 €/m²)', type: 'text' },
        { name: 'layout', label: 'Zimmer / Grundriss-Beschreibung', type: 'text' },
        { name: 'description', label: 'Beschreibung', type: 'textarea' },
        { name: 'exampleSize', label: 'Beispiel Größe (m²)', type: 'number' },
        { name: 'examplePrice', label: 'Beispiel Preis (€)', type: 'number' },
        {
          name: 'floorplan',
          label: 'Grundriss',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'image',
          label: 'Bild',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'ausstattungSection',
      label: 'Ausstattung (Sektions-Texte)',
      type: 'group',
      fields: [
        {
          name: 'eyebrow',
          label: 'Kleine Überschrift',
          type: 'text',
          defaultValue: 'Ausstattung',
        },
        {
          name: 'headline',
          label: 'Überschrift (weißer Teil)',
          type: 'text',
          defaultValue: 'Schlüsselfertig übergeben.',
        },
        {
          name: 'headlineAccent',
          label: 'Überschrift (goldener Teil)',
          type: 'text',
          defaultValue: 'Hochwertig ausgestattet.',
        },
        {
          name: 'description',
          label: 'Beschreibung',
          type: 'textarea',
          defaultValue:
            'Jede Wohnung wird vollständig fertiggestellt übergeben. Einbauküche und Tiefgaragenplatz sind optional.',
        },
        {
          name: 'hinweis',
          label: 'Hinweis unter der Ausstattung',
          type: 'text',
          defaultValue: 'Ausstattung nach Baubeschreibung. Marken und Modelle im Exposé.',
        },
        {
          name: 'premiumTitle',
          label: 'Titel der Premium-Box',
          type: 'text',
          defaultValue: 'Premium-Paket optional',
        },
      ],
    },
    {
      name: 'premiumPaket',
      label: 'Premium-Paket (Punkte in der Box)',
      type: 'array',
      fields: [{ name: 'label', label: 'Text', type: 'text', required: true }],
    },
    {
      name: 'interiorImages',
      label: 'Interieur-Bilder (3 Stück unter der Ausstattung)',
      type: 'array',
      maxRows: 3,
      fields: [
        { name: 'image', label: 'Bild', type: 'upload', relationTo: 'media' },
        { name: 'alt', label: 'Bildunterschrift / Alt-Text', type: 'text', required: true },
      ],
    },
    {
      name: 'gebaeude',
      label: 'Das Gebäude (Sektion)',
      type: 'group',
      fields: [
        { name: 'imageAlt', label: "Bildbeschreibung", type: 'text', defaultValue: "Terrassen und Architektur" },
        {
          name: 'eyebrow',
          label: 'Kleine Überschrift',
          type: 'text',
          defaultValue: 'Das Gebäude',
        },
        {
          name: 'headline',
          label: 'Überschrift',
          type: 'text',
          defaultValue: 'Mehr als vier Wände.',
        },
        {
          name: 'image',
          label: 'Sektionsbild',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'gebaeudeFeatures',
      label: 'Gebäude-Merkmale',
      type: 'array',
      defaultValue: [
        { title: '20 Stellplätze', text: 'In der Tiefgarage und im Außenbereich; Tiefgaragenplatz optional.' },
        { title: 'Bepflanzte Terrassen', text: 'Lavendel, Rosmarin und mediterrane Begrünung auf mehreren Ebenen.' },
        { title: 'Fahrradabstellraum', text: 'Im Erdgeschoss, wettergeschützt und abschließbar.' },
        { title: 'Naturstein-Fassade', text: 'Bögen, Pergolen und variierende Fassadengestaltung — von allen Seiten hochwertig.' },
        { title: 'Eurocode 8', text: 'Geplant nach europäischem Erdbebenstandard.' },
      ],
      fields: [
        { name: 'title', label: 'Titel', type: 'text', required: true },
        { name: 'text', label: 'Text', type: 'textarea' },
      ],
    },
    {
      name: 'cta',
      label: 'CTA-Sektion (unten)',
      type: 'group',
      fields: [
        { name: 'whatsappNachricht', label: "WhatsApp — vorbelegte Nachricht", type: 'textarea', defaultValue: "Guten Tag, ich interessiere mich für Baliv Residence." },
        {
          name: 'eyebrow',
          label: 'Kleine Überschrift',
          type: 'text',
          defaultValue: 'Jetzt anfragen',
        },
        {
          name: 'headline',
          label: 'Überschrift',
          type: 'text',
          defaultValue: 'Interesse an einer Einheit?',
        },
        {
          name: 'description',
          label: 'Beschreibung',
          type: 'textarea',
          defaultValue:
            'Vollständiges Exposé mit allen Grundrissen, Preisliste und aktueller Verfügbarkeit — direkt vom Bauträger, Beratung in vier Sprachen, ohne Makler.',
        },
        {
          name: 'buttonLabel',
          label: 'Button-Text (primär)',
          type: 'text',
          defaultValue: 'Exposé anfordern',
        },
        {
          name: 'buttonLink',
          label: 'Button-Link (primär)',
          type: 'text',
          defaultValue: '/kontakt',
        },
        {
          name: 'whatsappLabel',
          label: 'WhatsApp-Button-Text',
          type: 'text',
          defaultValue: 'WhatsApp',
        },
        {
          name: 'whatsappUrl',
          label: 'WhatsApp-Link',
          type: 'text',
          defaultValue:
            'https://wa.me/38268517873?text=Guten%20Tag%2C%20ich%20interessiere%20mich%20f%C3%BCr%20Baliv%20Residence.',
        },
        {
          name: 'note',
          label: 'Hinweis unter den Buttons',
          type: 'text',
          defaultValue:
            'In der Regel Antwort innerhalb von 24 Stunden · Beratung in vier Sprachen · Direkt vom Bauträger',
        },
      ],
    },
    {
      name: 'ausstattung',
      label: 'Ausstattung (Kacheln)',
      type: 'array',
      admin: {
        description:
          'Keine Markennamen als Zusage verwenden. Das Symbol bitte über das Feld „Symbol“ wählen — es gilt für alle Sprachen. Ohne Auswahl richtet es sich nach deutschen Stichworten im Titel (Armatur/Bad, Klima, Eurocode/Erdbeben, Stein, Holz, Schlüssel), in Übersetzungen nach der Position der Kachel.',
      },
      defaultValue: [
        { brand: 'Markenarmaturen im Bad', label: 'Sanitärausstattung' },
        { brand: 'Klimaanlage vorbereitet', label: 'Klimatisierung' },
        { brand: 'Eurocode 8', label: 'Erdbebenstandard' },
        { brand: 'Naturstein', label: 'Böden & Fassade' },
        { brand: 'Holzoberflächen', label: 'Innenraum' },
        { brand: 'Schlüsselfertig', label: 'Übergabe komplett' },
      ],
      fields: [
        { name: 'icon', label: 'Symbol', type: 'select', options: [{ label: 'Armatur / Bad', value: 'armatur' }, { label: 'Klima', value: 'klima' }, { label: 'Erdbebensicherheit', value: 'erdbeben' }, { label: 'Naturstein', value: 'stein' }, { label: 'Holz', value: 'holz' }, { label: 'Schlüssel', value: 'schluessel' }] },
        { name: 'brand', label: 'Titel', type: 'text', required: true },
        { name: 'label', label: 'Bezeichnung', type: 'text', required: true },
      ],
    },
    {
      name: 'included',
      label: 'Standard-Ausstattung (immer dabei)',
      type: 'array',
      defaultValue: [
        { label: 'Markenarmaturen im Bad' },
        { label: 'Klimaanlage vorbereitet' },
        { label: 'Naturstein-Böden' },
        { label: 'Holzoberflächen' },
        { label: 'Eurocode 8 Erdbebenstandard' },
        { label: 'Schlüsselfertige Übergabe' },
        { label: 'MwSt. inklusive' },
      ],
      fields: [
        { name: 'label', label: 'Bezeichnung', type: 'text', required: true },
      ],
    },
  ]),
  hooks: {
    afterChange: [revalidatePages(['/wohnungen'])],
  },
}
