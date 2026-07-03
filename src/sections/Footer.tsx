import { useEffect, useState } from 'react';
import { Scramble } from '../components/ui';
import { VideoBg } from '../components/VideoBg';

const LINKS = [
  { label: 'GITHUB', url: 'https://github.com/G26karthik' },
  { label: 'LINKEDIN', url: 'https://www.linkedin.com/in/g-karthik26' },
  { label: 'CODECHEF', url: 'https://www.codechef.com/users/g26karthikk' },
  { label: 'LEETCODE', url: 'https://leetcode.com/u/G26KarthikK/' },
  { label: 'CODOLIO', url: 'https://codolio.com/profile/G26karthik/card' },
  { label: 'CREDLY', url: 'https://www.credly.com/users/g26karthik' },
  { label: 'EMAIL', url: 'mailto:Karthikofficialmain@gmail.com' },
];

function istTime() {
  return new Date().toLocaleTimeString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

export function Footer() {
  const [time, setTime] = useState(istTime);

  useEffect(() => {
    const id = setInterval(() => setTime(istTime()), 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer id="contact" className="footer">
      <div className="footer-video">
        <VideoBg src="/video/nebula.mp4" />
      </div>
      <div className="footer-body">
        <div>
          <p className="footer-mark">GKK · G. KARTHIK KOUNDINYA</p>
          <p className="footer-blurb">
            Systems and AI engineer in Hyderabad. Building high-throughput intelligence
            infrastructure that survives contact with production. Open to SDE and AI engineer
            roles, 2026-27.
          </p>
          <a className="footer-cta" href="mailto:Karthikofficialmain@gmail.com">
            <Scramble text="Let's build" />
            <span aria-hidden="true">↗</span>
          </a>
          <nav className="footer-links" aria-label="Profiles">
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.url}
                target={l.url.startsWith('mailto') ? undefined : '_blank'}
                rel="noreferrer"
              >
                <Scramble text={l.label} />
              </a>
            ))}
          </nav>
        </div>
        <div className="footer-legal">
          <span>(c) 2026 G. Karthik Koundinya. All rights reserved.</span>
          <span>Hyderabad, IN · {time} IST</span>
        </div>
      </div>
    </footer>
  );
}
