import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

async function uploadImage(payload: any, filename: string, altText: string) {
  const publicDir = path.join(process.cwd(), 'public')
  const filePath = path.join(publicDir, filename)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const data = fs.readFileSync(filePath)
  const file = {
    data,
    mimetype: 'image/webp',
    name: filename,
    size: data.length,
  }

  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    return existing.docs[0].id
  }

  const result = await payload.create({
    collection: 'media',
    data: { alt: altText },
    file,
  })

  return result.id
}

export async function POST(req: Request) {
  const secret = req.headers.get('x-seed-secret')
  if (secret !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payload = await getPayload({ config })

  const [
    studioFloorplan,
    studioImage,
    zweiFloorplan,
    zweiImage,
    penthouseFloorplan,
    penthouseImage,
  ] = await Promise.all([
    uploadImage(payload, 'grundriss-studio.webp', 'Grundriss Studio'),
    uploadImage(payload, 'interieur-01.webp', 'Studio Interieur'),
    uploadImage(payload, 'grundriss-apartment.webp', 'Grundriss Zweizimmerwohnung'),
    uploadImage(payload, 'interieur-wohnen-01.webp', 'Zweizimmerwohnung Wohnbereich'),
    uploadImage(payload, 'grundriss-penthouse.webp', 'Grundriss Penthouse'),
    uploadImage(payload, 'terrasse-berge.webp', 'Penthouse Terrasse mit Bergblick'),
  ])

  await payload.updateGlobal({
    slug: 'wohnungen-page',
    data: {
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
          ...(studioFloorplan && { floorplan: studioFloorplan }),
          ...(studioImage && { image: studioImage }),
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
          ...(zweiFloorplan && { floorplan: zweiFloorplan }),
          ...(zweiImage && { image: zweiImage }),
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
          ...(penthouseFloorplan && { floorplan: penthouseFloorplan }),
          ...(penthouseImage && { image: penthouseImage }),
        },
      ],
    } as any,
  })

  return NextResponse.json({
    success: true,
    uploaded: { studioFloorplan, studioImage, zweiFloorplan, zweiImage, penthouseFloorplan, penthouseImage },
  })
}
