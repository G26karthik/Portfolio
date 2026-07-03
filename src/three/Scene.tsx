import { Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Grid } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import * as THREE from 'three';
import { scrollState } from '../lib/scrollState';
import { useTheme } from '../theme';
import type { PerfProfile } from '../hooks/usePerfTier';
import { EnergyCore, Gates, MetricParticles, PATH_LENGTH, SpeedLines, lerpTheme, palette } from './elements';

/** Scroll-scrubbed dolly: the camera travels forward through the corridor. */
function CameraRig({ frozen }: { frozen: boolean }) {
  const { camera } = useThree();
  const smooth = useRef({ z: 4, fov: 62 });

  useFrame(() => {
    if (frozen) return;
    const p = scrollState.progress;
    const vel = scrollState.velocity;
    const s = smooth.current;

    s.z += (4 - p * PATH_LENGTH - s.z) * 0.08;
    camera.position.z = s.z;
    camera.position.x += (Math.sin(p * Math.PI * 3) * 1.1 + scrollState.mouseX * 0.5 - camera.position.x) * 0.06;
    camera.position.y += (Math.cos(p * Math.PI * 2.2) * 0.5 - scrollState.mouseY * 0.35 - camera.position.y) * 0.06;
    camera.rotation.z += (Math.sin(p * Math.PI * 2) * 0.02 + vel * 0.03 - camera.rotation.z) * 0.08;

    const targetFov = 62 + Math.min(Math.abs(vel) * 26, 16);
    if (Math.abs(targetFov - s.fov) > 0.05) {
      s.fov += (targetFov - s.fov) * 0.1;
      (camera as THREE.PerspectiveCamera).fov = s.fov;
      (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
    }
  });

  return null;
}

/** Fog + clear color follow the theme tween every frame. */
function Atmosphere() {
  const { scene } = useThree();
  const fog = useRef<THREE.Fog | null>(null);

  useFrame(() => {
    if (!fog.current) {
      fog.current = new THREE.Fog('#000000', 9, 60);
      scene.fog = fog.current;
    }
    lerpTheme(fog.current.color, palette.bgLight, palette.bgDark);
  });

  return null;
}

export function Scene({ perf }: { perf: PerfProfile }) {
  const { theme } = useTheme();
  const frozen = perf.tier === 'static';

  return (
    <div className="webgl-stage" aria-hidden="true">
      <Canvas
        dpr={perf.dpr}
        frameloop={frozen ? 'demand' : 'always'}
        camera={{ fov: 62, near: 0.1, far: 130, position: [0, 0, 4] }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <CameraRig frozen={frozen} />
          <Atmosphere />
          <ambientLight intensity={0.35} />
          <SpeedLines count={perf.lines} />
          <MetricParticles count={perf.particles} />
          <Gates />
          {/* on small screens the core shifts up-right so hero copy stays clear */}
          <EnergyCore
            position={perf.tier === 'high' ? [0, 0.4, -7] : [1.5, 1.6, -8]}
            scale={perf.tier === 'high' ? 1 : 0.7}
          />
          <EnergyCore position={[0, 0.4, -PATH_LENGTH - 9]} scale={1.4} />
          <Grid
            key={`grid-${theme}`}
            position={[0, -4.2, 0]}
            infiniteGrid
            followCamera
            cellSize={1.4}
            sectionSize={7}
            fadeDistance={48}
            fadeStrength={2.5}
            cellThickness={0.5}
            sectionThickness={0.9}
            cellColor={theme === 'dark' ? '#1a1216' : '#d5d2c8'}
            sectionColor={theme === 'dark' ? '#33141f' : '#b3b0a4'}
          />
          {perf.tier === 'high' && theme === 'dark' && (
            <EffectComposer key={`fx-${theme}`}>
              <Bloom intensity={0.75} luminanceThreshold={0.25} mipmapBlur radius={0.7} />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
