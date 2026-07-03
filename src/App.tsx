import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from './hooks/useLenis';
import { Nav } from './components/Nav';
import { Hero } from './sections/Hero';
import { Manifesto } from './sections/Manifesto';
import { Metrics } from './sections/Metrics';
import { Work } from './sections/Work';
import { Capabilities } from './sections/Capabilities';
import { OpenSource } from './sections/OpenSource';
import { Experience } from './sections/Experience';
import { IndexList } from './sections/IndexList';
import { OffClock } from './sections/OffClock';
import { Footer } from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [entered, setEntered] = useState(false);
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useLenis(!reduced);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Nav entered={entered} />
      <main>
        <Hero entered={entered} />
        <Manifesto />
        <Metrics />
        <Work />
        <Capabilities />
        <OpenSource />
        <Experience />
        <IndexList />
        <OffClock />
        <Footer />
      </main>
    </>
  );
}
