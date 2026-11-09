import { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import { Preloader } from './components/layout/Preloader';
import { Navigation } from './components/layout/Navigation';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/hero/Hero';
import { ProfessionalProfile } from './components/sections/ProfessionalProfile';
import { Education } from './components/sections/Education';
import { TechnicalSkills } from './components/sections/TechnicalSkills';
import { Projects } from './components/projects/Projects';
import { Research } from './components/sections/Research';
import { Ventures } from './components/sections/Ventures';
import { Experience } from './components/sections/Experience';
import { Certifications } from './components/sections/Certifications';
import { Achievements } from './components/sections/Achievements';
import { Leadership } from './components/sections/Leadership';
import { CoreStrengths } from './components/sections/CoreStrengths';
import { Languages } from './components/sections/Languages';
import { Interests } from './components/sections/Interests';
import { Contact } from './components/sections/Contact';
import { References } from './components/sections/References';
import { getLenis, initSmoothScroll, setLoadingLock, ScrollTrigger } from './lib/motion';
import { useReducedMotion } from './hooks/useReducedMotion';
import { hasWebGL } from './lib/webgl';

import { Gallery } from './components/gallery/Gallery';

const BackgroundScene = lazy(() => import('./components/three/BackgroundScene'));

export default function App() {
  useReducedMotion();
  const [started, setStarted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [webgl] = useState(hasWebGL);

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    initSmoothScroll();
    setLoadingLock(true);
  }, []);

  const onExit = useCallback(() => setStarted(true), []);
  const onDone = useCallback(() => {
    setLoaded(true);
    document.body.classList.remove('is-loading');
    setLoadingLock(false);
    getLenis()?.resize();
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, []);

  return (
    <>
      <Preloader onExit={onExit} onDone={onDone} />
      <Navigation visible={started} />
      {webgl && (
        <Suspense fallback={null}>
          <BackgroundScene active={loaded} />
        </Suspense>
      )}
      <div className="bg-fallback" aria-hidden="true" data-webgl={webgl || undefined} />

      <main id="main" tabIndex={-1}>
        <Hero started={started} />
        <ProfessionalProfile />
        <Education />
        <TechnicalSkills />
        <Projects />
        <Research />
        <Ventures />
        <Experience />
        <Certifications />
        <Achievements />
        <Leadership />
        <CoreStrengths />
        <Languages />
        <Interests />
        <Gallery />
        <References />
        <Contact />
      </main>
      <Footer />
      <div className="grain" aria-hidden="true" />
    </>
  );
}
