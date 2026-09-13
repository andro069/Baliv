import type { GlobalConfig } from 'payload'
import { revalidatePages } from '@/utilities/revalidatePages'
import { lokalisiert } from '@/fields/lokalisiert'

export const InvestmentPage: GlobalConfig = {
  slug: 'investment-page',
  label: 'Investment-Seite',
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
        { name: 'title', label: 'Seitentitel (Browser-Tab und Google)', type: 'text', defaultValue: "Investment — Baliv Residence, Bar Montenegro" },
        { name: 'description', label: 'Meta-Beschreibung', type: 'textarea', defaultValue: "Investieren in Bar, Montenegro: Euro seit 2002, NATO seit 2017, 9 % Einkommensteuer auf Mieteinnahmen. Beispielrechnung, Steuerüberblick und Zahlungsplan." },
      ],
    },
    {
      name: 'hero',
      label: 'Hero',
      type: 'group',
      fields: [
        { name: 'eyebrow', label: "Kleine Überschrift", type: 'text', defaultValue: "Investment" },
        { name: 'imageAlt', label: "Bildbeschreibung", type: 'text', defaultValue: "Aussicht von der Terrasse der Baliv Residence" },
        {
          name: 'headline',
          label: 'Überschrift',
          type: 'text',
          defaultValue: 'Investieren, wo Europa wächst.',
        },
        {
          name: 'description',
          label: 'Beschreibung',
          type: 'textarea',
          defaultValue:
            'Montenegro: stabile Währung, niedrige Unternehmens- und Einkommensteuer — und ein Markt, der gerade erst entdeckt wird.',
        },
        {
          name: 'image',
          label: 'Hintergrundbild',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'kennzahlen',
          label: 'Kennzahlenleiste (nur belegbare Angaben)',
          type: 'array',
          maxRows: 4,
          defaultValue: [
            { value: 'Euro', label: 'seit 2002' },
            { value: 'NATO', label: 'seit 2017' },
            { value: '9 %', label: 'Einkommensteuer auf Mieteinnahmen' },
          ],
          fields: [
            { name: 'value', label: 'Wert', type: 'text', required: true },
            { name: 'label', label: 'Beschriftung', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'warumMontenegro',
      label: 'Warum Montenegro? (Sektion)',
      type: 'group',
      fields: [
        { name: 'eyebrow', label: "Kleine Überschrift", type: 'text', defaultValue: "Standortvorteil" },
        { name: 'imageAlt', label: "Bildbeschreibung", type: 'text', defaultValue: "Baliv Residence" },
        {
          name: 'headline',
          label: 'Überschrift',
          type: 'text',
          defaultValue: 'Warum Montenegro?',
        },
        {
          name: 'description',
          label: 'Beschreibung',
          type: 'textarea',
          defaultValue:
            'Westliche Rahmenbedingungen: der Euro als Währung, die NATO-Mitgliedschaft und der Erwerb von Wohnungseigentum auch für Ausländer. Montenegro ist EU-Beitrittskandidat, die Verhandlungen laufen; als Zieldatum wird 2028 genannt.',
        },
        {
          name: 'image',
          label: 'Sektionsbild',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'vorteile',
          label: 'Vorteile (4 Punkte)',
          type: 'array',
          maxRows: 4,
          defaultValue: [
            { title: 'NATO-Mitglied', text: 'Seit 2017 Mitglied des westlichen Verteidigungsbündnisses.' },
            { title: 'Euro-Währung', text: 'Seit 2002. Kein Wechselkursrisiko für Anleger aus dem Euroraum.' },
            { title: 'EU-Beitrittskandidat', text: 'Die Beitrittsverhandlungen laufen; als Zieldatum wird 2028 genannt.' },
            { title: 'Rechtssicherheit', text: 'Ausländer können Wohnungseigentum erwerben. Notariell beurkundete Eigentumsübertragung.' },
          ],
          fields: [
            { name: 'title', label: 'Titel', type: 'text', required: true },
            { name: 'text', label: 'Text', type: 'textarea' },
          ],
        },
        {
          name: 'bildKennzahlen',
          label: 'Kacheln auf dem Sektionsbild',
          type: 'array',
          maxRows: 4,
          defaultValue: [
            { value: 'NATO', label: 'seit 2017' },
            { value: 'Euro', label: 'seit 2002' },
            { value: 'EU', label: 'Ziel 2028, Verhandlungen laufen' },
            { value: '0 %', label: 'Vermögensteuer' },
          ],
          fields: [
            { name: 'value', label: 'Wert', type: 'text', required: true },
            { name: 'label', label: 'Beschriftung', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'marktdaten',
      label: 'Marktdaten & Zeitleiste (Sektion)',
      type: 'group',
      fields: [
        { name: 'eyebrow', label: 'Kleine Überschrift', type: 'text', defaultValue: 'Marktdaten' },
        { name: 'headline', label: 'Überschrift (erste Zeile)', type: 'text', defaultValue: 'Bar an der' },
        {
          name: 'headlineAccent',
          label: 'Überschrift (zweite Zeile, goldene Farbe)',
          type: 'text',
          defaultValue: 'montenegrinischen Adria.',
        },
        {
          name: 'description',
          label: 'Beschreibung',
          type: 'textarea',
          defaultValue:
            'Bar hat den wichtigsten Seehafen Montenegros und liegt direkt unterhalb der historischen Altstadt Stari Bar. Die Einstiegspreise bei Baliv Residence beginnen ab 2.500 €/m².',
        },
        {
          name: 'kennzahlWert',
          label: 'Kennzahl (optional, z. B. „+5 %")',
          type: 'text',
          admin: {
            description:
              'Höchstens eine Zahl — nur mit belegter Quelle und Jahr (z. B. MONSTAT oder Zentralbank von Montenegro). Leer lassen, dann wird keine Zahl angezeigt.',
          },
        },
        { name: 'kennzahlLabel', label: 'Kennzahl — Beschriftung', type: 'text' },
        { name: 'kennzahlText', label: 'Kennzahl — Erläuterung', type: 'textarea' },
        {
          name: 'quelle',
          label: 'Fußnote: Quelle und Jahr',
          type: 'text',
          admin: {
            description: 'z. B. „Quelle: MONSTAT, Statistik der Wohnungspreise, 2025". Wird nur zusammen mit einer Kennzahl angezeigt.',
          },
        },
        { name: 'zeitleisteTitel', label: 'Zeitleiste — Titel', type: 'text', defaultValue: 'Entwicklungspfad' },
        {
          name: 'zeitleiste',
          label: 'Zeitleiste',
          type: 'array',
          maxRows: 6,
          defaultValue: [
            { year: '2026', event: 'Genehmigung · Baubeginn Oktober 2026' },
            { year: '2027', event: 'Rohbau' },
            { year: '2028', event: 'Übergabe (Q2)' },
          ],
          fields: [
            { name: 'year', label: 'Jahr', type: 'text', required: true },
            { name: 'event', label: 'Ereignis', type: 'text', required: true },
            { name: 'note', label: 'Hinweis (optional)', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'steuerSektion',
      label: 'Steuer-Sektion (Texte)',
      type: 'group',
      fields: [
        { name: 'eyebrow', label: "Kleine Überschrift", type: 'text', defaultValue: "Steuern" },
        { name: 'headline', label: 'Überschrift (erste Zeile)', type: 'text', defaultValue: 'Keine Vermögensteuer.' },
        {
          name: 'headlineAccent',
          label: 'Überschrift (zweite Zeile, goldene Farbe)',
          type: 'text',
          defaultValue: '9 % auf Mieteinnahmen.',
        },
        {
          name: 'description',
          label: 'Beschreibung',
          type: 'textarea',
          defaultValue: 'Die wichtigsten Steuern beim Kauf und bei der Vermietung einer Wohnung in Montenegro im Überblick.',
        },
        {
          name: 'fussnote',
          label: 'Fußnote',
          type: 'textarea',
          defaultValue:
            'Allgemeine Informationen, Stand 2026. Keine Steuerberatung. Die Behandlung im Wohnsitzland richtet sich nach dem jeweiligen Doppelbesteuerungsabkommen.',
        },
      ],
    },
    {
      name: 'steuerDaten',
      label: 'Steuerdaten',
      type: 'array',
      defaultValue: [
        {
          label: 'Grunderwerbsteuer',
          value: 'entfällt',
          note: 'Beim Kauf vom Bauträger. Der Kaufpreis enthält 21 % MwSt.; die Übertragungssteuer fällt erst beim Weiterverkauf an (gestaffelt 3–6 %).',
        },
        { label: 'Jahresgrundsteuer', value: '0,1–1 %', note: 'Je nach Lage und Größe' },
        { label: 'Einkommensteuer (Miete)', value: '9 %', note: 'Pauschal auf Mieteinnahmen' },
        { label: 'Körperschaftsteuer', value: '9 / 12 / 15 %', note: 'Gestaffelt nach Gewinnhöhe' },
        { label: 'Kapitalertragsteuer', value: '9 %', note: 'Auf Veräußerungsgewinn' },
        { label: 'Mehrwertsteuer', value: 'Inklusive', note: 'Im Kaufpreis enthalten' },
      ],
      fields: [
        { name: 'hervorheben', label: 'Wert golden hervorheben', type: 'checkbox', defaultValue: false },
        { name: 'label', label: 'Bezeichnung', type: 'text', required: true },
        { name: 'value', label: 'Wert', type: 'text', required: true },
        { name: 'note', label: 'Hinweis', type: 'text' },
      ],
    },
    {
      name: 'mietRendite',
      label: 'Mietrendite Beispiel',
      type: 'group',
      admin: {
        description:
          'Alle Beträge der Beispielrechnung werden aus diesen Feldern berechnet: Kaufpreis = Größe × Preis/m²; Brutto = Wochen × Wochenpreis je Saison; Ertrag vor Steuer = Brutto − Verwaltungsquote − Betriebskosten; Nettoertrag = Ertrag vor Steuer − Steuersatz; Rendite = Nettoertrag ÷ Kaufpreis.',
      },
      fields: [
        { name: 'eyebrow', label: "Kleine Überschrift", type: 'text', defaultValue: "Mietrendite" },
        { name: 'labelHauptsaison', label: "Liste — Hauptsaison", type: 'text', defaultValue: "Hauptsaison" },
        { name: 'labelNebensaison', label: "Liste — Nebensaison", type: 'text', defaultValue: "Nebensaison" },
        { name: 'labelGesamt', label: "Liste — Vermietung gesamt", type: 'text', defaultValue: "Vermietung gesamt" },
        { name: 'labelVerwaltung', label: "Liste — Verwaltung", type: 'text', defaultValue: "Verwaltung und Reinigung" },
        { name: 'vorlageSaison', label: "Liste — Wert Saison (Platzhalter {wochen}, {preis})", type: 'text', defaultValue: "{wochen} Wochen · {preis}/Woche" },
        { name: 'vorlageGesamt', label: "Liste — Wert gesamt (Platzhalter {wochen})", type: 'text', defaultValue: "{wochen} Wochen/Jahr" },
        { name: 'vorlageVerwaltung', label: "Liste — Wert Verwaltung (Platzhalter {quote})", type: 'text', defaultValue: "{quote} % der Einnahmen" },
        { name: 'rechnerTitel', label: "Rechnung — Titel (Platzhalter {flaeche})", type: 'text', defaultValue: "Beispielrechnung · {flaeche} m² Zweizimmerwohnung" },
        { name: 'zeileKaufpreis', label: "Rechnung — Kaufpreis (Platzhalter {flaeche}, {preisProQm})", type: 'text', defaultValue: "Kaufpreis ({flaeche} m² × {preisProQm})" },
        { name: 'zeileHauptsaison', label: "Rechnung — Hauptsaison (Platzhalter {wochen}, {preis})", type: 'text', defaultValue: "Hauptsaison · {wochen} Wochen × {preis}" },
        { name: 'zeileNebensaison', label: "Rechnung — Nebensaison (Platzhalter {wochen}, {preis})", type: 'text', defaultValue: "Nebensaison · {wochen} Wochen × {preis}" },
        { name: 'zeileBrutto', label: "Rechnung — Brutto", type: 'text', defaultValue: "Bruttoeinnahmen" },
        { name: 'zeileVerwaltung', label: "Rechnung — Verwaltung (Platzhalter {quote})", type: 'text', defaultValue: "– Verwaltung und Reinigung ({quote} %)" },
        { name: 'zeileBetrieb', label: "Rechnung — Betrieb", type: 'text', defaultValue: "– Betrieb und Instandhaltung" },
        { name: 'zeileVorSteuer', label: "Rechnung — vor Steuer", type: 'text', defaultValue: "= Ertrag vor Steuer" },
        { name: 'zeileSteuer', label: "Rechnung — Steuer (Platzhalter {satz})", type: 'text', defaultValue: "– Einkommensteuer {satz} %" },
        { name: 'zeileNetto', label: "Rechnung — Nettoertrag", type: 'text', defaultValue: "= Nettoertrag" },
        { name: 'zeileRendite', label: "Rechnung — Rendite (Platzhalter {kaufpreis})", type: 'text', defaultValue: "Rendite auf {kaufpreis}" },
        { name: 'headline', label: 'Überschrift', type: 'text', defaultValue: 'Mietertrag an einem Beispiel.' },
        {
          name: 'description',
          label: 'Einleitungstext',
          type: 'textarea',
          defaultValue:
            'Bar liegt nahe Stari Bar, dem Hafen und der Natur der Küste. Die Beispielrechnung zeigt, wie sich Mieteinnahmen, Kosten und Steuer bei einer Zweizimmerwohnung zusammensetzen.',
        },
        { name: 'size', label: 'Größe (m²)', type: 'number', defaultValue: 46.79 },
        { name: 'pricePerSqm', label: 'Preis pro m² (€)', type: 'number', defaultValue: 2500 },
        { name: 'hauptsaisonWochen', label: 'Hauptsaison — Wochen', type: 'number', defaultValue: 10 },
        { name: 'hauptsaisonWochenpreis', label: 'Hauptsaison — Wochenpreis (€)', type: 'number', defaultValue: 850 },
        { name: 'nebensaisonWochen', label: 'Nebensaison — Wochen', type: 'number', defaultValue: 15 },
        { name: 'nebensaisonWochenpreis', label: 'Nebensaison — Wochenpreis (€)', type: 'number', defaultValue: 450 },
        { name: 'verwaltungQuote', label: 'Verwaltung und Reinigung (% der Bruttoeinnahmen)', type: 'number', defaultValue: 20 },
        { name: 'betriebskosten', label: 'Betrieb und Instandhaltung (€ pro Jahr)', type: 'number', defaultValue: 900 },
        { name: 'steuersatz', label: 'Einkommensteuer (%)', type: 'number', defaultValue: 9 },
        {
          name: 'fussnote',
          label: 'Fußnote',
          type: 'textarea',
          defaultValue:
            'Beispielrechnung auf Basis marktüblicher Wochenpreise, Stand 2026. Keine Zusicherung einer Rendite. Steuerliche Behandlung individuell.',
        },
      ],
    },
    {
      name: 'zahlungsplan',
      label: 'Zahlungsplan (Texte)',
      type: 'group',
      fields: [
        { name: 'eyebrow', label: 'Kleine Überschrift', type: 'text', defaultValue: 'Zahlungsplan' },
        { name: 'headline', label: 'Überschrift', type: 'text', defaultValue: 'So läuft der Kauf' },
        {
          name: 'nebenkosten',
          label: 'Hinweis Nebenkosten',
          type: 'textarea',
          defaultValue:
            'Nebenkosten für Notar, Anwalt, Übersetzung und Grundbuch: ca. 1,5–2,5 %. MwSt. im Kaufpreis enthalten. Keine Maklerprovision. Keine Grunderwerbsteuer — beim Kauf vom Bauträger entfällt sie.',
        },
      ],
    },
    {
      name: 'paymentSteps',
      label: 'Zahlungsplan — Stufen',
      type: 'array',
      defaultValue: [
        {
          step: '01',
          label: 'Notarieller Kaufvertrag',
          amount: '40 %',
          note: 'Die Baugenehmigung liegt vor. Sie schließen direkt den notariellen Hauptvertrag, keinen Vorvertrag.',
        },
        { step: '02', label: 'Rohbau fertiggestellt', amount: '40 %' },
        { step: '03', label: 'Fertigstellung und Schlüsselübergabe', amount: '20 %' },
      ],
      fields: [
        { name: 'step', label: 'Schritt (z.B. 01)', type: 'text', required: true },
        { name: 'label', label: 'Bezeichnung', type: 'text', required: true },
        { name: 'amount', label: 'Betrag (z.B. 40 %)', type: 'text', required: true },
        { name: 'note', label: 'Hinweis', type: 'text' },
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
          defaultValue: 'Investment-Exposé anfordern',
        },
        {
          name: 'headline',
          label: 'Überschrift (erste Zeile)',
          type: 'text',
          defaultValue: 'Zahlen, Marktdaten und Verfügbarkeit,',
        },
        {
          name: 'headlineAccent',
          label: 'Überschrift (zweite Zeile, goldene Farbe)',
          type: 'text',
          defaultValue: 'direkt vom Bauträger.',
        },
        {
          name: 'description',
          label: 'Beschreibung',
          type: 'textarea',
          defaultValue:
            'Das Investment-Exposé enthält Grundrisse, die vollständige Preisliste sowie Angaben zu Steuern und Abgaben — kostenlos, auf Deutsch, Englisch, Montenegrinisch oder Türkisch.',
        },
        {
          name: 'buttonLabel',
          label: 'Button-Text',
          type: 'text',
          defaultValue: 'Investment-Exposé anfordern',
        },
        {
          name: 'tags',
          label: 'Vertrauens-Punkte (unter den Buttons)',
          type: 'array',
          maxRows: 6,
          defaultValue: [
            { label: 'In der Regel Antwort innerhalb von 24 Stunden' },
            { label: 'Beratung in vier Sprachen' },
            { label: 'Kein Makler' },
            { label: 'Direkt vom Bauträger' },
          ],
          fields: [{ name: 'label', label: 'Text', type: 'text', required: true }],
        },
      ],
    },
  ]),
  hooks: {
    afterChange: [revalidatePages(['/investment'])],
  },
}
