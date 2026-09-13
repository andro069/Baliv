import React from 'react'
import type { Metadata } from 'next'
import { Navigation } from '@/components/Navigation'
import { PageFooter } from '@/components/PageFooter'

export const metadata: Metadata = {
  title: 'Impressum — Baliv Residence',
  description: 'Impressum und Anbieterkennzeichnung von Baliv Residence, Real Living d.o.o., Bar, Montenegro.',
}

const h2Class = 'text-[#151E39] text-lg font-semibold mb-3'
const h2Style = { fontFamily: 'var(--font-playfair), serif' }

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
              <h2 className={h2Class} style={h2Style}>
                Angaben gemäß § 5 DDG
              </h2>
              <p>
                Real Living d.o.o.<br />
                Bjeliši BB<br />
                85000 Bar<br />
                Montenegro
              </p>
            </div>

            <div>
              <h2 className={h2Class} style={h2Style}>
                Kontakt
              </h2>
              <p>
                E-Mail:{' '}
                <a href="mailto:info@baliv-residence.com" className="text-[#B69252] hover:underline">
                  info@baliv-residence.com
                </a>
                <br />
                Telefon:{' '}
                <a href="tel:+38268517873" className="text-[#B69252] hover:underline">
                  +382 68 517 873
                </a>
              </p>
            </div>

            <div>
              <h2 className={h2Class} style={h2Style}>
                Registrierung
              </h2>
              <p>
                Centralni registar privrednih subjekata (CRPS), Podgorica
              </p>
            </div>

            <div>
              <h2 className={h2Class} style={h2Style}>
                Steuernummer
              </h2>
              <p>PIB (Steuernummer): 03550168</p>
            </div>

            <div>
              <h2 className={h2Class} style={h2Style}>
                Verbraucherstreitbeilegung
              </h2>
              <p>
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>

            <div>
              <h2 className={h2Class} style={h2Style}>
                Haftung für Inhalte
              </h2>
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den
                allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht
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
              <h2 className={h2Class} style={h2Style}>
                Urheberrecht
              </h2>
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten sind urheberrechtlich
                geschützt. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
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
