import React from 'react'
import type { Metadata } from 'next'
import { Navigation } from '@/components/Navigation'
import { PageFooter } from '@/components/PageFooter'

export const metadata: Metadata = {
  title: 'Datenschutz — Baliv Residence',
  description: 'Datenschutzerklärung von Baliv Residence gemäß DSGVO.',
}

const h2Class = 'text-[#151E39] text-lg font-semibold mb-3'
const h2Style = { fontFamily: 'var(--font-playfair), serif' }
const listClass = 'list-disc list-inside mt-2 space-y-1 text-[#151E39]/70'

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
          <p className="text-[#151E39]/40 text-sm mb-12">Stand: September 2026</p>

          <div className="space-y-10 text-[#151E39]/80 leading-relaxed text-sm">

            <div>
              <h2 className={h2Class} style={h2Style}>
                1. Verantwortlicher
              </h2>
              <p>
                Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:<br /><br />
                Real Living d.o.o.<br />
                Bjeliši BB<br />
                85000 Bar, Montenegro<br />
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
                2. Erhebung und Speicherung personenbezogener Daten beim Besuch der Website
              </h2>
              <p>
                Beim Besuch unserer Website werden automatisch Informationen allgemeiner Natur erfasst.
                Diese Informationen (Server-Logfiles) beinhalten etwa die Art des Webbrowsers, das verwendete
                Betriebssystem, den Domainnamen Ihres Internet-Service-Providers und Ähnliches.
              </p>
              <p className="mt-3">
                Diese Daten werden insbesondere zu folgenden Zwecken verarbeitet:
              </p>
              <ul className={listClass}>
                <li>Sicherstellung eines problemlosen Verbindungsaufbaus der Website</li>
                <li>Sicherstellung einer reibungslosen Nutzung unserer Website</li>
                <li>Auswertung der Systemsicherheit und -stabilität</li>
              </ul>
              <p className="mt-3">
                Unsere Website setzt keine Analyse- oder Tracking-Werkzeuge ein. Schriftarten werden zusammen mit
                der Website ausgeliefert; beim Aufruf der Seiten werden keine Schriften von externen Anbietern geladen.
              </p>
            </div>

            <div>
              <h2 className={h2Class} style={h2Style}>
                3. Kontaktformular
              </h2>
              <p>
                Wenn Sie uns über das Kontaktformular auf dieser Website eine Anfrage zukommen lassen,
                werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen
                Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns
                gespeichert. Ihre Anfrage wird in unserer Datenbank abgelegt und per E-Mail an uns weitergeleitet;
                gegebenenfalls erhalten Sie eine Bestätigung und — auf Wunsch — das Exposé per E-Mail.
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
              <h2 className={h2Class} style={h2Style}>
                4. Weitergabe von Daten und eingesetzte Dienstleister
              </h2>
              <p>
                Für den Betrieb dieser Website und die Bearbeitung Ihrer Anfragen setzen wir Dienstleister ein, die
                personenbezogene Daten ausschließlich in unserem Auftrag verarbeiten (Auftragsverarbeiter):
              </p>
              <ul className={listClass}>
                <li>
                  <strong className="font-semibold">Vercel Inc.</strong> — Hosting der Website und Speicherung
                  hochgeladener Dateien
                </li>
                <li>
                  <strong className="font-semibold">Neon</strong> — Datenbank, in der Formularanfragen gespeichert
                  werden (Rechenzentrum in Frankfurt am Main)
                </li>
                <li>
                  <strong className="font-semibold">Resend</strong> — Versand der E-Mails nach einer Formularanfrage
                </li>
              </ul>
              <p className="mt-3">
                Darüber hinaus geben wir Ihre persönlichen Daten nur an Dritte weiter, wenn:
              </p>
              <ul className={listClass}>
                <li>Sie Ihre ausdrückliche Einwilligung dazu erteilt haben</li>
                <li>die Verarbeitung zur Abwicklung eines Vertrags mit Ihnen erforderlich ist</li>
                <li>die Verarbeitung zur Erfüllung einer rechtlichen Verpflichtung erforderlich ist</li>
              </ul>
            </div>

            <div>
              <h2 className={h2Class} style={h2Style}>
                5. Cookies
              </h2>
              <p>
                Die öffentlichen Seiten dieser Website setzen keine Cookies. Lediglich im geschützten
                Redaktionsbereich wird nach der Anmeldung ein technisch notwendiges Cookie gesetzt, das
                ausschließlich unsere Redakteure betrifft.
              </p>
            </div>

            <div>
              <h2 className={h2Class} style={h2Style}>
                6. WhatsApp-Kontakt
              </h2>
              <p>
                Über den WhatsApp-Button nehmen Sie Kontakt über einen Dienst der Meta Platforms Ireland Ltd. auf.
                Mit dem Klick verlassen Sie unsere Website; es gelten die Datenschutzbestimmungen von WhatsApp.
              </p>
            </div>

            <div>
              <h2 className={h2Class} style={h2Style}>
                7. Ihre Rechte
              </h2>
              <p>Ihnen stehen bezüglich Ihrer bei uns gespeicherten Daten grundsätzlich folgende Rechte zu:</p>
              <ul className={listClass}>
                <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
                <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
                <li>Recht auf Löschung (Art. 17 DSGVO)</li>
                <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
                <li>Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
                <li>Recht auf Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)</li>
              </ul>
              <p className="mt-3">
                Wenn Sie glauben, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt oder Ihre
                datenschutzrechtlichen Ansprüche sonst in einer Weise verletzt worden sind, können Sie sich bei
                der Aufsichtsbehörde beschweren.
              </p>
            </div>

            <div>
              <h2 className={h2Class} style={h2Style}>
                8. Aktualität und Änderung dieser Datenschutzerklärung
              </h2>
              <p>
                Diese Datenschutzerklärung ist aktuell gültig und hat den Stand September 2026. Durch die
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
