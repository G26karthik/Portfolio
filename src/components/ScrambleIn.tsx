import { useEffect, useState } from 'react';

const CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><';

/**
 * Entrance reveal: characters decode left to right at 0.5 chars per 25ms
 * frame, with up to 3 random characters churning ahead of the cursor.
 */
export function ScrambleIn({
  text,
  delay = 0,
  triggered,
  className,
}: {
  text: string;
  delay?: number;
  triggered: boolean;
  className?: string;
}) {
  const [out, setOut] = useState(' ');

  useEffect(() => {
    if (!triggered) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOut(text);
      return;
    }

    let cursor = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const timer = setTimeout(() => {
      interval = setInterval(() => {
        cursor += 0.5;
        const revealed = Math.floor(cursor);
        if (revealed >= text.length) {
          setOut(text);
          clearInterval(interval);
          return;
        }
        let s = '';
        for (let i = 0; i < text.length; i++) {
          if (text[i] === ' ') {
            s += ' ';
          } else if (i < revealed) {
            s += text[i];
          } else if (i < revealed + 3) {
            s += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }
        setOut(s || ' ');
      }, 25);
    }, delay);

    return () => {
      clearTimeout(timer);
      if (interval) clearInterval(interval);
    };
  }, [triggered, text, delay]);

  return <span className={className}>{out}</span>;
}
