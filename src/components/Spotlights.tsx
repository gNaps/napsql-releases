import type { JSX } from 'react'
/** Two deep-dives: execution plans and the AI copilot, each with a CSS-only mock. */
export function Spotlights(): JSX.Element {
  return (
    <section className="spotlight" id="plans" aria-labelledby="plans-title">
      <div className="wrap">
        <div className="spot">
          <div className="spot-text">
            <span className="eyebrow">See why it&apos;s slow</span>
            <h2 id="plans-title">Execution plans you can actually read.</h2>
            <p>
              Capture the estimated plan without running anything, or the actual plan as the query executes. napsql draws
              the operator tree and colors the expensive steps so tuning is a glance, not a hunt.
            </p>
            <ul>
              <li>Estimated &amp; actual plans, side by side with results</li>
              <li>Costliest operators flagged automatically</li>
              <li>Per-statement plans for multi-statement scripts</li>
            </ul>
          </div>
          <div className="panel-mock" role="img" aria-label="Execution plan mock: a clustered scan flagged as the costliest operator">
            <div className="pm-head">
              <span className="ico">▦</span> Execution plan · revenue.sql
            </div>
            <div className="plan">
              <Op name="Select" cost="2%" />
              <span className="connector" />
              <Op name="Sort" cost="11%" />
              <span className="connector" />
              <Op name="Hash Match" cost="22%" />
              <span className="connector" />
              <div className="plan-stack">
                <Op name="Clustered Scan" cost="58%" hot />
                <Op name="Index Seek" cost="7%" />
              </div>
            </div>
          </div>
        </div>

        <div className="spot rev">
          <div className="spot-text">
            <span className="eyebrow">Your copilot</span>
            <h2>An AI that knows your schema.</h2>
            <p>
              Describe what you need and get working SQL back, grounded in the tables you&apos;re actually connected to.
              It can read data to answer questions, but every write waits for your explicit approval.
            </p>
            <ul>
              <li>Plain-language to SQL, aware of your objects</li>
              <li>Explains and rewrites queries on request</li>
              <li>Writes are always gated behind a confirmation</li>
            </ul>
          </div>
          <div className="panel-mock" role="img" aria-label="AI assistant mock: a question answered with a SQL query and a write-confirmation gate">
            <div className="pm-head">
              <span className="ico">☼</span> Assistant
            </div>
            <div className="chat">
              <div className="bubble me">Which customers haven&apos;t ordered in the last 90 days?</div>
              <div className="bubble ai">
                <span className="lbl">napsql AI</span>
                Here&apos;s a query against <code>sales.customers</code> and <code>sales.orders</code>:
                <pre>
                  <span className="kw">SELECT</span> c.company_name, <span className="fn">MAX</span>(o.placed_at){' '}
                  <span className="kw">AS</span> last_order{'\n'}
                  <span className="kw">FROM</span> sales.customers c{'\n'}
                  <span className="kw">LEFT JOIN</span> sales.orders o <span className="kw">ON</span> o.customer_id = c.id{'\n'}
                  <span className="kw">GROUP BY</span> c.company_name{'\n'}
                  <span className="kw">HAVING</span> <span className="fn">MAX</span>(o.placed_at) &lt;{' '}
                  <span className="fn">DATEADD</span>(day,-90,<span className="fn">GETDATE</span>());
                </pre>
              </div>
              <div className="gate">⚠ UPDATE detected · review &amp; confirm before running</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Op({ name, cost, hot = false }: { name: string; cost: string; hot?: boolean }): JSX.Element {
  return (
    <div className={`op-node ${hot ? 'hot' : 'cool'}`}>
      <span className="opicon" aria-hidden="true">
        {hot ? '▤' : '▤'}
      </span>
      <span className="opname">{name}</span>
      <span className="opcost">{cost}</span>
    </div>
  )
}
