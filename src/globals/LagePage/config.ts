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
        {
          name: 'image',
          label: 'Hintergrundbild',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'imageAlt',
          label: 'Bild-Alternativtext',
          type: 'text',
          defaultValue: 'Bar, Montenegro — Luftaufnahme',
        },
        {
          name: 'address',
          label: 'Adresse (Leiste unten im Hero)',
          type: 'text',
          defaultValue: 'Bjeliši BB, 85000 Bar, Montenegro',
        },
        {
          name: 'mapsLabel',
          label: 'Karten-Link Text',
          type: 'text',
          defaultValue: 'Google Maps öffnen',
        },
        {
          name: 'mapsUrl',
          label: 'Karten-Link URL',
          type: 'text',
          defaultValue: 'https://maps.google.com/?q=Bjeli%C5%A1i+BB,+Bar,+Montenegro',
        },
      ],
    },
    {
      name: 'erreichbarkeit',
      label: 'Erreichbarkeit (Sektion)',
      type: 'group',
      fields: [
        {
          name: 'eyebrow',
          label: 'Kleine Überschrift',
          type: 'text',
          defaultValue: 'Erreichbarkeit',
        },
        {
          name: 'headline',
          label: 'Überschrift (erste Zeile)',
          type: 'text',
          defaultValue: 'Alles nah.',
        },
        {
          name: 'headlineAccent',
          label: 'Überschrift (zweite Zeile, goldene Farbe)',
          type: 'text',
          defaultValue: 'Nichts zu weit.',
        },
        {
          name: 'description',
          label: 'Beschreibung',
          type: 'textarea',
          defaultValue:
            'Bar verbindet das Beste zweier Welten: südliche Ruhe mit guter Infrastruktur. Zwei internationale Flughäfen, Fährverbindung nach Italien, direkte Bahnlinie nach Belgrad — und trotzdem kein Massentourismus.',
        },
      ],
    },
    {
      name: 'karte',
      label: 'Karte',
      type: 'group',
      fields: [
        {
          name: 'image',
          label: 'Kartenbild',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'imageAlt',
          label: 'Bild-Alternativtext',
          type: 'text',
          defaultValue: 'Karte Montenegro — Lage Bar',
        },
        {
          name: 'badgeTitle',
          label: 'Markierung — Titel',
          type: 'text',
          defaultValue: 'Baliv Residence',
        },
        {
          name: 'badgeSubline',
          label: 'Markierung — Unterzeile',
          type: 'text',
          defaultValue: 'Bar, Montenegro',
        },
        {
          name: 'caption',
          label: 'Bildunterschrift',
          type: 'text',
          defaultValue: 'Schematische Darstellung · nicht maßstabsgetreu',
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
      name: 'highlightsSection',
      label: 'Highlights (Sektions-Kopf)',
      type: 'group',
      fields: [
        {
          name: 'eyebrow',
          label: 'Kleine Überschrift',
          type: 'text',
          defaultValue: 'Umgebung',
        },
        {
          name: 'headline',
          label: 'Überschrift (erste Zeile)',
          type: 'text',
          defaultValue: 'Was Bar',
        },
        {
          name: 'headlineAccent',
          label: 'Überschrift (zweite Zeile, goldene Farbe)',
          type: 'text',
          defaultValue: 'einzigartig macht.',
        },
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
          name: 'eyebrow',
          label: 'Kleine Überschrift',
          type: 'text',
          defaultValue: 'Warum Bar',
        },
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
        {
          name: 'note',
          label: 'Hinweis unter der Preistabelle',
          type: 'textarea',
          defaultValue:
            'Vergleichspreise basieren auf öffentlich verfügbaren Marktdaten, Stand 2024/2025.',
        },
      ],
    },
    {
      name: 'marktPreise',
      label: 'Preisvergleich (Zeilen)',
      type: 'array',
      fields: [
        { name: 'label', label: 'Bezeichnung', type: 'text', required: true },
        { name: 'price', label: 'Preis', type: 'text', required: true },
        {
          name: 'highlight',
          label: 'Hervorgehoben (goldene Darstellung)',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'stats',
      label: 'Kennzahlen-Kacheln',
      type: 'array',
      fields: [
        { name: 'value', label: 'Wert', type: 'text', required: true },
        { name: 'label', label: 'Bezeichnung', type: 'text', required: true },
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
          defaultValue: 'Vor Ort überzeugen',
        },
        {
          name: 'headline',
          label: 'Überschrift (erste Zeile)',
          type: 'text',
          defaultValue: 'Besichtigung',
        },
        {
          name: 'headlineAccent',
          label: 'Überschrift (zweite Zeile, goldene Farbe)',
          type: 'text',
          defaultValue: 'jederzeit möglich.',
        },
        {
          name: 'description',
          label: 'Beschreibung',
          type: 'textarea',
          defaultValue:
            'Wir organisieren Besichtigungen vor Ort — inklusive Abholung vom Flughafen Podgorica oder Tivat. Deutschsprachige Begleitung, kein Makler, kein Druck.',
        },
        {
          name: 'buttonLabel',
          label: 'Button-Text (primär)',
          type: 'text',
          defaultValue: 'Besichtigung anfragen',
        },
        {
          name: 'buttonUrl',
          label: 'Button-Link (primär)',
          type: 'text',
          defaultValue: '/kontakt',
        },
        {
          name: 'whatsappLabel',
          label: 'Button-Text (WhatsApp)',
          type: 'text',
          defaultValue: 'WhatsApp',
        },
        {
          name: 'whatsappUrl',
          label: 'Button-Link (WhatsApp)',
          type: 'text',
          defaultValue:
            'https://wa.me/38268517873?text=Guten%20Tag%2C%20ich%20m%C3%B6chte%20eine%20Besichtigung%20bei%20Baliv%20Residence%20anfragen.',
        },
      ],
    },
  ],
}
