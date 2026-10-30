// The site's spine: one THREE.Points draw call that morphs between specimens.
// No allocation in the frame loop; renders only while something moves.
import {
  BufferAttribute, BufferGeometry, Color, PerspectiveCamera, Points, Scene,
  ShaderMaterial, AdditiveBlending, NormalBlending, Vector3, WebGLRenderer,
} from 'three';
import { specimen, type Shape } from './specimens';

const vert = /* glsl */ `
attribute vec4 aFrom;
attribute vec4 aTo;
attribute vec4 aSeed;
uniform float uTime, uMorph, uSize, uVel, uAttract, uSpin;
uniform vec3 uMouse, uOffset;
varying float vTone, vAlpha;

vec3 rotY(vec3 p, float a) { float c = cos(a), s = sin(a); return vec3(c*p.x + s*p.z, p.y, -s*p.x + c*p.z); }

void main() {
  // staggered per-particle morph so shapes dissolve and resolve, not slide
  float m = clamp(uMorph * 1.6 - aSeed.x * 0.6, 0.0, 1.0);
  m = m * m * (3.0 - 2.0 * m);
  vec3 p = mix(aFrom.xyz, aTo.xyz, m);
  vTone = mix(aFrom.w, aTo.w, step(0.5, m));

  float t = uTime * 0.35 + aSeed.y * 6.2831;
  float turb = 0.018 + 0.55 * sin(m * 3.14159) + abs(uVel) * 0.12;
  p += turb * vec3(sin(t + p.y * 1.7), cos(t * 1.1 + p.z * 1.3), sin(t * 0.9 + p.x * 1.5)) * (0.4 + aSeed.z);
  p = rotY(p, uSpin) + uOffset;

  // cursor gathers nearby points (the hero's "resolve" gesture)
  vec3 d = uMouse - p;
  float l = length(d.xy);
  p.xy += d.xy * smoothstep(1.6, 0.0, l) * uAttract * (0.3 + aSeed.w * 0.7);
  p.y -= uVel * aSeed.w * 0.35;

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  float big = vTone > 1.5 ? 1.35 : vTone > 0.5 ? 1.7 : 1.0;
  gl_PointSize = min(uSize * big * (0.55 + aSeed.z * 0.9) / -mv.z, 6.0 * uSize / 15.0);
  vAlpha = 1.0 - smoothstep(4.0, 16.0, -mv.z);
}`;

const frag = /* glsl */ `
precision mediump float;
uniform vec3 uGreen, uRed, uBone;
uniform float uGain, uLight;
varying float vTone, vAlpha;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float r = dot(c, c);
  if (r > 0.25) discard;
  float k = smoothstep(0.25, 0.0, r) * vAlpha * uGain;
  vec3 col = vTone > 1.5 ? uBone : vTone > 0.5 ? uRed : uGreen;
  // dark: additive glow (alpha 1). light: ordinary alpha, since adding light to ivory washes out
  gl_FragColor = uLight > 0.5 ? vec4(col, k) : vec4(col * k, 1.0);
}`;

export interface Field {
  setShape(s: Shape, offsetX?: number): void;
  setMouse(x: number, y: number): void;
  setVelocity(v: number): void;
  setAttract(a: number): void;
  setProgress(p: number): void;
  setTheme(light: boolean): void;
  setVisible(v: boolean): void;
}

