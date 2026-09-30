import type { JSX } from 'react'
/**
 * Kept honest on purpose: SSMS is a deep, mature tool and the table says so
 * where it is true. Overstating the gap would only cost credibility with the
 * people who use SSMS every day.
 */
const ROWS: Array<{ feat: string; ssms: string; nap: string; ssmsMark?: string; napMark?: string }> = [
  { feat: 'Platforms', ssms: 'Windows only', nap: 'macOS & Windows' },
  { feat: 'Interface', ssms: 'Legacy shell, no dark mode', nap: 'Native, modern, dark mode' },
  {
    feat: 'AI assistance',
    ssms: 'GitHub Copilot, no choice of model',
    nap: 'Claude, GPT or a local model, with your own key',
    ssmsMark: '~'
  },
  { feat: 'Install & startup', ssms: '~1 GB, slow first launch', nap: 'Lightweight, opens in seconds' },
  {
    feat: 'Several servers at once',
    ssms: 'Yes, registered servers and per-window connections',
    nap: 'Yes, with the server shown on every tab',
    ssmsMark: '✓'
  },
  {
    feat: 'Relationship diagrams',
    ssms: 'Yes, but they are stored inside your database',
    nap: 'Read-only, nothing written to the server',
    ssmsMark: '~'
  },
  {
    feat: 'Use from an AI client',
    ssms: 'No',
    nap: 'MCP server: query from Claude Desktop or Claude Code',
    ssmsMark: '✗'
  },
  {
    feat: 'Execution plans',
    ssms: 'The most complete there is',
    nap: 'Graphical, estimated & actual',
    ssmsMark: '✓',
    napMark: '~'
  }
]

export function Compare(): JSX.Element {
  return (
    <section className="compare" id="why" aria-labelledby="why-title">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">Why switch</span>
          <h2 id="why-title">The everyday work of SSMS, without the weight and without Windows.</h2>
          <p>
            SSMS is powerful and battle-tested, and for deep administration it still wins. It is also Windows-only,
            heavy, and frozen in a two-decade-old shell. napsql keeps the daily workflow and drops the friction.
          </p>
        </div>

        <div className="cmp" role="table" aria-label="SSMS versus napsql">
          <div className="cmp-row cmp-head" role="row">
            <div className="feat" role="columnheader">
              &nbsp;
            </div>
            <div className="ssms" role="columnheader">
              SSMS
            </div>
            <div className="nap" role="columnheader">
              napsql
            </div>
          </div>
          {ROWS.map((r) => (
            <div className="cmp-row" role="row" key={r.feat}>
              <div className="feat" role="rowheader">
                {r.feat}
              </div>
              <div className="ssms" role="cell">
                <span className={r.ssmsMark === '✓' ? 'yes' : 'no'} aria-hidden="true">
                  {r.ssmsMark ?? '×'}
                </span>
                {r.ssms}
              </div>
              <div className="nap" role="cell">
                <span className={r.napMark === '~' ? 'no' : 'yes'} aria-hidden="true">
                  {r.napMark ?? '✓'}
                </span>
                {r.nap}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
