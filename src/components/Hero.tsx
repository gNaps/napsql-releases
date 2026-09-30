import type { JSX } from 'react'
import { DownloadButtons } from './DownloadButtons'

/** The above-the-fold pitch plus a pure-CSS mock of the app: what you look at all day. */
export function Hero(): JSX.Element {
  return (
    <header className="hero" id="top">
      <div className="wrap">
        <span className="eyebrow">The modern SQL Server client</span>
        <h1>
          Manage SQL Server from <span className="hl">any desktop.</span>
        </h1>
        <p className="sub">
          napsql is a fast, native client for Microsoft SQL Server, the alternative to SQL Server Management Studio that
          finally runs on <strong>macOS</strong> as well as <strong>Windows</strong>. Query editor, graphical execution
          plans, backups, agent jobs, and an AI assistant, in one clean app.
        </p>

        <DownloadButtons note />

        <AppMock />
      </div>
    </header>
  )
}

const ROWS: Array<[string, number, string]> = [
  ['Northwind Trading', 184, '€ 248.910,00'],
  ['Globex S.p.A.', 152, '€ 211.430,50'],
  ['Initech Srl', 139, '€ 198.220,00'],
  ['Umbrella Foods', 121, '€ 176.540,75'],
  ['Acme Components', 98, '€ 142.300,00']
]

function AppMock(): JSX.Element {
  return (
    <div className="mock-frame" role="img" aria-label="napsql window: a revenue query with its result grid">
      <div className="mock-title">
        <span className="dot r" />
        <span className="dot y" />
        <span className="dot g" />
        <span className="name">revenue.sql · napsql</span>
        <span className="conn">
          <span className="live" /> sql-prod-01 · AdventureWorks
        </span>
      </div>
      <div className="mock-body">
        <div className="rail" aria-hidden="true">
          <i className="on">⊞</i>
          <i>▦</i>
          <i>↻</i>
          <i>☼</i>
          <i>⚙</i>
        </div>
        <div className="mock-main">
          <div className="tabs" aria-hidden="true">
            <span className="tab active">
              revenue.sql · AdventureWorks <span className="x">×</span>
            </span>
            <span className="tab">
              audit.sql · Reporting <span className="x">×</span>
            </span>
            <span className="tab">+ </span>
          </div>

          <div className="editor" aria-hidden="true">
            <Line n={1}>
              <span className="com">-- Top revenue customers, last 30 days</span>
            </Line>
            <Line n={2}>
              <span className="kw">SELECT</span>   c.company_name,
            </Line>
            <Line n={3}>
              {'         '}
              <span className="fn">COUNT</span>(o.id)      <span className="kw">AS</span> <span className="al">orders</span>,
            </Line>
            <Line n={4}>
              {'         '}
              <span className="fn">SUM</span>(o.total)     <span className="kw">AS</span> <span className="al">revenue</span>
            </Line>
            <Line n={5}>
              <span className="kw">FROM</span>     sales.orders    o
            </Line>
            <Line n={6}>
              <span className="kw">JOIN</span>     sales.customers c <span className="kw">ON</span> c.id <span className="op">=</span>{' '}
              o.customer_id
            </Line>
            <Line n={7}>
              <span className="kw">WHERE</span>    o.placed_at <span className="op">&gt;=</span> <span className="fn">DATEADD</span>(
              <span className="kw">day</span>, <span className="op">-</span>
              <span className="num">30</span>, <span className="fn">SYSUTCDATETIME</span>())
            </Line>
            <Line n={8}>
              <span className="kw">GROUP BY</span> c.company_name
            </Line>
            <Line n={9}>
              <span className="kw">ORDER BY</span> revenue <span className="kw">DESC</span>;
            </Line>
          </div>

          <div className="results">
            <div className="res-tabs" aria-hidden="true">
              <span className="res-tab active">
                Results <span className="ct-badge">5</span>
              </span>
              <span className="res-tab">Messages</span>
              <span className="res-tab">Plan</span>
            </div>
            <table className="grid">
              <thead>
                <tr>
                  <th>company_name</th>
                  <th className="r">orders</th>
                  <th className="r">revenue</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map(([name, orders, revenue]) => (
                  <tr key={name}>
                    <td>{name}</td>
                    <td className="r">{orders}</td>
                    <td className="r money">{revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="statusbar" aria-hidden="true">
            <span className="ok">● Connected</span>
            <span>AdventureWorks</span>
            <span>5 rows</span>
            <span className="sp">0.071s</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function Line({ n, children }: { n: number; children: React.ReactNode }): JSX.Element {
  return (
    <div className="code-line">
      <span className="ln">{n}</span>
      <span className="ct">{children}</span>
    </div>
  )
}
