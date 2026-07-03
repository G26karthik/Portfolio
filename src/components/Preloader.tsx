import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const BOOT_LINES = ['calibrating system', 'loading neural weights', 'mapping performance stages', 'ready'];

export function Preloader({ reduced, onDone }: { reduced: boolean; onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [line, setLine] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (reduced) {
      onDone();
      setGone(true);
      return;
    }
    const obj = { n: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        onDone();
        setGone(true);
      },
    });
    tl.to(obj, {
      n: 100,
      duration: 1.7,
      ease: 'power2.inOut',
      onUpdate: () => {
        const v = Math.round(obj.n);
        if (counter.current) counter.current.textContent = String(v).padStart(3, '0');
        if (bar.current) bar.current.style.transform = `scaleX(${obj.n / 100})`;
        setLine(Math.min(Math.floor(obj.n / 26), BOOT_LINES.length - 1));
      },
    });
    tl.to(root.current, { yPercent: -100, duration: 0.85, ease: 'expo.inOut' }, '+=0.15');
    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (gone) return null;

  return (
    <div className="preloader" ref={root} role="status" aria-label="Loading">
      <div className="preloader-inner">
        <p className="kicker preloader-line">
          {'>'} {BOOT_LINES[line]}
        </p>
        <span className="preloader-counter display" ref={counter}>
          000
        </span>
        <div className="preloader-track">
          <div className="preloader-bar" ref={bar} />
        </div>
      </div>
    </div>
  );
}
