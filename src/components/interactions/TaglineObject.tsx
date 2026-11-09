import { Suspense, lazy, useState } from 'react';
import { hasWebGL } from '../../lib/webgl';
import styles from './TaglineObject.module.css';

const GeodesicScene = lazy(() => import('../three/GeodesicScene'));

/** Cursor-interactive rotating object shown beside the portfolio tagline. */
export function TaglineObject() {
  const [webgl] = useState(hasWebGL);
  if (!webgl) return null;
  return (
    <div className={styles.root}>
      <Suspense fallback={null}>
        <GeodesicScene className={styles.scene} />
      </Suspense>
    </div>
  );
}
