import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollState } from '../lib/scrollState';

/** World length of the camera dolly path. */
export const PATH_LENGTH = 200;
const SPAN = PATH_LENGTH + 80;

/* Theme palettes lerped by scrollState.themeMix (1 = dark, 0 = light). */
export const palette = {
  bgDark: new THREE.Color('#000000'),
  bgLight: new THREE.Color('#f3f1ec'),
  accentDark: new THREE.Color('#e3b258'),
  accentLight: new THREE.Color('#0e7c8c'),
  lineDark: new THREE.Color('#4a3f28'),
  lineLight: new THREE.Color('#8a8f93'),
};

export function lerpTheme(out: THREE.Color, light: THREE.Color, dark: THREE.Color) {
  return out.copy(light).lerp(dark, scrollState.themeMix);
}

/* ------------------------------------------------------------------ */
/* Speed lines: instanced diagonal streaks that stretch with velocity  */
/* ------------------------------------------------------------------ */

export function SpeedLines({ count }: { count: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const mat = useRef<THREE.MeshBasicMaterial>(null);

  const data = useMemo(() => {
    const arr: { x: number; y: number; z: number; len: number; quat: THREE.Quaternion }[] = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 5 + Math.random() * 12;
      const e = new THREE.Euler(0.16 + Math.random() * 0.1, (Math.random() - 0.5) * 0.2, 0);
      arr.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius * 0.7,
        z: 20 - Math.random() * SPAN,
        len: 0.6 + Math.random() * 1.8,
        quat: new THREE.Quaternion().setFromEuler(e),
      });
    }
    return arr;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ camera }) => {
    const m = mesh.current;
    if (!m) return;
    const camZ = camera.position.z;
    const vel = Math.abs(scrollState.velocity);
    const stretch = 1 + Math.min(vel * 10, 12);
    for (let i = 0; i < data.length; i++) {
      const d = data[i];
      if (d.z > camZ + 16) d.z -= SPAN;
      if (d.z < camZ - SPAN + 16) d.z += SPAN;
      dummy.position.set(d.x, d.y, d.z);
      dummy.quaternion.copy(d.quat);
      dummy.scale.set(1, 1, d.len * stretch);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    }
    m.instanceMatrix.needsUpdate = true;
    if (mat.current) {
      lerpTheme(mat.current.color, palette.lineLight, palette.lineDark);
      mat.current.opacity = 0.4 + Math.min(vel, 0.5);
    }
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]} frustumCulled={false}>
      <boxGeometry args={[0.016, 0.016, 3]} />
      <meshBasicMaterial ref={mat} transparent opacity={0.45} />
    </instancedMesh>
  );
}

/* ------------------------------------------------------------- */
/* Metric particles: drifting data-points filling the corridor    */
/* ------------------------------------------------------------- */

export function MetricParticles({ count }: { count: number }) {
  const mat = useRef<THREE.PointsMaterial>(null);
  const group = useRef<THREE.Group>(null);

  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2.5 + Math.random() * 14;
      p[i * 3] = Math.cos(angle) * radius;
      p[i * 3 + 1] = Math.sin(angle) * radius * 0.75;
      p[i * 3 + 2] = 20 - Math.random() * SPAN;
    }
    return p;
  }, [count]);

  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.z = clock.elapsedTime * 0.012;
    if (mat.current) {
      lerpTheme(mat.current.color, palette.accentLight, palette.accentDark);
      const dark = scrollState.themeMix > 0.5;
      const blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending;
      if (mat.current.blending !== blending) {
        mat.current.blending = blending;
        mat.current.needsUpdate = true;
      }
      mat.current.opacity = 0.35 + scrollState.themeMix * 0.35;
    }
  });

  return (
    <group ref={group}>
      <points frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial ref={mat} size={0.055} sizeAttenuation transparent depthWrite={false} />
      </points>
    </group>
  );
}

/* --------------------------------------------------------------- */
/* Gates: faceted rings that spin, then lock as the camera arrives  */
/* --------------------------------------------------------------- */

const GATE_COUNT = 7;
const SNAP = Math.PI / 4;

