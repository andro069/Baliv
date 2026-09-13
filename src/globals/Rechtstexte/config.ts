import type { Field, GlobalConfig } from 'payload'

import { lokalisiert } from '@/fields/lokalisiert'
import { revalidatePages } from '@/utilities/revalidatePages'

/**
 * Impressum und Datenschutzerklärung als pflegbare, übersetzbare Globals.
 *
 * Bewusst einfache Struktur statt Rich-Text: Jeder Abschnitt hat einen Titel und
 * einen Text. Im Text gilt:
 *   - eine Leerzeile trennt Absätze, ein einfacher Zeilenumbruch bleibt erhalten
 *   - Zeilen, die mit „- " beginnen, werden zu einer Aufzählung
 *   - **Text** zwischen doppelten Sternchen wird fett
 *   - E-Mail-Adressen, Telefonnummern (mit „+") und http(s)-Adressen werden verlinkt
 *
 * Die deutschen Texte stehen als Standardwerte in den Feldern. Solange ein Global
 * nie gespeichert wurde, liefert Payload diese Werte — die Seiten zeigen dann die
 * bisherigen Texte. Dieselben Konstanten dienen im Frontend als Rückfall.
 */

export type RechtstextDefaults = {
  eyebrow: string
  headline: string
  metaTitle: string
  metaDescription: string
  stand?: string
  abschnitte: { titel: string; text: string }[]
}

const TEXT_HILFE =
  'Leerzeile = neuer Absatz · einfacher Zeilenumbruch = neue Zeile (z. B. Anschrift) · Zeile mit „- " am Anfang = Aufzählungspunkt · **Text** = fett · E-Mail-Adressen, Telefonnummern mit „+" (z. B. +382 68 517 873) und Adressen mit https:// werden automatisch verlinkt.'

const rechtstextFelder = (defaults: RechtstextDefaults): Field[] =>
  lokalisiert([
    {
      name: 'meta',
      label: 'SEO / Meta-Angaben',
      type: 'group',
      fields: [
        { name: 'title', label: 'Seitentitel', type: 'text', defaultValue: defaults.metaTitle },
        { name: 'description', label: 'Meta-Beschreibung', type: 'textarea', defaultValue: defaults.metaDescription },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'eyebrow', label: 'Kleine Überschrift', type: 'text', defaultValue: defaults.eyebrow, admin: { width: '35%' } },
        { name: 'headline', label: 'Überschrift', type: 'text', defaultValue: defaults.headline, admin: { width: '65%' } },
      ],
    },
    {
      name: 'stand',
      label: 'Stand (z. B. „Stand: September 2026")',
      type: 'text',
      ...(defaults.stand ? { defaultValue: defaults.stand } : {}),
    },
    {
      name: 'abschnitte',
      label: 'Abschnitte',
      labels: { singular: 'Abschnitt', plural: 'Abschnitte' },
      type: 'array',
      defaultValue: defaults.abschnitte,
      admin: {
        description: TEXT_HILFE,
      },
      fields: [
        { name: 'titel', label: 'Titel', type: 'text' },
        { name: 'text', label: 'Text', type: 'textarea', admin: { rows: 8, description: TEXT_HILFE } },
      ],
    },
  ])

export const impressumDefaults: RechtstextDefaults = {
  eyebrow: 'Rechtliches',
  headline: 'Impressum',
  metaTitle: 'Impressum — Baliv Residence',
  metaDescription:
    'Impressum und Anbieterkennzeichnung von Baliv Residence, Real Living d.o.o., Bar, Montenegro.',
  abschnitte: [
    {
      titel: 'Angaben gemäß § 5 DDG',
      text: 'Real Living d.o.o.\nBjeliši BB\n85000 Bar\nMontenegro',
    },
    {
      titel: 'Kontakt',
      text: 'E-Mail: info@baliv-residence.com\nTelefon: +382 68 517 873',
    },
    {
      titel: 'Registrierung',
      text: 'Centralni registar privrednih subjekata (CRPS), Podgorica',
    },
    {
      titel: 'Steuernummer',
      text: 'PIB (Steuernummer): 03550168',
    },
    {
      titel: 'Verbraucherstreitbeilegung',
      text: 'Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
    },
    {
      titel: 'Haftung für Inhalte',
      text:
        'Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.' +
        '\n\n' +
        'Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.',
    },
    {
      titel: 'Urheberrecht',
      text: 'Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten sind urheberrechtlich geschützt. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.',
    },
  ],
}

