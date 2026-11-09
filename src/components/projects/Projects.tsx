import { useCallback, useState } from 'react';
import { projects } from '../../data/projects';
import { Section, SectionHeader } from '../layout/Section';
import { Dialog } from '../ui/Dialog';
import { AivoraEcosystem } from './AivoraEcosystem';
import { AppDetail, ProjectDetail } from './ProjectDetail';
import { ProjectIndex } from './ProjectIndex';
import styles from './Projects.module.css';

export function Projects() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [appIdx, setAppIdx] = useState<number | null>(null);
  const aivora = projects[0];
  const rest = projects.slice(1);

  const openProject = useCallback((num: string) => setOpenIdx(projects.findIndex((p) => p.num === num)), []);
  const close = useCallback(() => setOpenIdx(null), []);
  const closeApp = useCallback(() => setAppIdx(null), []);

  const step = (d: number) => setOpenIdx((i) => (i === null ? i : (i + d + projects.length) % projects.length));
  const current = openIdx !== null ? projects[openIdx] : null;
  const prev = openIdx !== null ? projects[(openIdx - 1 + projects.length) % projects.length] : null;
  const next = openIdx !== null ? projects[(openIdx + 1) % projects.length] : null;
  const apps = aivora.apps!;

  return (
    <Section id="projects" className={styles.section}>
      <SectionHeader
        id="projects"
        layout="wide"
        aside={
          <p>
            <span className="t-mono">4.1 — 4.20</span>
            <br />
            {aivora.positioning}
          </p>
        }
      />

      <AivoraEcosystem project={aivora} onOpenProject={() => openProject('4.1')} onOpenApp={setAppIdx} />

      <ProjectIndex projects={rest} onOpen={(p) => openProject(p.num)} />

      <Dialog
        open={current !== null}
        onClose={close}
        label={current ? `Project ${current.num} ${current.name}` : 'Project'}
        scrollKey={current?.num}
        toolbar={
          current && (
            <span className="t-mono">
              <span style={{ color: 'var(--c-accent)' }}>{current.num}</span> &nbsp;/&nbsp; {current.name}
            </span>
          )
        }
      >
        {current && (
          <ProjectDetail
            project={current}
            onPrev={() => step(-1)}
            onNext={() => step(1)}
            prevName={prev?.name}
            nextName={next?.name}
            onOpenApp={setAppIdx}
          />
        )}
      </Dialog>

      <Dialog
        open={appIdx !== null}
        onClose={closeApp}
        variant="drawer"
        label={appIdx !== null ? `${apps[appIdx].name} — ${apps[appIdx].subtitle}` : 'Application'}
        scrollKey={appIdx !== null ? apps[appIdx].name : undefined}
        toolbar={
          appIdx !== null && (
            <div className={styles.appTabs} role="tablist" aria-label="AIVORA applications">
              {apps.map((a, i) => (
                <button
                  key={a.name}
                  type="button"
                  role="tab"
                  aria-selected={i === appIdx}
                  className={styles.appTab}
                  onClick={() => setAppIdx(i)}
                  title={a.name}
                >
                  {a.no}
                </button>
              ))}
            </div>
          )
        }
      >
        {appIdx !== null && <AppDetail app={apps[appIdx]} />}
      </Dialog>
    </Section>
  );
}