/** still: one frame per change, no time or cursor motion (reduced motion, poster capture). light: ink points on ivory instead of additive glow on black. */
export function createField(canvas: HTMLCanvasElement, opts: { count: number; dpr: number; still?: boolean; light?: boolean }): Field {
  const n = opts.count;
  const renderer = new WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance', preserveDrawingBuffer: !!opts.still });
  renderer.setPixelRatio(opts.dpr);
  const scene = new Scene();
  const camera = new PerspectiveCamera(40, 1, 0.1, 50);
  camera.position.set(0, 0, 8.5);

  const geo = new BufferGeometry();
  const from = new Float32Array(specimen('noise', n));
  const to = new Float32Array(from);
  const seed = new Float32Array(n * 4);
  for (let i = 0; i < seed.length; i++) seed[i] = Math.random();
  const aFrom = new BufferAttribute(from, 4), aTo = new BufferAttribute(to, 4);
  geo.setAttribute('aFrom', aFrom);
  geo.setAttribute('aTo', aTo);
  geo.setAttribute('aSeed', new BufferAttribute(seed, 4));
  // three derives the draw count from `position`; alias it to aFrom (the shader ignores it)
  geo.setAttribute('position', aFrom);
  geo.setDrawRange(0, n);

  const uniforms = {
    uTime: { value: 0 }, uMorph: { value: 1 }, uVel: { value: 0 }, uAttract: { value: 0 },
    uSpin: { value: 0 }, uSize: { value: 15 * opts.dpr * Math.sqrt(140000 / n) },
    uMouse: { value: new Vector3(99, 99, 0) }, uOffset: { value: new Vector3() },
    uGreen: { value: new Color() }, uRed: { value: new Color() }, uBone: { value: new Color() },
    uGain: { value: 0.8 }, uLight: { value: 0 },
  };
  const mat = new ShaderMaterial({
    vertexShader: vert, fragmentShader: frag, uniforms,
    transparent: true, depthWrite: false, depthTest: false,
  });
  const theme = (light: boolean) => {
    uniforms.uLight.value = +light;
    uniforms.uGain.value = light ? 0.9 : n > 80000 ? 0.5 : 0.8;
    uniforms.uGreen.value.set(light ? '#0b6e4f' : '#2fc795');
    uniforms.uRed.value.set(light ? '#d7381f' : '#e8344c');
    uniforms.uBone.value.set(light ? '#10201a' : '#f1eadb');
    mat.blending = light ? NormalBlending : AdditiveBlending;
  };
  theme(!!opts.light);
  const pts = new Points(geo, mat);
  pts.frustumCulled = false;
  scene.add(pts);

  // targets the frame loop eases toward
  const target = { offset: 0, attract: 0, mouse: new Vector3(99, 99, 0), progress: 0 };
  let morphing = false, morphStart = 0, vel = 0, raf = 0, last = performance.now(), visible = true, inView = true, idleFrames = 0;
  const mouseNdc = { x: 0, y: 0, set: false, at: 0 };

  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    // keep shapes framed on portrait screens
    camera.position.z = w < h ? 8.5 * Math.min(1.6, h / w * 0.9) : 8.5;
    wake();
  }

  function frame(now: number) {
    raf = 0;
    const dt = opts.still ? 0 : Math.min(0.05, (now - last) / 1000);
    last = now;
    const u = uniforms;
    u.uTime.value += dt;
    if (morphing) {
      // wall-clock, so the morph finishes on time even when frames are throttled
      u.uMorph.value = Math.min(1, (now - morphStart) / 1800);
      if (u.uMorph.value >= 1) morphing = false;
    }
    vel *= 0.92;
    u.uVel.value += (vel - u.uVel.value) * 0.1;
    u.uAttract.value += (target.attract - u.uAttract.value) * 0.06;
    u.uOffset.value.x += (target.offset - u.uOffset.value.x) * 0.05;
    u.uSpin.value += dt * 0.045 + u.uVel.value * dt * 0.6;
    if (mouseNdc.set) {
      // project cursor onto the z=0 plane
      const h = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
      target.mouse.set(mouseNdc.x * h * camera.aspect, mouseNdc.y * h, 0);
    }
    u.uMouse.value.lerp(target.mouse, 0.12);
    camera.position.y += (-target.progress * 0.6 - camera.position.y) * 0.05;
    camera.lookAt(0, camera.position.y * 0.6, 0);
    renderer.render(scene, camera);
    if (opts.still) return;
    // the field always breathes, but drop to ~20fps when nothing is happening
    const busy = morphing || Math.abs(u.uVel.value) > 0.01 || now - mouseNdc.at < 1200;
    idleFrames = busy ? 0 : idleFrames + 1;
    if (visible) {
      if (idleFrames > 60) setTimeout(wake, 50);
      else raf = requestAnimationFrame(frame);
    }
  }

  function wake() {
    if (!raf && visible) { last = performance.now(); raf = requestAnimationFrame(frame); }
  }

  let current: Shape = 'noise';
  const field: Field = {
    setShape(s, offsetX = 0) {
      target.offset = offsetX;
      if (opts.still) uniforms.uOffset.value.x = offsetX;
      if (s === current) return wake();
      current = s;
      // bake the in-flight blend into aFrom so switching mid-morph never jumps
      const m0 = uniforms.uMorph.value;
      for (let i = 0; i < n; i++) {
        let m = Math.min(1, Math.max(0, m0 * 1.6 - seed[i * 4] * 0.6));
        m = m * m * (3 - 2 * m);
        const k = i * 4;
        from[k] += (to[k] - from[k]) * m;
        from[k + 1] += (to[k + 1] - from[k + 1]) * m;
        from[k + 2] += (to[k + 2] - from[k + 2]) * m;
        from[k + 3] = m >= 0.5 ? to[k + 3] : from[k + 3];
      }
      to.set(specimen(s, n));
      aFrom.needsUpdate = true;
      aTo.needsUpdate = true;
      uniforms.uMorph.value = opts.still ? 1 : 0;
      morphing = !opts.still;
      morphStart = performance.now();
      wake();
    },
    setMouse(x, y) {
      if (opts.still) return;
      mouseNdc.x = x; mouseNdc.y = -y; mouseNdc.set = true; mouseNdc.at = performance.now(); wake(); },
    setVelocity(v) { vel = v; wake(); },
    setAttract(a) { target.attract = a; wake(); },
    setProgress(p) { target.progress = p; wake(); },
    setTheme(light) { theme(light); wake(); },
    // off-screen (phones park the field at the top of the page): stop drawing
    setVisible(v) { inView = v; visible = v && !document.hidden; wake(); },
  };

  const onVis = () => { visible = inView && !document.hidden; wake(); };
  document.addEventListener('visibilitychange', onVis);
  // follow the canvas box, not the viewport
  new ResizeObserver(resize).observe(canvas);
  resize();
  return field;
}
