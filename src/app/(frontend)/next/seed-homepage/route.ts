import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// One-time endpoint to upload static images into Payload Media and wire them
// into the Homepage global so the admin shows the correct slider/gallery images.
// Call once: GET /next/seed-homepage?secret=<PAYLOAD_SECRET>
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const secret = searchParams.get('secret')

  if (secret !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payload = await getPayload({ config })

  const publicDir = path.resolve(process.cwd(), 'public')

  async function uploadImage(filename: string, altText: string) {
    const filePath = path.join(publicDir, filename)
    if (!fs.existsSync(filePath)) {
      payload.logger.warn(`File not found: ${filename}`)
      return null
    }
    const data = fs.readFileSync(filePath)
    const ext = filename.split('.').pop() ?? 'webp'
    const mimeType = ext === 'jpg' ? 'image/jpeg' : `image/${ext}`

    const doc = await payload.create({
      collection: 'media',
      data: { alt: altText },
      file: {
        name: filename,
        data: Buffer.from(data),
        mimetype: mimeType,
        size: data.byteLength,
      },
    })
    return doc
  }

  // ── Upload slider images ─────────────────────────────────────────────
  const [slide1, slide2, slide3] = await Promise.all([
    uploadImage('terrasse-meer.webp', 'Terrasse mit Meerblick'),
    uploadImage('interieur-wohnen-01.webp', 'Wohnbereich mit Meerblick'),
    uploadImage('interieur-wohnen-02.webp', 'Modernes Wohninterieur'),
  ])

  // ── Upload lage gallery images ───────────────────────────────────────
  const [lage1, lage2, lage3] = await Promise.all([
    uploadImage('stari-bar-altstadt.webp', 'Stari Bar Altstadt'),
    uploadImage('view-olivenhain.webp', 'Blick über den Olivenhain'),
    uploadImage('view-hafen.webp', 'Hafen von Bar'),
  ])

  // ── Upload apartment type images ──────────────────────────────────────
  const [apt1, apt2, apt3] = await Promise.all([
    uploadImage('grundriss-studio.webp', 'Studio Grundriss'),
    uploadImage('grundriss-apartment.webp', 'Zweizimmer Grundriss'),
    uploadImage('grundriss-penthouse.webp', 'Penthouse Grundriss'),
  ])

  // ── Update Homepage global ───────────────────────────────────────────
  const slides = [slide1, slide2, slide3].filter(Boolean).map((doc) => ({
    image: doc!.id,
    alt: doc!.alt ?? '',
  }))

  const gallery = [lage1, lage2, lage3].filter(Boolean).map((doc) => ({
    image: doc!.id,
    alt: doc!.alt ?? '',
  }))

  await payload.updateGlobal({
    slug: 'homepage',
    data: {
      hero: {
        headline: 'Modern wohnen. Ursprünglich leben.',
        subline: 'BAR · MONTENEGRO',
        description:
          'Am Fuße von Stari Bar entsteht ein Wohnensemble mit 39 Einheiten, zwischen Olivenhainen, Bergen und Meer.',
        slides,
        stats: [
          { value: '39', label: 'Wohneinheiten' },
          { value: '2.400 €/m²', label: 'Ab Preis' },
          { value: 'Dez. 2028', label: 'Fertigstellung' },
        ],
      },
      lage: {
        headline: 'Zwischen Festung, Meer und Olivenhain.',
        text1:
          'Stari Bar zu Füßen, Rumija im Rücken, die Adria in Sichtweite. Ein Ort, an dem sich Orient und Okzident seit Jahrhunderten begegnen — und an dem Baliv Residence entsteht.',
        text2:
          'Eingebettet in über 100.000 Olivenbäume, nur 1,4 Kilometer unterhalb der historischen Festungsstadt. Sieben Minuten zur Bucht, zehn zum Hafen.',
        gallery,
        distances: [
          { value: '1,4 km', label: 'Stari Bar Festung' },
          { value: '10 Min', label: 'Erster Strand' },
          { value: '10 Min', label: 'Hafen von Bar' },
          { value: '45 Min', label: 'Flughafen Podgorica' },
        ],
      },
      wohnungen: {
        headline: 'Drei Typen. Ihre Wahl.',
        types: [
          {
            type: 'Studio',
            tag: 'Erdgeschoss',
            size: '28–30 m²',
            description:
              'Kompakter Einstieg mit Terrasse und direktem Gartenzugang. Ideal als Pied-à-terre oder Renditeobjekt.',
            price: 'ab 2.400 €/m²',
            image: apt1?.id ?? undefined,
          },
          {
            type: 'Zweizimmer',
            tag: 'Alle Etagen',
            size: '47–52 m²',
            description:
              'Die Wahl der meisten Käufer — mit Balkon oder Terrasse, verfügbar auf allen Stockwerken.',
            price: 'ab 2.400 €/m²',
            image: apt2?.id ?? undefined,
          },
          {
            type: 'Penthouse',
            tag: 'Dachgeschoss',
            size: '73–81 m²',
            description:
              'Dachterrasse 30–50 m², unverbauter Rundblick auf Meer, Berge und Stari Bar.',
            price: 'ab 3.000 €/m²',
            image: apt3?.id ?? undefined,
          },
        ],
      },
      investment: {
        headline: 'Warum Bar. Warum jetzt.',
        text: 'Montenegro ist der am schnellsten wachsende Immobilienmarkt Europas. Während vergleichbare Neubauten in Budva oder Kotor 2.700–5.000 €/m² kosten, starten Sie bei Baliv Residence ab 2.400 €/m² — schlüsselfertig, hochwertig ausgestattet.',
        stats: [
          { value: '6–8%', label: 'Bruttorendite' },
          { value: '+130%', label: 'Preis 2020–2025' },
          { value: '2028', label: 'EU-Beitritt' },
        ],
        badge: '+20% Preissteigerung 2025',
      },
      cta: {
        headline: 'Bereit für das erste Gespräch?',
        description:
          'Vollständiges Exposé mit Grundrissen, Preisliste und Verfügbarkeit — direkt vom Bauträger, deutschsprachig, ohne Makler.',
        note: 'Antwort in < 24 Stunden · Deutschsprachige Beratung · Direkt vom Bauträger',
      },
      kontakt: {
        email: 'info@baliv-residence.com',
        whatsapp: '+38268517873',
      },
    } as any,
  })

  return NextResponse.json({
    ok: true,
    slides: slides.length,
    gallery: gallery.length,
    message: 'Homepage global seeded successfully',
  })
}
