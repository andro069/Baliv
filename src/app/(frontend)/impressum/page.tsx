import React from 'react'
import type { Metadata } from 'next'
import { Navigation } from '@/components/Navigation'
import { PageFooter } from '@/components/PageFooter'

export const metadata: Metadata = {
  title: 'Impressum — Baliv Residence',
  description: 'Impressum und Anbieterkennzeichnung von Baliv Residence, Real Living d.o.o., Bar, Montenegro.',
}

export default function ImpressumPage() {
  return (
    <main className="bg-[#F0EDE8]" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>
      <Navigation />

      <section className="pt-40 pb-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">Rechtliches</p>
          <h1
            className="text-[#151E39] text-4xl md:text-5xl mb-12"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            Impressum
          </h1>

          <div className="prose prose-sm max-w-none space-y-10 text-[#151E39]/80 leading-relaxed">

            <div>
              <h2 className="text-[#151E39] text-lg font-semibold mb-3" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                Angaben gemäß § 5 TMG
              </h2>
              <p className="bg-[#B69252]/10 border border-[#B69252]/20 rounded px-4 py-3 text-xs text-[#B69252] mb-4">
                ⚠ Platzhalter — bitte durch echte Unternehmensdaten ersetzen
              </p>
              <p>
                Real Living d.o.o.<br />
                [Straße und Hausnummer]<br />
                85000 Bar<br />
                Montenegro
              </p>
            </div>

            <div>
              <h2 className="text-[#151E39] text-lg font-semibold mb-3" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                Vertreten durch
              </h2>
              <p>[Name des Geschäftsführers]</p>
            </div>

            <div>
              <h2 className="text-[#151E39] text-lg font-semibold mb-3" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                Kontakt
              </h2>
              <p>
                E-Mail: info@baliv-residence.com<br />
                Telefon: +382 68 517 873
              </p>
            </div>

            <div>
              <h2 className="text-[#151E39] text-lg font-semibold mb-3" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                Handelsregistereintrag
              </h2>
              <p>
                Eintragung im Handelsregister Montenegro<br />
                Registergericht: [Handelsgericht Bar]<br />
                Registernummer: [HRB XXXXXX]
              </p>
            </div>

            <div>
              <h2 className="text-[#151E39] text-lg font-semibold mb-3" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                Umsatzsteuer-Identifikationsnummer
              </h2>
              <p>
                USt-IdNr.: [XX XXXXXXXXX]<br />
                gemäß § 27a Umsatzsteuergesetz
              </p>
            </div>

            <div>
              <h2 className="text-[#151E39] text-lg font-semibold mb-3" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                Verantwortlich für den Inhalt
              </h2>
              <p>
                [Name des Verantwortlichen]<br />
                Real Living d.o.o.<br />
                [Adresse wie oben]
              </p>
            </div>

            <div>
              <h2 className="text-[#151E39] text-lg font-semibold mb-3" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                Streitschlichtung
              </h2>
              <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
                {' '}<a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-[#B69252] hover:underline">
                  https://ec.europa.eu/consumers/odr
                </a>.
                Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
              <p className="mt-3">
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>

            <div>
              <h2 className="text-[#151E39] text-lg font-semibold mb-3" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                Haftung für Inhalte
              </h2>
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den
                allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
                verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
                forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
              <p className="mt-3">
                Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen
                Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der
                Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
                Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
              </p>
            </div>

            <div>
              <h2 className="text-[#151E39] text-lg font-semibold mb-3" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                Urheberrecht
              </h2>
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
                Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
                Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
              </p>
            </div>

          </div>
        </div>
      </section>

      <PageFooter />
    </main>
  )
}
