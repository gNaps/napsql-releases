import type { JSX } from 'react'
import { site } from '@/site.config'

type Kind = 'new' | 'better' | 'fixed'

interface Entry {
  kind: Kind
  title: string
  text: string
}

interface Release {
  version: string
  date: string
  /** one line saying what the release is about */
  headline: string
  entries: Entry[]
}

const KIND_LABEL: Record<Kind, string> = { new: 'New', better: 'Better', fixed: 'Fixed' }

/** Newest first. The top one is expanded; the rest live in a <details>. */
const RELEASES: Release[] = [
  {
    version: '0.4.2',
    date: '1 October 2026',
    headline: 'napsql speaks English, and the assistant and MCP server got a round of hardening.',
    entries: [
      {
        kind: 'new',
        title: 'English interface',
        text: 'napsql now ships in English and Italian. English is the default, a fresh install opens in the language of your desktop, and you can switch at any time from Settings → Language, independently of the Locale setting that governs number and date formatting. The assistant answers in the language you picked.'
      },
      {
        kind: 'better',
        title: 'Security and stability improvements',
        text: 'A round of improvements to the read-only guarantees of the AI assistant and the MCP server, plus a few fixes to formatting that ignored the Locale setting. Updating is recommended.'
      }
    ]
  },
  {
    version: '0.4.1',
    date: '30 September 2026',
    headline: 'Results that open cleanly in Excel, and a JSON export next to the CSV one.',
    entries: [
      {
        kind: 'new',
        title: 'Export to JSON',
        text: 'The export button now offers CSV or JSON. JSON comes out as one object per row, keyed by column name, with NULL as null, ISO dates, and bigint and decimal kept as strings so no digit is lost.'
      },
      {
        kind: 'fixed',
        title: 'CSV files open in columns in Excel',
        text: 'The export used a comma as separator, so an Excel set to a European locale put every row in a single cell. It now uses a semicolon and writes decimals with a comma, so values land in their columns and numbers stay numbers.'
      }
    ]
  },
  {
    version: '0.4.0',
    date: '17 September 2026',
    headline: 'Your database, reachable from the AI client you already work in, and readable as a diagram.',
    entries: [
      {
        kind: 'new',
        title: 'MCP server',
        text: 'napsql can host a local MCP endpoint, so Claude Desktop or Claude Code can list your connections, read schemas, describe tables and run SELECTs. Credentials never leave the app: the client talks to a small bridge that relays to napsql over a local pipe behind a per-session token.'
      },
      {
        kind: 'new',
        title: 'Opt-in, one connection at a time',
        text: 'A connection is invisible to any client until you expose it, and an exposed one starts read-only. Writes need a second, per-connection grant, and every single one is confirmed in the app with the exact SQL in front of you.'
      },
      {
        kind: 'new',
        title: 'Context notes on your schema',
        text: 'Write what a server, database, table or column actually means: which table is the authoritative one, that a column holds kilometres as a string. The notes reach the built-in assistant and any MCP client exactly when they look at that object. Stored locally, never on the server.'
      },
      {
        kind: 'new',
        title: 'Relationship diagrams',
        text: 'Right click a table: it opens with its neighbours around it, foreign-key columns marked, 1:1 told apart from 1:N. Click to edit the data, double click to move the diagram onto another table. Read from the catalog only, so nothing is created on your server.'
      },
      {
        kind: 'new',
        title: 'Table triggers and linked servers',
        text: 'Both now live in the explorer: script, enable, disable or drop a trigger; create, test, script or remove a linked server with its login mappings.'
      },
      {
        kind: 'better',
        title: 'The assistant is no longer tied to one vendor',
        text: 'Pick Claude through the official SDK, or any OpenAI-compatible endpoint: OpenAI, OpenRouter, Groq, or a model running locally under Ollama or LM Studio, where no API key is needed at all. Keys are kept per provider and the model field accepts anything you type.'
      },
      {
        kind: 'fixed',
        title: 'One dead server no longer hides the others',
        text: 'With several servers open, a connection that dropped (VPN down, server restarted) used to replace the whole explorer with an error. Now it is marked unreachable and everything else stays browsable.'
      },
      {
        kind: 'fixed',
        title: 'Connections with no default database',
        text: 'When a connection left the database to the login, every schema call answered “no active connection”. napsql now records where the connection actually landed.'
      }
    ]
  },
  {
    version: '0.3.0',
    date: '15 September 2026',
    headline: 'Several servers open at once, and a data editor that knows where a foreign key leads.',
    entries: [
      {
        kind: 'new',
        title: 'Multiple connections',
        text: 'Open as many servers as you need: each stays connected, the explorer shows a root per server, and every query tab is bound to one. Databases, autocomplete, plans, jobs and the assistant follow the tab’s server, not a single global connection.'
      },
      {
        kind: 'new',
        title: 'Disconnect one server',
        text: 'From the title-bar menu, the explorer root or the connection card. Closing one leaves the others exactly where they were.'
      },
      {
        kind: 'new',
        title: 'Table triggers',
        text: 'Every table lists its triggers, with the events they fire on and a dimmed row when one is disabled. Script them as CREATE or ALTER, enable, disable or drop, or start a new one from a ready-made skeleton.'
      },
      {
        kind: 'new',
        title: 'Linked servers',
        text: 'A node next to Logins and SQL Agent lists the servers this one is linked to. Create or edit them (SQL Server or any OLE DB provider, data access, RPC out, login mapping), test the remote connection, script them, or drop one with its login mappings.'
      },
      {
        kind: 'new',
        title: 'Foreign-key picker',
        text: 'A cell that points at another table opens it in a window, with free-text search and the current row highlighted. One click sets the relation.'
      },
      {
        kind: 'new',
        title: 'Nested folders',
        text: 'Connections organise into a tree. A folder counts everything in its subfolders, and selecting it lists the whole subtree.'
      },
      {
        kind: 'new',
        title: 'F5 runs the query',
        text: 'The SSMS habit, from the editor or anywhere else in the workspace.'
      },
      {
        kind: 'better',
        title: 'Run respects the selection',
        text: 'With text selected only that runs, otherwise the whole script. The separate button is gone.'
      },
      {
        kind: 'better',
        title: 'Data editor filters',
        text: 'A quick search across every column in the toolbar, and the full SQL condition in its own window. The two combine.'
      },
      {
        kind: 'better',
        title: 'Browsing that never blocks',
        text: 'Searches read without taking locks, give up after fifteen seconds, and a new keystroke cancels the previous one, so looking at a table no longer slows down whoever is writing to it.'
      },
      {
        kind: 'fixed',
        title: 'Passwords typed and lost',
        text: 'Typing a password without noticing the toggle meant it was discarded on save: the test succeeded, the connection didn’t. The toggle now turns itself on.'
      },
      {
        kind: 'fixed',
        title: 'Save without connecting',
        text: 'Renaming a connection or moving it to another folder no longer forces a round trip to the server.'
      }
    ]
  },
  {
    version: '0.2.3',
    date: '15 September 2026',
    headline: 'Execution plans are visible again in the installed app.',
    entries: [
      {
        kind: 'fixed',
        title: 'Execution plan',
        text: 'The rendering library was loaded in a way that only worked in development. The graph now appears in the installed app too.'
      }
    ]
  },
  {
    version: '0.2.2',
    date: '11 September 2026',
    headline: 'One database per tab, with no reconnecting.',
    entries: [
      {
        kind: 'new',
        title: 'Per-tab database',
        text: 'Two tabs can work on different databases of the same connection, each with its own pool.'
      },
      {
        kind: 'fixed',
        title: 'Data editor',
        text: 'In-cell buttons answer the first click, and column widths survive an edit.'
      }
    ]
  },
  {
    version: '0.2.1',
    date: '30 June 2026',
    headline: 'Foreign keys in the designer, plus data-editing fixes.',
    entries: [
      {
        kind: 'new',
        title: 'Foreign key management',
        text: 'Create, edit and drop single-column foreign keys from the table designer.'
      },
      {
        kind: 'fixed',
        title: 'Dates and text',
        text: 'Dates read and write exactly as stored, and short text columns are editable inline again.'
      }
    ]
  }
]

