import type { JSX } from 'react'
import type { CSSProperties } from 'react'

const CARDS: Array<{ color: string; tag: string; title: string; text: string }> = [
  {
    color: 'var(--kw)',
    tag: 'Editor',
    title: 'Smart query editor',
    text: 'Monaco-powered editing with schema-aware autocomplete, one-key formatting, multi-tab queries (each tab bound to its own server and database) and snippets you can save and reuse.'
  },
  {
    color: 'var(--fn)',
    tag: 'Tuning',
    title: 'Graphical execution plans',
    text: 'Estimated and actual plans rendered as an SSMS-style operator tree, with relative costs highlighted so the bottleneck jumps out.'
  },
  {
    color: 'var(--cyan)',
    tag: 'Operations',
    title: 'Activity monitor',
    text: 'Live sessions and requests, blocking chains surfaced in red, CPU and duration at a glance, and a one-click kill with confirmation.'
  },
  {
    color: 'var(--type)',
    tag: 'Operations',
    title: 'Backup & restore',
    text: 'Full, differential, and copy-only backups with compression, plus a guided restore that relocates data files for you.'
  },
  {
    color: 'var(--num)',
    tag: 'Schema',
    title: 'Table designer',
    text: 'Create and alter tables and foreign keys visually, preview the generated DDL before it runs, and drop objects safely from the explorer.'
  },
  {
    color: 'var(--accent)',
    tag: 'AI',
    title: 'AI assistant',
    text: 'Ask in plain language. The assistant writes, explains and fixes SQL against your schema, and never runs a change without your go-ahead. Use Claude, GPT, or a model running on your own machine.'
  },
  {
    color: 'var(--purple)',
    tag: 'Diagrams',
    title: 'Relationship diagrams',
    text: 'Open any table and see what it points at and what points back, with the foreign-key columns marked and 1:1 told apart from 1:N. Read from the catalog, so nothing is stored in your database.'
  },
  {
    color: 'var(--blue)',
    tag: 'MCP',
    title: 'Reachable from your AI client',
    text: 'Expose a connection to Claude Desktop or Claude Code and ask questions where you already work. Read-only unless you say otherwise, every write confirmed in napsql, and your password never leaves the app.'
  },
  {
    color: 'var(--green)',
    tag: 'Administration',
    title: 'Agent jobs & logins',
    text: 'Create, schedule, start, and inspect SQL Agent jobs, and manage server logins and permissions, without leaving the app.'
  },
  {
    color: 'var(--purple)',
    tag: 'Data',
    title: 'Editable results',
    text: 'Edit cells right in the grid and commit changes, generate GUIDs in one click, open long values in a viewer, and export any result set to CSV (Excel-ready) or JSON.'
  }
]

export function Features(): JSX.Element {
  return (
    <section className="features" id="features" aria-labelledby="features-title">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">Built for the whole job</span>
          <h2 id="features-title">From writing a query to running the server.</h2>
          <p>Not just an editor. A complete day-to-day toolkit for developers and DBAs.</p>
        </div>

        <div className="grid-cards">
          {CARDS.map((c) => (
            <article className="card" style={{ '--c': c.color } as CSSProperties} key={c.title}>
              <span className="tag">{c.tag}</span>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
