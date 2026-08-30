import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

async function uploadImage(payload: any, filename: string, altText: string) {
  const publicDir = path.join(process.cwd(), 'public')
  const filePath = path.join(publicDir, filename)

  if (!fs.existsSync(filePath)) return null

  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
  })
  if (existing.docs.length > 0) return existing.docs[0].id

  const data = fs.readFileSync(filePath)
  const result = await payload.create({
    collection: 'media',
    data: { alt: altText },
    file: { data, mimetype: 'image/webp', name: filename, size: data.length },
  })
  return result.id
}

export async function POST(req: Request) {
  const secret = req.headers.get('x-seed-secret')
  if (secret !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payload = await getPayload({ config })

  // Upload all needed images
  const [
    studioFloorplan, studioImage,
    zweiFloorplan, zweiImage,
    penthouseFloorplan, penthouseImage,
    hafen, autobahn, tourismus,
  ] = await Promise.all([
    uploadImage(payload, 'grundriss-studio.webp', 'Grundriss Studio'),
    uploadImage(payload, 'interieur-01.webp', 'Studio Interieur'),
    uploadImage(payload, 'grundriss-apartment.webp', 'Grundriss Zweizimmerwohnung'),
    uploadImage(payload, 'interieur-wohnen-01.webp', 'Zweizimmerwohnung Wohnbereich'),
    uploadImage(payload, 'grundriss-penthouse.webp', 'Grundriss Penthouse'),
    uploadImage(payload, 'terrasse-berge.webp', 'Penthouse Terrasse mit Bergblick'),
    uploadImage(payload, 'building-front.webp', 'Baliv Residence Gebäude — Hafen & Lage'),
    uploadImage(payload, 'architektur-detail.webp', 'Architekturdetail — Qualität & Bauweise'),
    uploadImage(payload, 'interieur-wohnen-02.webp', 'Wohnbereich — Tourismus & Vermietung'),
  ])

  // ── Wohnungen-Seite ────────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'wohnungen-page',
    data: {
      types: [
        {
          nr: '01', type: 'Studio', tag: 'Erdgeschoss', size: '28–30 m²',
          terrace: 'Terrasse & Gartenzugang', units: '2 Einheiten', price: 'ab 2.500 €/m²',
          layout: '1 Wohn-/Schlafraum · Küchenzeile · Bad',
          description: 'Direkter Zugang zum begrünten Innenhof. Kompakter Einstieg als Pied-à-terre, Ferienobjekt oder renditestarkes Investment.',
          exampleSize: 29, examplePrice: 72500,
          ...(studioFloorplan && { floorplan: studioFloorplan }),
          ...(studioImage && { image: studioImage }),
        },
        {
          nr: '02', type: 'Zweizimmerwohnung', tag: 'Alle Etagen', size: '47–52 m²',
          terrace: 'Balkon oder Terrasse', units: '35 Einheiten', price: 'ab 2.500 €/m²',
          layout: '1 Schlafzimmer · Wohn-/Essbereich · Küche · Bad',
          description: 'Der meistgewählte Typ. Mit steigender Etage wachsen die Ausblicke — von Olivenhainen im Erdgeschoss bis hin zu Meerespanoramen in den Obergeschossen.',
          exampleSize: 50, examplePrice: 125000,
          ...(zweiFloorplan && { floorplan: zweiFloorplan }),
          ...(zweiImage && { image: zweiImage }),
        },
        {
          nr: '03', type: 'Dachgeschoss Panorama', tag: 'Dachgeschoss', size: '73–81 m²',
          terrace: 'Dachterrasse 30–50 m²', units: '2 Einheiten', price: 'ab 3.000 €/m²',
          layout: '2 Schlafzimmer · Wohn-/Essbereich · Küche · Bad & Gäste-WC',
          description: 'Unverbauter 360°-Rundblick auf Adria, Rumija und Stari Bar. Großzügige Dachterrasse — das Highlight des gesamten Ensembles.',
          exampleSize: 77, examplePrice: 192500,
          ...(penthouseFloorplan && { floorplan: penthouseFloorplan }),
          ...(penthouseImage && { image: penthouseImage }),
        },
      ],
    } as any,
  })

  // ── Preise-Seite (Grundrisse) ──────────────────────────────────────
  await payload.updateGlobal({
    slug: 'preise-page',
    data: {
      types: [
        {
          nr: '01', type: 'Studio', tag: 'Erdgeschoss', size: '28–30 m²',
          pricePerSqm: 'ab 2.500 €/m²', units: '2 Einheiten', highlight: false,
          exampleSize: 29, examplePrice: 72500,
          features: [
            { label: 'Wohn-/Schlafbereich kombiniert' }, { label: 'Küchenzeile' },
            { label: 'Badezimmer' }, { label: 'Terrasse & Gartenzugang' },
          ],
          ...(studioFloorplan && { floorplan: studioFloorplan }),
        },
        {
          nr: '02', type: 'Zweizimmerwohnung', tag: 'Alle Etagen', size: '47–52 m²',
          pricePerSqm: 'ab 2.500 €/m²', units: '35 Einheiten', highlight: true,
          exampleSize: 50, examplePrice: 125000,
          features: [
            { label: '1 Schlafzimmer' }, { label: 'Wohn-/Essbereich' },
            { label: 'Küche' }, { label: 'Badezimmer' }, { label: 'Balkon oder Terrasse' },
          ],
          ...(zweiFloorplan && { floorplan: zweiFloorplan }),
        },
        {
          nr: '03', type: 'Penthouse', tag: 'Dachgeschoss', size: '73–81 m²',
          pricePerSqm: 'ab 3.000 €/m²', units: '2 Einheiten', highlight: false,
          exampleSize: 77, examplePrice: 192500,
          features: [
            { label: '2 Schlafzimmer' }, { label: 'Wohn-/Essbereich' },
            { label: 'Küche' }, { label: 'Badezimmer + Gäste-WC' },
            { label: 'Dachterrasse 30–50 m²' }, { label: '360° Panoramablick' },
          ],
          ...(penthouseFloorplan && { floorplan: penthouseFloorplan }),
        },
      ],
    } as any,
  })

  // ── Lage-Seite (Highlight-Bilder) ─────────────────────────────────
  await payload.updateGlobal({
    slug: 'lage-page',
    data: {
      highlights: [
        {
          title: 'Hafen & Fährverbindung',
          text: 'Bar ist der einzige montenegrinische Hafen mit regelmäßiger Fährverbindung nach Bari, Italien. Die Überfahrt dauert 9 Stunden — ein wichtiger Korridor für Touristen und Handel.',
          ...(hafen && { image: hafen }),
        },
        {
          title: 'Autobahn & Schiene',
          text: 'Die Autobahn Bar–Boljare verbindet die Stadt mit dem Balkan-Kernland. Die historische Eisenbahnlinie Bar–Belgrad durchquert spektakuläre Gebirgslandschaften.',
          ...(autobahn && { image: autobahn }),
        },
        {
          title: 'Wachsender Tourismus',
          text: 'Montenegro verzeichnet jährlich zweistellige Tourismuswachstumsraten. Bar profitiert als Einstiegshafen und authentische Alternative zu überlaufenen Küstenorten.',
          ...(tourismus && { image: tourismus }),
        },
      ],
    } as any,
  })

  return NextResponse.json({
    success: true,
    message: 'Alle Bilder hochgeladen und Seiten aktualisiert.',
    ids: { studioFloorplan, studioImage, zweiFloorplan, zweiImage, penthouseFloorplan, penthouseImage, hafen, autobahn, tourismus },
  })
}
