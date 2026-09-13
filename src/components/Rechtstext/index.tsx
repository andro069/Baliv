import React from 'react'

/**
 * Darstellung von Impressum und Datenschutzerklärung aus den Globals
 * `impressum-page` / `datenschutz-page`.
 *
 * Regeln für das Textfeld eines Abschnitts:
 *   - eine Leerzeile trennt Absätze
 *   - ein einfacher Zeilenumbruch bleibt als Zeilenumbruch erhalten (z. B. Anschrift)
 *   - Zeilen, die mit „- " beginnen, werden zu einer Aufzählung
 *   - **Text** zwischen doppelten Sternchen wird fett
 *   - E-Mail-Adressen, Telefonnummern mit „+" und Adressen mit http(s):// werden verlinkt
 */

export type RechtstextAbschnitt = { titel?: string | null; text?: string | null }

const h2Class = 'text-[#151E39] text-lg font-semibold mb-3'
const serif = { fontFamily: 'var(--font-playfair), serif' }
const listClass = 'list-disc list-inside mt-2 space-y-1 text-[#151E39]/70'
const linkClass = 'text-[#B69252] hover:underline'

// E-Mail | Telefonnummer im internationalen Format | Web-Adresse
const LINK = /([\w.+-]+@[\w-]+(?:\.[\w-]+)+)|(\+\d[\d \-/()]{5,}\d)|(https?:\/\/[^\s<]*[^\s<.,;:!?)])/g

function verlinke(text: string, schluessel: string): React.ReactNode[] {
  const teile: React.ReactNode[] = []
  let letzte = 0
  for (const treffer of text.matchAll(LINK)) {
    const [ganz, email, telefon, url] = treffer
    const start = treffer.index ?? 0
    if (start > letzte) teile.push(text.slice(letzte, start))
    const key = `${schluessel}-${start}`
    if (email) {
      teile.push(
        <a key={key} href={`mailto:${email}`} className={linkClass}>
          {email}
        </a>,
      )
    } else if (telefon) {
      teile.push(
        <a key={key} href={`tel:${telefon.replace(/[^\d+]/g, '')}`} className={linkClass}>
          {telefon}
        </a>,
      )
    } else if (url) {
      teile.push(
        <a key={key} href={url} className={linkClass} target="_blank" rel="noopener noreferrer">
          {url}
        </a>,
      )
    }
    letzte = start + ganz.length
  }
  if (letzte < text.length) teile.push(text.slice(letzte))
  return teile
}

/** Fettdruck (**…**) und automatische Links innerhalb einer Zeile. */
function zeile(text: string, schluessel: string): React.ReactNode[] {
  return text.split(/\*\*(.+?)\*\*/g).flatMap((teil, i): React.ReactNode[] =>
    i % 2 === 1
      ? [
          <strong key={`${schluessel}-b${i}`} className="font-semibold">
            {verlinke(teil, `${schluessel}-b${i}`)}
          </strong>,
        ]
      : verlinke(teil, `${schluessel}-t${i}`),
  )
}

type Block = { art: 'p'; zeilen: string[] } | { art: 'ul'; zeilen: string[] }

function bloecke(text: string): Block[] {
  const ergebnis: Block[] = []
  for (const absatz of text.replace(/\r\n/g, '\n').split(/\n\s*\n/)) {
    let aktuell: Block | null = null
    for (const roh of absatz.split('\n')) {
      const inhalt = roh.trim()
      if (!inhalt) continue
      const istPunkt = /^-\s+/.test(inhalt)
      const art = istPunkt ? 'ul' : 'p'
      if (!aktuell || aktuell.art !== art) {
        const neu: Block = { art, zeilen: [] }
        ergebnis.push(neu)
        aktuell = neu
      }
      aktuell.zeilen.push(istPunkt ? inhalt.replace(/^-\s+/, '') : inhalt)
    }
  }
  return ergebnis
}

function Abschnittstext({ text, schluessel }: { text: string; schluessel: string }) {
  return (
    <>
      {bloecke(text).map((block, b) => {
        const key = `${schluessel}-${b}`
        if (block.art === 'ul') {
          return (
            <ul key={key} className={listClass}>
              {block.zeilen.map((z, i) => (
                <li key={i}>{zeile(z, `${key}-${i}`)}</li>
              ))}
            </ul>
          )
        }
        return (
          <p key={key} className={b > 0 ? 'mt-3' : undefined}>
            {block.zeilen.map((z, i) => (
              <React.Fragment key={i}>
                {i > 0 && <br />}
                {zeile(z, `${key}-${i}`)}
              </React.Fragment>
            ))}
          </p>
        )
      })}
    </>
  )
}

export function Rechtstext({
  eyebrow,
  headline,
  stand,
  abschnitte,
  inhaltClassName,
}: {
  eyebrow: string
  headline: string
  stand?: string | null
  abschnitte: RechtstextAbschnitt[]
  /** Klassen des Inhaltsblocks — Impressum und Datenschutz unterscheiden sich hier. */
  inhaltClassName: string
}) {
  return (
    <section className="pt-40 pb-24 px-8 md:px-16 lg:px-24">
      <div className="max-w-3xl mx-auto">
        <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">{eyebrow}</p>
        <h1 className={`text-[#151E39] text-4xl md:text-5xl ${stand ? 'mb-4' : 'mb-12'}`} style={serif}>
          {headline}
        </h1>
        {stand && <p className="text-[#151E39]/40 text-sm mb-12">{stand}</p>}

        <div className={inhaltClassName}>
          {abschnitte.map((abschnitt, i) => (
            <div key={i}>
              {abschnitt.titel?.trim() && (
                <h2 className={h2Class} style={serif}>
                  {abschnitt.titel}
                </h2>
              )}
              {abschnitt.text?.trim() && <Abschnittstext text={abschnitt.text} schluessel={`a${i}`} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
