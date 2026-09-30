import type { JSX } from 'react'
export function Nav(): JSX.Element {
  return (
    <nav aria-label="Main">
      <div className="wrap nav-inner">
        <a className="brand" href="#top" aria-label="napsql home">
          <span className="mark" aria-hidden="true">
            N
          </span>
          nap<b>sql</b>
        </a>
        <div className="nav-links">
          <a href="#why">Why switch</a>
          <a href="#features">Features</a>
          <a href="#plans">Plans &amp; ops</a>
          <a href="#changelog">What’s new</a>
          <a href="#download">Download</a>
        </div>
        <a className="nav-cta" href="#download">
          Get napsql
        </a>
      </div>
    </nav>
  )
}
