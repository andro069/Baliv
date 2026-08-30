import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const secret = req.headers.get('x-seed-secret')
  if (secret !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payload = await getPayload({ config })

  await payload.updateGlobal({
    slug: 'wohnungen-page',
    data: {
      hero: {
        headline: 'Drei Typen. Ihre Wahl.',
        description:
          '39 Einheiten in sieben Geschossen — vom kompakten Studio bis zur großzügigen Dachgeschosswohnung mit Panoramablick.',
      },
      types: [
        {
          nr: '01',
          type: 'Studio',
          tag: 'Erdgeschoss',
          size: '28–30 m²',
          terrace: 'Terrasse & Gartenzugang',
          units: '2 Einheiten',
          price: 'ab 2.500 €/m²',
          layout: '1 Wohn-/Schlafraum · Küchenzeile · Bad',
          description:
            'Direkter Zugang zum begrünten Innenhof. Kompakter Einstieg als Pied-à-terre, Ferienobjekt oder renditestarkes Investment.',
          exampleSize: 29,
          examplePrice: 72500,
        },
        {
          nr: '02',
          type: 'Zweizimmerwohnung',
          tag: 'Alle Etagen',
          size: '47–52 m²',
          terrace: 'Balkon oder Terrasse',
          units: '35 Einheiten',
          price: 'ab 2.500 €/m²',
          layout: '1 Schlafzimmer · Wohn-/Essbereich · Küche · Bad',
          description:
            'Der meistgewählte Typ. Mit steigender Etage wachsen die Ausblicke — von Olivenhainen im Erdgeschoss bis hin zu Meerespanoramen in den Obergeschossen.',
          exampleSize: 50,
          examplePrice: 125000,
        },
        {
          nr: '03',
          type: 'Dachgeschoss Panorama',
          tag: 'Dachgeschoss',
          size: '73–81 m²',
          terrace: 'Dachterrasse 30–50 m²',
          units: '2 Einheiten',
          price: 'ab 3.000 €/m²',
          layout: '2 Schlafzimmer · Wohn-/Essbereich · Küche · Bad & Gäste-WC',
          description:
            'Unverbauter 360°-Rundblick auf Adria, Rumija und Stari Bar. Großzügige Dachterrasse — das Highlight des gesamten Ensembles.',
          exampleSize: 77,
          examplePrice: 192500,
        },
      ],
      ausstattung: [
        { brand: 'Hansgrohe', label: 'Sanitärarmaturen' },
        { brand: 'LG', label: 'Klimaanlage' },
        { brand: 'Eurocode 8', label: 'Erdbebenstandard' },
        { brand: 'Naturstein', label: 'Böden & Fassade' },
        { brand: 'Geölte Eiche', label: 'Holzoberflächen' },
        { brand: 'Schlüsselfertig', label: 'Übergabe komplett' },
      ],
      included: [
        { label: 'Hansgrohe Sanitärarmaturen' },
        { label: 'LG Klimaanlage (Split)' },
        { label: 'Naturstein-Böden' },
        { label: 'Geölte Eichenoberflächen' },
        { label: 'Eurocode 8 Erdbebenstandard' },
        { label: 'Schlüsselfertige Übergabe' },
        { label: 'MwSt. inklusive' },
      ],
    } as any,
  })

  await payload.updateGlobal({
    slug: 'preise-page',
    data: {
      hero: {
        headline: 'Transparent.\nDirekt vom Bauträger.',
        description:
          'Keine Maklergebühren, keine versteckten Kosten. MwSt. ist im Kaufpreis enthalten. Frühbucherpreise gelten bis zur Baugenehmigung im Oktober 2026.',
      },
      types: [
        {
          nr: '01',
          type: 'Studio',
          tag: 'Erdgeschoss',
          size: '28–30 m²',
          pricePerSqm: 'ab 2.500 €/m²',
          units: '2 Einheiten',
          highlight: false,
          exampleSize: 29,
          examplePrice: 72500,
          features: [
            { label: 'Wohn-/Schlafbereich kombiniert' },
            { label: 'Küchenzeile' },
            { label: 'Badezimmer' },
            { label: 'Terrasse & Gartenzugang' },
          ],
        },
        {
          nr: '02',
          type: 'Zweizimmerwohnung',
          tag: 'Alle Etagen',
          size: '47–52 m²',
          pricePerSqm: 'ab 2.500 €/m²',
          units: '35 Einheiten',
          highlight: true,
          exampleSize: 50,
          examplePrice: 125000,
          features: [
            { label: '1 Schlafzimmer' },
            { label: 'Wohn-/Essbereich' },
            { label: 'Küche' },
            { label: 'Badezimmer' },
            { label: 'Balkon oder Terrasse' },
          ],
        },
        {
          nr: '03',
          type: 'Penthouse',
          tag: 'Dachgeschoss',
          size: '73–81 m²',
          pricePerSqm: 'ab 3.000 €/m²',
          units: '2 Einheiten',
          highlight: false,
          exampleSize: 77,
          examplePrice: 192500,
          features: [
            { label: '2 Schlafzimmer' },
            { label: 'Wohn-/Essbereich' },
            { label: 'Küche' },
            { label: 'Badezimmer + Gäste-WC' },
            { label: 'Dachterrasse 30–50 m²' },
            { label: '360° Panoramablick' },
          ],
        },
      ],
      paymentSteps: [
        { step: '01', date: 'Okt. 2026', label: 'Baugenehmigung', amount: '40 %', note: 'Nach Erhalt der offiziellen Baugenehmigung' },
        { step: '02', date: 'Q2 2027', label: 'Rohbau', amount: '30 %', note: 'Bei Abschluss des Rohbaus' },
        { step: '03', date: 'Q4 2027', label: 'Dachschluss', amount: '20 %', note: 'Bei Dachschluss und Ausbaubeginn' },
        { step: '04', date: 'Q1 2028', label: 'Schlüsselübergabe', amount: '10 %', note: 'Bei vollständiger Fertigstellung' },
      ],
      included: [
        { label: 'Hansgrohe Sanitärarmaturen', included: true },
        { label: 'LG Klimaanlage', included: true },
        { label: 'Naturstein-Böden', included: true },
        { label: 'Geölte Eichenoberflächen', included: true },
        { label: 'Eurocode 8 Erdbebenstandard', included: true },
        { label: 'Schlüsselfertige Übergabe', included: true },
        { label: 'MwSt. inklusive', included: true },
        { label: 'Einbauküche', included: false },
        { label: 'Tiefgaragenplatz', included: false },
      ],
    } as any,
  })

  await payload.updateGlobal({
    slug: 'investment-page',
    data: {
      hero: {
        headline: 'Bar wächst. Ihr Investment auch.',
        description:
          'Montenegro auf dem Weg zur EU-Mitgliedschaft, wachsender Tourismus und ein Immobilienmarkt in früher Entwicklungsphase — die Voraussetzungen für nachhaltiges Wertsteigerungspotenzial.',
      },
      steuerDaten: [
        { label: 'Grunderwerbsteuer', value: '3 %', note: 'Einmalig beim Kauf' },
        { label: 'Jahresgrundsteuer', value: '0,1–1 %', note: 'Je nach Lage und Größe' },
        { label: 'Einkommensteuer (Miete)', value: '9 %', note: 'Pauschal auf Mieteinnahmen' },
        { label: 'Körperschaftsteuer', value: '9 %', note: 'Niedrigste in Europa' },
        { label: 'Kapitalertragsteuer', value: '9 %', note: 'Auf Veräußerungsgewinn' },
        { label: 'Mehrwertsteuer', value: 'Inklusive', note: 'Im Kaufpreis enthalten' },
      ],
      mietRendite: {
        headline: 'Mietrendite — konservativ gerechnet',
        purchase: 125000,
        size: 50,
        pricePerSqm: 2500,
        weeklyRate: 700,
        occupancyWeeks: 25,
        annualRent: 17500,
        yield: 8.8,
        appreciationLow: 15,
        appreciationHigh: 30,
      },
      paymentSteps: [
        { step: '01', date: 'Okt. 2026', label: 'Baugenehmigung', amount: '40 %', note: 'Nach Erhalt der offiziellen Baugenehmigung' },
        { step: '02', date: 'Q2 2027', label: 'Rohbau', amount: '30 %', note: 'Bei Abschluss des Rohbaus' },
        { step: '03', date: 'Q4 2027', label: 'Dachschluss', amount: '20 %', note: 'Bei Dachschluss und Ausbaubeginn' },
        { step: '04', date: 'Q1 2028', label: 'Schlüsselübergabe', amount: '10 %', note: 'Bei vollständiger Fertigstellung' },
      ],
    } as any,
  })

  await payload.updateGlobal({
    slug: 'lage-page',
    data: {
      hero: {
        headline: 'Bar. Montenegros aufgehender Stern.',
        subline: 'Adria · Rumija · Altstadt',
        description:
          'Bar liegt an der Adria-Küste Montenegros, eingebettet zwischen dem Rumija-Gebirge und dem Mittelmeer. Die Stadt wächst zur regionalen Drehscheibe — mit Hafen, Autobahn und Schiene.',
      },
      distances: [
        { place: 'Strand Sutomore', distance: '4 km', detail: '5 min', note: 'Nächster Strand' },
        { place: 'Strand Bar City', distance: '2 km', detail: '3 min', note: 'Stadtnaher Stadtstrand' },
        { place: 'Altstadt Stari Bar', distance: '5 km', detail: '7 min', note: 'UNESCO-Kandidat' },
        { place: 'Hafen Bar', distance: '3 km', detail: '5 min', note: 'Fähre nach Bari/Italien' },
        { place: 'Flughafen Podgorica', distance: '45 km', detail: '35 min', note: 'Internationaler Flughafen' },
        { place: 'Flughafen Tivat', distance: '80 km', detail: '60 min', note: 'Saisonflüge' },
        { place: 'Kotor Altstadt', distance: '90 km', detail: '70 min', note: 'UNESCO Welterbe' },
        { place: 'Shkodër (Albanien)', distance: '60 km', detail: '50 min', note: 'Grenznahe Stadt' },
      ],
      highlights: [
        {
          title: 'Hafen & Fährverbindung',
          text: 'Bar ist der einzige montenegrinische Hafen mit regelmäßiger Fährverbindung nach Bari, Italien. Die Überfahrt dauert 9 Stunden — ein wichtiger Korridor für Touristen und Handel.',
        },
        {
          title: 'Autobahn & Schiene',
          text: 'Die Autobahn Bar–Boljare verbindet die Stadt mit dem Balkan-Kernland. Die historische Eisenbahnlinie Bar–Belgrad durchquert spektakuläre Gebirgslandschaften.',
        },
        {
          title: 'Wachsender Tourismus',
          text: 'Montenegro verzeichnet jährlich zweistellige Tourismuswachstumsraten. Bar profitiert als Einstiegshafen und authentische Alternative zu überlaufenen Küstenorten.',
        },
      ],
      markt: {
        headline: 'Marktentwicklung',
        description:
          'Montenegro befindet sich auf dem Weg zur EU-Mitgliedschaft. Immobilienpreise steigen jährlich um 8–15 % in touristisch attraktiven Lagen. Bar bietet noch Einstiegspreise weit unter Budva oder Kotor.',
      },
    } as any,
  })

  await payload.updateGlobal({
    slug: 'kontakt-page',
    data: {
      hero: {
        headline: 'Sprechen wir miteinander.',
        description:
          'Wir antworten innerhalb von 24 Stunden — auf Deutsch, persönlich, ohne Verkaufsdruck.',
      },
      info: {
        email: 'info@baliv-residence.com',
        telefon: '+382 68 517 873',
        whatsapp: '+38268517873',
        adresse: 'Real Living d.o.o.\nBjeliši BB\n85000 Bar\nMontenegro',
        officeHours: 'Mo–Fr 9–18 Uhr (CEST)',
      },
    } as any,
  })

  return NextResponse.json({ success: true, message: 'Alle Globals erfolgreich befüllt.' })
}