export function Gates() {
  const gates = useMemo(
    () =>
      Array.from({ length: GATE_COUNT }, (_, i) => ({
        x: (i % 2 === 0 ? 1 : -1) * 1.4,
        z: -20 - i * ((PATH_LENGTH - 34) / (GATE_COUNT - 1)),
        dir: i % 2 === 0 ? 1 : -1,
      })),
    [],
  );

  return (
    <>
      {gates.map((g, i) => (
        <Gate key={i} x={g.x} z={g.z} dir={g.dir} />
      ))}
    </>
  );
}

function Gate({ x, z, dir }: { x: number; z: number; dir: number }) {
  const group = useRef<THREE.Group>(null);
  const outerMat = useRef<THREE.MeshBasicMaterial>(null);
  const innerMat = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(({ camera }, dt) => {
    const g = group.current;
    if (!g) return;
    const dist = Math.abs(z - camera.position.z);
    const near = 1 - Math.min(dist / 36, 1);

    // spin freely far away, decelerate and snap into place as we arrive
    if (near > 0.78) {
      const target = Math.round(g.rotation.z / SNAP) * SNAP;
      g.rotation.z += (target - g.rotation.z) * 0.1;
    } else {
      g.rotation.z += dt * dir * (0.5 * (1 - near) + 0.04);
    }

    const s = 0.9 + near * 0.1;
    g.scale.set(s, s, s);

    if (outerMat.current && innerMat.current) {
      lerpTheme(outerMat.current.color, palette.accentLight, palette.accentDark);
      lerpTheme(innerMat.current.color, palette.lineLight, palette.lineDark);
      outerMat.current.opacity = 0.1 + near * 0.85;
      innerMat.current.opacity = 0.08 + near * 0.5;
    }
  });

  return (
    <group ref={group} position={[x, 0.4, z]}>
      <mesh>
        <torusGeometry args={[4.4, 0.028, 6, 8]} />
        <meshBasicMaterial ref={outerMat} transparent />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 8]}>
        <torusGeometry args={[3.1, 0.014, 6, 48]} />
        <meshBasicMaterial ref={innerMat} transparent />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------- */
/* Energy core: pulsing centerpiece at hero + contact stops */
/* ------------------------------------------------------- */

export function EnergyCore({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const group = useRef<THREE.Group>(null);
  const wireMat = useRef<THREE.MeshBasicMaterial>(null);
  const coreMat = useRef<THREE.MeshStandardMaterial>(null);
  const light = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const g = group.current;
    if (!g) return;
    const vel = Math.min(Math.abs(scrollState.velocity), 1);
    const pulse = (1 + 0.05 * Math.sin(t * 1.7) + vel * 0.14) * scale;
    g.scale.set(pulse, pulse, pulse);
    g.rotation.y = t * 0.14;
    g.rotation.x = Math.sin(t * 0.23) * 0.25;

    if (wireMat.current) {
      lerpTheme(wireMat.current.color, palette.accentLight, palette.accentDark);
      // light mode needs a denser wireframe to read as ink, not haze
      wireMat.current.opacity = 0.55 - scrollState.themeMix * 0.17;
    }
    if (coreMat.current) {
      lerpTheme(coreMat.current.emissive, palette.accentLight, palette.accentDark);
      coreMat.current.emissiveIntensity = 0.35 + scrollState.themeMix * 0.55 + vel * 0.8;
    }
    if (light.current) {
      lerpTheme(light.current.color, palette.accentLight, palette.accentDark);
      light.current.intensity = 4 + Math.sin(t * 1.7) * 1.2 + vel * 6;
    }
  });

  return (
    <group ref={group} position={position}>
      <mesh>
        <icosahedronGeometry args={[2.3, 1]} />
        <meshBasicMaterial ref={wireMat} wireframe transparent />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.95, 2]} />
        <meshStandardMaterial ref={coreMat} color="#0c0f12" flatShading roughness={0.35} metalness={0.5} />
      </mesh>
      <pointLight ref={light} distance={34} decay={1.6} />
    </group>
  );
}
