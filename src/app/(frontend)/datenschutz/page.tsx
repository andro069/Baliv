import React from 'react'
import type { Metadata } from 'next'
import { Navigation } from '@/components/Navigation'
import { PageFooter } from '@/components/PageFooter'

export const metadata: Metadata = {
  title: 'Datenschutz — Baliv Residence',
  description: 'Datenschutzerklärung von Baliv Residence gemäß DSGVO.',
}

export default function DatenschutzPage() {
  return (
    <main className="bg-[#F0EDE8]" style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>
      <Navigation />

      <section className="pt-40 pb-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#B69252] text-xs tracking-[0.3em] uppercase mb-4">Rechtliches</p>
          <h1
            className="text-[#151E39] text-4xl md:text-5xl mb-4"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            Datenschutzerklärung
          </h1>
          <p className="text-[#151E39]/40 text-sm mb-12">Stand: Mai 2026</p>

          <div className="space-y-10 text-[#151E39]/80 leading-relaxed text-sm">

            <div className="bg-[#B69252]/10 border border-[#B69252]/20 rounded px-4 py-3 text-xs text-[#B69252]">
              ⚠ Platzhalter — diese Datenschutzerklärung muss vor dem Live-Gang von einem Rechtsanwalt geprüft und an die tatsächliche Datenverarbeitung angepasst werden.
            </div>

            <div>
              <h2 className="text-[#151E39] text-lg font-semibold mb-3" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                1. Verantwortlicher
              </h2>
              <p>
                Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:<br /><br />
                Real Living d.o.o.<br />
                [Straße und Hausnummer]<br />
                85000 Bar, Montenegro<br />
                E-Mail: info@baliv-residence.com
              </p>
            </div>

            <div>
              <h2 className="text-[#151E39] text-lg font-semibold mb-3" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                2. Erhebung und Speicherung personenbezogener Daten
              </h2>
              <p>
                Beim Besuch unserer Website werden automatisch Informationen allgemeiner Natur erfasst.
                Diese Informationen (Server-Logfiles) beinhalten etwa die Art des Webbrowsers, das verwendete
                Betriebssystem, den Domainnamen Ihres Internet-Service-Providers und Ähnliches. Hierbei handelt
                es sich ausschließlich um Informationen, welche keine Rückschlüsse auf Ihre Person zulassen.
              </p>
              <p className="mt-3">
                Diese Daten werden insbesondere zu folgenden Zwecken verarbeitet:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-[#151E39]/70">
                <li>Sicherstellung eines problemlosen Verbindungsaufbaus der Website</li>
                <li>Sicherstellung einer reibungslosen Nutzung unserer Website</li>
                <li>Auswertung der Systemsicherheit und -stabilität</li>
              </ul>
            </div>

            <div>
              <h2 className="text-[#151E39] text-lg font-semibold mb-3" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                3. Kontaktformular
              </h2>
              <p>
                Wenn Sie uns über das Kontaktformular auf dieser Website eine Anfrage zukommen lassen,
                werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen
                Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns
                gespeichert.
              </p>
              <p className="mt-3">
                Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern
                Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung
                vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung
                auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen
                (Art. 6 Abs. 1 lit. f DSGVO).
              </p>
              <p className="mt-3">
                Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung
                auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung
                entfällt. Zwingende gesetzliche Bestimmungen — insbesondere Aufbewahrungsfristen — bleiben unberührt.
              </p>
            </div>

            <div>
              <h2 className="text-[#151E39] text-lg font-semibold mb-3" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                4. Weitergabe von Daten
              </h2>
              <p>
                Eine Übermittlung Ihrer persönlichen Daten an Dritte zu anderen als den im Folgenden aufgeführten
                Zwecken findet nicht statt. Wir geben Ihre persönlichen Daten nur an Dritte weiter, wenn:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-[#151E39]/70">
                <li>Sie Ihre ausdrückliche Einwilligung dazu erteilt haben</li>
                <li>die Verarbeitung zur Abwicklung eines Vertrags mit Ihnen erforderlich ist</li>
                <li>die Verarbeitung zur Erfüllung einer rechtlichen Verpflichtung erforderlich ist</li>
              </ul>
            </div>

            <div>
              <h2 className="text-[#151E39] text-lg font-semibold mb-3" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                5. Cookies
              </h2>
              <p>
                Unsere Website verwendet Cookies. Dabei handelt es sich um kleine Textdateien, die Ihr Webbrowser
                auf Ihrem Endgerät speichert. Cookies helfen uns dabei, unser Angebot nutzerfreundlicher, effektiver
                und sicherer zu machen.
              </p>
              <p className="mt-3">
                Einige Cookies sind „Session-Cookies". Solche Cookies werden nach Ende Ihrer Browser-Sitzung von
                selbst gelöscht. Hingegen bleiben andere Cookies auf Ihrem Endgerät bestehen, bis Sie diese selbst
                löschen. Solche Cookies helfen uns, Sie bei Rückkehr auf unserer Website wiederzuerkennen.
              </p>
            </div>

            <div>
              <h2 className="text-[#151E39] text-lg font-semibold mb-3" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                6. Ihre Rechte
              </h2>
              <p>Ihnen stehen bezüglich Ihrer bei uns gespeicherten Daten grundsätzlich folgende Rechte zu:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-[#151E39]/70">
                <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
                <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
                <li>Recht auf Löschung (Art. 17 DSGVO)</li>
                <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
                <li>Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
              </ul>
              <p className="mt-3">
                Wenn Sie glauben, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt oder Ihre
                datenschutzrechtlichen Ansprüche sonst in einer Weise verletzt worden sind, können Sie sich bei
                der Aufsichtsbehörde beschweren.
              </p>
            </div>

            <div>
              <h2 className="text-[#151E39] text-lg font-semibold mb-3" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                7. Hosting
              </h2>
              <p>
                Diese Website wird bei [Hosting-Anbieter, z.B. Vercel Inc., 340 Pine Street, Suite 701,
                San Francisco, California 94104, USA] gehostet. Details entnehmen Sie der Datenschutzerklärung
                des Hosters: [Link zur Datenschutzerklärung des Hosters].
              </p>
            </div>

            <div>
              <h2 className="text-[#151E39] text-lg font-semibold mb-3" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                8. Aktualität und Änderung dieser Datenschutzerklärung
              </h2>
              <p>
                Diese Datenschutzerklärung ist aktuell gültig und hat den Stand Mai 2026. Durch die
                Weiterentwicklung unserer Website oder aufgrund geänderter gesetzlicher beziehungsweise
                behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung zu ändern.
              </p>
            </div>

          </div>
        </div>
      </section>

      <PageFooter />
    </main>
  )
}