export function Changelog(): JSX.Element {
  const [latest, ...older] = RELEASES
  return (
    <section className="changelog" id="changelog" aria-labelledby="changelog-title">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">What&apos;s new</span>
          <h2 id="changelog-title">Every release, and why it happened.</h2>
          <p>
            napsql is in beta and moves quickly. Each entry says what changed and what it was for, not just the name of
            a feature.
          </p>
        </div>

        <div className="rel-list">
          <Release release={latest} current />
          <details className="rel-older">
            <summary>
              <span className="rel-older-label">Earlier releases</span>
              <span className="rel-older-count">{older.length}</span>
            </summary>
            <div className="rel-list" style={{ marginTop: 18 }}>
              {older.map((r) => (
                <Release key={r.version} release={r} />
              ))}
            </div>
          </details>
        </div>
      </div>
    </section>
  )
}

function Release({ release, current }: { release: Release; current?: boolean }): JSX.Element {
  return (
    <article className={`rel${current ? ' rel-current' : ''}`}>
      <div className="rel-side">
        <span className="rel-dot" aria-hidden="true" />
        <span className="rel-version">v{release.version}</span>
        <span className="rel-date">{release.date}</span>
        {current && <span className="rel-badge">latest</span>}
      </div>
      <div className="rel-body">
        <p className="rel-headline">{release.headline}</p>
        <ul className="rel-entries">
          {release.entries.map((e) => (
            <li key={e.title} className={`rel-entry rel-${e.kind}`}>
              <span className="rel-kind">{KIND_LABEL[e.kind]}</span>
              <div>
                <h3>{e.title}</h3>
                <p>{e.text}</p>
              </div>
            </li>
          ))}
        </ul>
        {current && (
          <a className="rel-cta" href={site.windowsDownloadUrl} download rel="noopener">
            Download {release.version} for Windows →
          </a>
        )}
      </div>
    </article>
  )
}
