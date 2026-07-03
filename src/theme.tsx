import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import gsap from 'gsap';
import { scrollState } from './lib/scrollState';

type Theme = 'dark' | 'light';

const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: 'dark',
  toggle: () => {},
});

function initialTheme(): Theme {
  try {
    const stored = localStorage.getItem('gkk-theme');
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    /* private mode */
  }
  return 'dark';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('gkk-theme', theme);
    } catch {
      /* ignore */
    }
    gsap.to(scrollState, {
      themeMix: theme === 'dark' ? 1 : 0,
      duration: 0.6,
      ease: 'power2.inOut',
      overwrite: true,
    });
  }, [theme]);

  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), []);

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
