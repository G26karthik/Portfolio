import { useEffect, useMemo, useRef, useState } from 'react';
import { scrollToTarget } from '../lib/scrollState';

interface Command {
  label: string;
  hint: string;
  run: () => void;
}

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);

  const commands = useMemo<Command[]>(
    () => [
      { label: 'Go to Work', hint: 'section', run: () => scrollToTarget('#work') },
      { label: 'Go to Open Source', hint: 'section', run: () => scrollToTarget('#oss') },
      { label: 'Go to Archive', hint: 'section', run: () => scrollToTarget('#archive') },
      { label: 'Go to Experience', hint: 'section', run: () => scrollToTarget('#experience') },
      { label: 'Go to Skills', hint: 'section', run: () => scrollToTarget('#skills') },
      { label: 'Go to Contact', hint: 'section', run: () => scrollToTarget('#contact') },
      { label: 'Open GitHub', hint: 'link', run: () => window.open('https://github.com/G26karthik', '_blank') },
      {
        label: 'Open LinkedIn',
        hint: 'link',
        run: () => window.open('https://www.linkedin.com/in/g-karthik26', '_blank'),
      },
      {
        label: 'Send Email',
        hint: 'link',
        run: () => {
          window.location.href = 'mailto:Karthikofficialmain@gmail.com';
        },
      },
    ],
    [],
  );

  const filtered = useMemo(
    () => commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase())),
    [commands, query],
  );

  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      requestAnimationFrame(() => input.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive((a) => Math.min(a + 1, filtered.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
      }
      if (e.key === 'Enter' && filtered[active]) {
        filtered[active].run();
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, filtered, active, onClose]);

  if (!open) return null;

  return (
    <div className="palette-overlay" onClick={onClose} role="dialog" aria-label="Command palette">
      <div className="palette" onClick={(e) => e.stopPropagation()}>
        <div className="palette-input-row">
          <span className="kicker">{'>'}</span>
          <input
            ref={input}
            className="palette-input"
            placeholder="Type a command…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
          />
          <kbd className="palette-kbd">ESC</kbd>
        </div>
        <ul className="palette-list">
          {filtered.length === 0 && <li className="palette-empty">No matches</li>}
          {filtered.map((c, i) => (
            <li key={c.label}>
              <button
                className={`palette-item ${i === active ? 'palette-item-active' : ''}`}
                onMouseEnter={() => setActive(i)}
                onClick={() => {
                  c.run();
                  onClose();
                }}
              >
                {c.label}
                <span className="palette-hint">{c.hint}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
