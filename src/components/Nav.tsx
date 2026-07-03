import { useState } from 'react';
import { Scramble } from './ui';
import { scrollToTarget } from '../lib/scrollState';

const LINKS = [
  { label: 'About', target: '#manifesto' },
  { label: 'Work', target: '#work' },
  { label: 'Metrics', target: '#metrics' },
  { label: 'Contact', target: '#contact' },
];

export function Nav({ entered }: { entered: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <header className={`nav ${entered ? 'on' : ''} ${open ? 'menu-open' : ''}`}>
      <div className="nav-left">
        <button className="pill logo-pill" onClick={() => scrollToTarget('#top')}>
          GKK
        </button>
        <div className={`pill menu-pill ${open ? 'open' : ''}`}>
          <button
            className="menu-btn"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="burger" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
          <nav className="menu-links" aria-label="Sections">
            {LINKS.map((l) => (
              <button
                key={l.label}
                tabIndex={open ? 0 : -1}
                onClick={() => {
                  setOpen(false);
                  scrollToTarget(l.target);
                }}
              >
                <Scramble text={l.label} />
              </button>
            ))}
          </nav>
        </div>
      </div>
      <a className="nav-cta" href="https://github.com/G26karthik" target="_blank" rel="noreferrer">
        GitHub ↗
      </a>
    </header>
  );
}
