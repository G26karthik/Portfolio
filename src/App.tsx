import { useCallback, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ThemeProvider } from './theme';
import { useLenis } from './hooks/useLenis';
import { usePerfTier } from './hooks/usePerfTier';
import { Scene } from './three/Scene';
import { Preloader } from './components/Preloader';
import { Cursor } from './components/Cursor';
import { Nav } from './components/Nav';
import { CommandPalette } from './components/CommandPalette';
import { Hero } from './sections/Hero';
import { Specs } from './sections/Specs';
import { Work } from './sections/Work';
import { OpenSource } from './sections/OpenSource';
import { Archive } from './sections/Archive';
import { Experience } from './sections/Experience';
import { Skills } from './sections/Skills';
import { OffClock } from './sections/OffClock';
import { Contact } from './sections/Contact';

gsap.registerPlugin(ScrollTrigger);

function Site() {
  const perf = usePerfTier();
  const [ready, setReady] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useLenis(!perf.reduced);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (ready) ScrollTrigger.refresh();
  }, [ready]);

  const onPreloaded = useCallback(() => {
    document.fonts.ready.then(() => setReady(true));
  }, []);

  return (
    <>
      <Preloader reduced={perf.reduced} onDone={onPreloaded} />
      <Scene perf={perf} />
      <Cursor />
      <Nav onPalette={() => setPaletteOpen(true)} />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <main className="site">
        <Hero ready={ready} />
        <Specs />
        <Work />
        <OpenSource />
        <Archive />
        <Experience />
        <Skills />
        <OffClock />
        <Contact />
      </main>
      <div className="grain" aria-hidden="true" />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Site />
    </ThemeProvider>
  );
}