export const datenschutzDefaults: RechtstextDefaults = {
  eyebrow: 'Rechtliches',
  headline: 'Datenschutzerklärung',
  metaTitle: 'Datenschutz — Baliv Residence',
  metaDescription: 'Datenschutzerklärung von Baliv Residence gemäß DSGVO.',
  stand: 'Stand: September 2026',
  abschnitte: [
    {
      titel: '1. Verantwortlicher',
      text:
        'Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:' +
        '\n\n' +
        'Real Living d.o.o.\nBjeliši BB\n85000 Bar, Montenegro\nE-Mail: info@baliv-residence.com\nTelefon: +382 68 517 873',
    },
    {
      titel: '2. Erhebung und Speicherung personenbezogener Daten beim Besuch der Website',
      text:
        'Beim Besuch unserer Website werden automatisch Informationen allgemeiner Natur erfasst. Diese Informationen (Server-Logfiles) beinhalten etwa die Art des Webbrowsers, das verwendete Betriebssystem, den Domainnamen Ihres Internet-Service-Providers und Ähnliches.' +
        '\n\n' +
        'Diese Daten werden insbesondere zu folgenden Zwecken verarbeitet:\n' +
        '- Sicherstellung eines problemlosen Verbindungsaufbaus der Website\n' +
        '- Sicherstellung einer reibungslosen Nutzung unserer Website\n' +
        '- Auswertung der Systemsicherheit und -stabilität' +
        '\n\n' +
        'Unsere Website setzt keine Analyse- oder Tracking-Werkzeuge ein. Schriftarten werden zusammen mit der Website ausgeliefert; beim Aufruf der Seiten werden keine Schriften von externen Anbietern geladen.',
    },
    {
      titel: '3. Kontaktformular',
      text:
        'Wenn Sie uns über das Kontaktformular auf dieser Website eine Anfrage zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Ihre Anfrage wird in unserer Datenbank abgelegt und per E-Mail an uns weitergeleitet; gegebenenfalls erhalten Sie eine Bestätigung und — auf Wunsch — das Exposé per E-Mail.' +
        '\n\n' +
        'Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO).' +
        '\n\n' +
        'Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt. Zwingende gesetzliche Bestimmungen — insbesondere Aufbewahrungsfristen — bleiben unberührt.',
    },
    {
      titel: '4. Weitergabe von Daten und eingesetzte Dienstleister',
      text:
        'Für den Betrieb dieser Website und die Bearbeitung Ihrer Anfragen setzen wir Dienstleister ein, die personenbezogene Daten ausschließlich in unserem Auftrag verarbeiten (Auftragsverarbeiter):\n' +
        '- **Vercel Inc.** — Hosting der Website und Speicherung hochgeladener Dateien\n' +
        '- **Neon** — Datenbank, in der Formularanfragen gespeichert werden (Rechenzentrum in Frankfurt am Main)\n' +
        '- **Resend** — Versand der E-Mails nach einer Formularanfrage' +
        '\n\n' +
        'Darüber hinaus geben wir Ihre persönlichen Daten nur an Dritte weiter, wenn:\n' +
        '- Sie Ihre ausdrückliche Einwilligung dazu erteilt haben\n' +
        '- die Verarbeitung zur Abwicklung eines Vertrags mit Ihnen erforderlich ist\n' +
        '- die Verarbeitung zur Erfüllung einer rechtlichen Verpflichtung erforderlich ist',
    },
    {
      titel: '5. Cookies',
      text: 'Die öffentlichen Seiten dieser Website setzen keine Cookies. Lediglich im geschützten Redaktionsbereich wird nach der Anmeldung ein technisch notwendiges Cookie gesetzt, das ausschließlich unsere Redakteure betrifft.',
    },
    {
      titel: '6. WhatsApp-Kontakt',
      text: 'Über den WhatsApp-Button nehmen Sie Kontakt über einen Dienst der Meta Platforms Ireland Ltd. auf. Mit dem Klick verlassen Sie unsere Website; es gelten die Datenschutzbestimmungen von WhatsApp.',
    },
    {
      titel: '7. Ihre Rechte',
      text:
        'Ihnen stehen bezüglich Ihrer bei uns gespeicherten Daten grundsätzlich folgende Rechte zu:\n' +
        '- Recht auf Auskunft (Art. 15 DSGVO)\n' +
        '- Recht auf Berichtigung (Art. 16 DSGVO)\n' +
        '- Recht auf Löschung (Art. 17 DSGVO)\n' +
        '- Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)\n' +
        '- Recht auf Datenübertragbarkeit (Art. 20 DSGVO)\n' +
        '- Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)\n' +
        '- Recht auf Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)' +
        '\n\n' +
        'Wenn Sie glauben, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt oder Ihre datenschutzrechtlichen Ansprüche sonst in einer Weise verletzt worden sind, können Sie sich bei der Aufsichtsbehörde beschweren.',
    },
    {
      titel: '8. Aktualität und Änderung dieser Datenschutzerklärung',
      text: 'Diese Datenschutzerklärung ist aktuell gültig und hat den Stand September 2026. Durch die Weiterentwicklung unserer Website oder aufgrund geänderter gesetzlicher beziehungsweise behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung zu ändern.',
    },
  ],
}

export const ImpressumPage: GlobalConfig = {
  slug: 'impressum-page',
  label: 'Impressum',
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  admin: { group: 'Seiten-Inhalte' },
  fields: rechtstextFelder(impressumDefaults),
  hooks: { afterChange: [revalidatePages(['/impressum'])] },
}

export const DatenschutzPage: GlobalConfig = {
  slug: 'datenschutz-page',
  label: 'Datenschutz',
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  admin: { group: 'Seiten-Inhalte' },
  fields: rechtstextFelder(datenschutzDefaults),
  hooks: { afterChange: [revalidatePages(['/datenschutz'])] },
}
