import type { GlobalConfig } from 'payload'
import { revalidatePages } from '@/utilities/revalidatePages'
import { lokalisiert } from '@/fields/lokalisiert'

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
  fields: lokalisiert([
    {
      name: 'meta',
      label: 'SEO / Meta-Angaben',
      type: 'group',
      fields: [
        { name: 'title', label: 'Seitentitel (Browser-Tab und Google)', type: 'text', defaultValue: "Lage — Baliv Residence, Bar Montenegro" },
        { name: 'description', label: 'Meta-Beschreibung', type: 'textarea', defaultValue: "Bar liegt am Fuß der Stari-Bar-Festung — zwischen Adria, Olivenhainen und dem Rumija-Gebirge. Ca. 1 km bis Stari Bar, 32 km bis zum Flughafen Podgorica." },
      ],
    },
    {
      name: 'hero',
      label: 'Hero',
      type: 'group',
      fields: [
        {
          name: 'headline',
          label: 'Überschrift',
          type: 'text',
          defaultValue: 'Bar. Montenegros aufgehender Stern.',
        },
        {
          name: 'subline',
          label: 'Unterzeile',
          type: 'text',
          defaultValue: 'Adria · Rumija · Altstadt',
        },
        {
          name: 'description',
          label: 'Beschreibung',
          type: 'textarea',
          defaultValue:
            'Bar liegt an der Adria-Küste Montenegros, eingebettet zwischen dem Rumija-Gebirge und dem Mittelmeer. Die Stadt ist regionale Drehscheibe mit Fährhafen und Bahnlinie — die Autobahn Richtung Norden ist im Bau.',
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
          defaultValue: 'https://maps.google.com/?q=42.089143,19.118888',
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
      label: 'Entfernungen (Erreichbarkeitstabelle)',
      type: 'array',
      defaultValue: [
        { icon: 'altstadt', place: 'Stari Bar Festung', note: '2.500 Jahre Stadtgeschichte', distance: 'ca. 1 km', detail: '5 Min' },
        { icon: 'kueste', place: 'Erster Strand', note: 'Topolica', distance: 'ca. 2,5 km', detail: '8 Min' },
        { icon: 'kueste', place: 'Hafen Bar', note: 'Fähre nach Bari', distance: 'ca. 2 km', detail: '8 Min' },
        { icon: 'kueste', place: 'Strand Sutomore', note: 'Sandstrand', distance: '7,4 km', detail: '15 Min' },
        { icon: 'natur', place: 'Skadar See', note: 'Nationalpark', distance: '17,7 km', detail: '40 Min' },
        { icon: 'ort', place: 'Flughafen Podgorica', note: 'International', distance: '32 km', detail: '45 Min' },
        { icon: 'ort', place: 'Flughafen Tivat', note: 'Saisonflüge', distance: '48 km', detail: '60 Min' },
        { icon: 'altstadt', place: 'Kotor Altstadt', note: 'UNESCO Welterbe', distance: '47 km', detail: '80 Min' },
        { icon: 'ort', place: 'Flughafen Dubrovnik', note: 'beste Verbindungen nach DACH', distance: '125 km', detail: 'unter 3 Std.' },
      ],
      fields: [
        {
          name: 'icon',
          label: 'Symbol',
          type: 'select',
          options: [
            { label: 'Ortsmarke (z.B. Flughafen)', value: 'ort' },
            { label: 'Meer / Strand / Hafen', value: 'kueste' },
            { label: 'Festung / Altstadt', value: 'altstadt' },
            { label: 'Berge', value: 'berge' },
            { label: 'Natur / Landschaft', value: 'natur' },
          ],
        },
        { name: 'place', label: 'Ort', type: 'text', required: true },
        { name: 'distance', label: 'Entfernung (z.B. ca. 2 km)', type: 'text', required: true },
        { name: 'detail', label: 'Fahrzeit (z.B. 8 Min)', type: 'text' },
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
      defaultValue: [
        {
          title: 'Hafen & Fährverbindung',
          text: 'Von Bar aus verkehrt regelmäßig eine Fähre nach Bari, Italien. Die Überfahrt dauert rund neun Stunden — ein wichtiger Korridor für Reisende und Handel.',
        },
        {
          title: 'Autobahn & Schiene',
          text: 'Die im Bau befindliche Autobahn Bar–Boljare wird die Stadt mit dem Balkan-Kernland verbinden; der erste Abschnitt ist seit 2022 in Betrieb. Die historische Eisenbahnlinie Bar–Belgrad durchquert spektakuläre Gebirgslandschaften.',
        },
        {
          title: 'Gewachsene Küstenstadt',
          text: 'Über Fähre und Bahn ist Bar für viele Reisende der Einstieg nach Montenegro — und zugleich eine gewachsene Stadt mit eigenem Alltag, nicht nur ein Ferienort.',
        },
      ],
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
      label: 'Preisniveau an der Küste (Sektion)',
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
          defaultValue: 'Preisniveau an der montenegrinischen Küste',
        },
        {
          name: 'description',
          label: 'Beschreibung',
          type: 'textarea',
          defaultValue: 'Montenegro ist Kandidat für den EU-Beitritt, die Verhandlungen laufen.',
        },
        {
          name: 'standText',
          label: 'Stand-Satz über der Preistabelle',
          type: 'text',
          defaultValue: 'Angebotspreise für Wohnungen, Stand September 2026.',
        },
        {
          name: 'note',
          label: 'Quellenzeile unter der Preistabelle',
          type: 'textarea',
          defaultValue: 'Quelle: Estitor, Auswertung aktiver Inserate, 03.09.2026.',
        },
      ],
    },
    {
      name: 'marktPreise',
      label: 'Preisniveau (Zeilen)',
      type: 'array',
      defaultValue: [
        { label: 'Tivat', price: '4.462 €/m²', highlight: false },
        { label: 'Budva', price: '3.569 €/m²', highlight: false },
        { label: 'Bar, Durchschnitt', price: '2.744 €/m²', highlight: false },
        { label: 'Baliv Residence', price: 'ab 2.500 €/m²', highlight: true },
      ],
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
      defaultValue: [
        { value: '250+', label: 'Sonnentage/Jahr' },
        { value: '26 °C', label: 'Ø Wassertemp. Juli' },
        { value: '2.000+', label: 'Jahre Olivenhaine' },
        { value: '13 km', label: 'Sandstrand · Velika Plaža, Ulcinj — 45 Min' },
      ],
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
        { name: 'whatsappNachricht', label: "WhatsApp — vorbelegte Nachricht", type: 'textarea', defaultValue: "Guten Tag, ich möchte eine Besichtigung bei Baliv Residence anfragen." },
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
          defaultValue: 'nach Vereinbarung.',
        },
        {
          name: 'description',
          label: 'Beschreibung',
          type: 'textarea',
          defaultValue:
            'Wir organisieren Besichtigungen vor Ort — nach Absprache auch mit Abholung vom Flughafen Podgorica oder Tivat. Begleitung auf Deutsch, Englisch, Montenegrinisch oder Türkisch, kein Makler, kein Druck.',
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
  ]),
  hooks: {
    afterChange: [revalidatePages(['/lage'])],
  },
}
