import type { JSX } from 'react'

/**
 * macOS blocks the first launch of napsql, because the app is signed with a
 * development certificate and not yet notarised by Apple. Rather than let
 * people meet that dialog unprepared and assume the download is broken, the
 * section says plainly why it happens and walks through the one-time unlock.
 */

const STEPS: Array<{ title: string; text: string }> = [
  {
    title: 'Install it as usual',
    text: 'Open the .dmg and drag napsql onto the Applications folder. Nothing unusual happens here.'
  },
  {
    title: 'Expect the warning',
    text: 'The first time you open napsql, macOS refuses and says it cannot verify the app is free of malware. Click Done. Nothing is wrong with the download.'
  },
  {
    title: 'Allow it, once',
    text: 'Go to System Settings → Privacy & Security and scroll to the Security section: napsql is listed as blocked, with an Open Anyway button. Click it, confirm, and napsql starts. Every launch after this one is ordinary.'
  }
]

const FACTS: Array<{ title: string; text: string }> = [
  {
    title: 'The app is signed',
    text: 'napsql carries a valid Apple signature and runs under the hardened runtime. What it lacks is the paid Developer ID that would let Apple vouch for it automatically.'
  },
  {
    title: 'It only happens once',
    text: 'macOS remembers your decision per machine. You will not see the dialog again on that Mac, not on this version nor on the next.'
  },
  {
    title: 'Notarisation is coming',
    text: 'Once napsql moves onto an Apple Developer ID and through notarisation, this whole detour disappears and the app opens on the first double-click.'
  }
]

export function MacFirstLaunch(): JSX.Element {
  return (
    <section className="gk" id="macos" aria-labelledby="macos-title">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">Opening it on macOS</span>
          <h2 id="macos-title">The first launch on a Mac takes one extra click.</h2>
          <p>
            napsql is not yet notarised by Apple, so macOS treats it the way it treats anything it has not been
            told about: it stops the first launch and asks you to confirm. Here is exactly what you will see, and
            how to get past it in under a minute.
          </p>
        </div>

        <ol className="gk-steps">
          {STEPS.map((s, i) => (
            <li key={s.title}>
              <span className="gk-num" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="gk-alt">
          <span className="gk-kicker">Prefer the terminal?</span>
          <p>One command clears the quarantine flag and skips the dialog entirely:</p>
          <pre>
            <code>xattr -dr com.apple.quarantine /Applications/Napsql.app</code>
          </pre>
          <p className="gk-fineprint">
            On macOS 15 and later, right-clicking the app and choosing Open no longer works as a shortcut — Apple
            removed it. System Settings, or this command, are the two ways through.
          </p>
        </div>

        <div className="gk-grid">
          {FACTS.map((f) => (
            <div className="gk-card" key={f.title}>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
