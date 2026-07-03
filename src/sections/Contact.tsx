import { useEffect, useState } from 'react';
import { Magnetic, Scramble } from '../components/ui';
import { scrollToTarget } from '../lib/scrollState';

const LINKS = [
  { label: 'GITHUB', url: 'https://github.com/G26karthik' },
  { label: 'LINKEDIN', url: 'https://www.linkedin.com/in/g-karthik26' },
  { label: 'CODECHEF', url: 'https://www.codechef.com/users/g26karthikk' },
  { label: 'LEETCODE', url: 'https://leetcode.com/u/G26KarthikK/' },
  { label: 'CODOLIO', url: 'https://codolio.com/profile/G26karthik/card' },
  { label: 'CREDLY', url: 'https://www.credly.com/users/g26karthik' },
  { label: 'EMAIL', url: 'mailto:Karthikofficialmain@gmail.com' },
];

export function Contact() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
      );
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="contact" className="contact">
      <p className="kicker">08 / TRANSMISSION</p>
      <Magnetic strength={0.12} className="contact-cta-wrap">
        <a className="contact-cta display" href="mailto:Karthikofficialmain@gmail.com">
          <Scramble text="LET'S BUILD" />
          <span className="contact-arrow" aria-hidden="true">
            →
          </span>
        </a>
      </Magnetic>
      <p className="contact-sub">
        Open to AI engineering and software roles, ambitious systems, and interesting problems.
      </p>

      <footer className="footer">
        <nav className="footer-links" aria-label="Profiles">
          {LINKS.map((l) => (
            <a
              key={l.label}
              className="footer-link"
              href={l.url}
              target={l.url.startsWith('mailto') ? undefined : '_blank'}
              rel="noreferrer"
            >
              <Scramble text={l.label} />
            </a>
          ))}
        </nav>
        <div className="footer-meta kicker">
          <span>© 2026 G. KARTHIK KOUNDINYA</span>
          <span>HYD · {time} IST</span>
          <button className="footer-top" onClick={() => scrollToTarget('#top')} aria-label="Back to top">
            BACK TO TOP ↑
          </button>
        </div>
      </footer>
    </section>
  );
}
