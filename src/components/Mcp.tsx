import type { JSX } from 'react'

/**
 * The MCP pitch: how an AI client reaches SQL Server through napsql, and why
 * it never gets hold of the login. The flow diagram is plain HTML/CSS (no
 * SVG, no JS) and turns vertical on narrow screens.
 */

const TOOLS = [
  'list_connections',
  'list_databases',
  'get_schema',
  'search_objects',
  'describe_table',
  'run_select',
  'run_write'
]

const STEPS: Array<{ title: string; text: string }> = [
  {
    title: 'Expose a connection',
    text: 'Flag the connections you want to share. Everything else stays invisible to the client, not just locked.'
  },
  {
    title: 'Plug in your client',
    text: 'One click writes the entry into Claude Desktop; for Claude Code, napsql gives you the snippet for .mcp.json.'
  },
  {
    title: 'Ask',
    text: 'The client lists your servers, reads the schema, describes tables and runs queries, right where you already work.'
  }
]

const GUARANTEES: Array<{ title: string; text: string }> = [
  {
    title: 'Credentials never leave napsql',
    text: 'Passwords stay encrypted by the operating system inside the app. The client only ever holds a connection id.'
  },
  {
    title: 'Read-only by default',
    text: 'An exposed connection can only be read. Writes are a second, per-connection grant you have to give on purpose.'
  },
  {
    title: 'Every write, confirmed',
    text: 'Each write stops in napsql with the exact SQL in front of you, and runs only when you approve it.'
  },
  {
    title: 'Bounded queries',
    text: 'run_select accepts SELECT only, with its own timeout and a row cap, so a model can’t drag a whole table out.'
  },
  {
    title: 'Local only',
    text: 'The bridge talks to napsql over a local named pipe with a token renewed at every start. No port is opened.'
  },
  {
    title: 'Context that travels',
    text: 'Your notes on servers, tables and columns reach the client exactly when it looks at that object.'
  }
]

export function Mcp(): JSX.Element {
  return (
    <section className="mcp" id="mcp" aria-labelledby="mcp-title">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">MCP server</span>
          <h2 id="mcp-title">Let Claude query your database, without ever seeing the password.</h2>
          <p>
            napsql hosts a local Model Context Protocol endpoint. Claude Desktop, Claude Code or any MCP client can
            explore your schema and run queries, but the connection is made by napsql, on your machine, with your
            rules. The model sees the results you let it read, never the login.
          </p>
        </div>

        <div className="mcp-flow" role="img" aria-label="An AI client talks to a credential-free bridge, which relays over a local pipe to napsql; only napsql holds the credentials and connects to SQL Server.">
          <div className="mcp-node">
            <span className="mcp-kicker">AI client</span>
            <strong>Claude Desktop · Claude Code</strong>
            <span>asks for schema and data</span>
          </div>
          <div className="mcp-link">
            <span>stdio · JSON-RPC</span>
          </div>
          <div className="mcp-node">
            <span className="mcp-kicker">Bridge</span>
            <strong>mcp-bridge</strong>
            <span>a tiny relay: no driver, no credentials</span>
          </div>
          <div className="mcp-link mcp-trust">
            <span>local pipe · per-start token</span>
            <em>credentials never cross this line</em>
          </div>
          <div className="mcp-node mcp-safe">
            <span className="mcp-kicker">napsql</span>
            <strong>
              <span className="mcp-lock" aria-hidden="true">
                ⚿
              </span>{' '}
              holds the login
            </strong>
            <span>applies exposure, read-only and confirmations</span>
          </div>
          <div className="mcp-link">
            <span>TDS</span>
          </div>
          <div className="mcp-node">
            <span className="mcp-kicker">Database</span>
            <strong>SQL Server</strong>
            <span>sees napsql, as always</span>
          </div>
        </div>

        <ol className="mcp-steps">
          {STEPS.map((s, i) => (
            <li key={s.title}>
              <span className="mcp-num" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mcp-grid">
          {GUARANTEES.map((g) => (
            <div className="mcp-card" key={g.title}>
              <h3>{g.title}</h3>
              <p>{g.text}</p>
            </div>
          ))}
        </div>

        <div className="mcp-tools">
          <span className="mcp-kicker">Tools the client gets</span>
          <ul>
            {TOOLS.map((t) => (
              <li key={t} className={t === 'run_write' ? 'gated' : undefined}>
                {t}
                {t === 'run_write' && <span> · needs your grant + confirmation</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
