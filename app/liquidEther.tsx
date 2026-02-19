'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';

interface LiquidEtherProps {
  mouseForce?: number;
  cursorSize?: number;
  isViscous?: boolean;
  viscous?: number;
  iterationsViscous?: number;
  iterationsPoisson?: number;
  dt?: number;
  BFECC?: boolean;
  resolution?: number;
  isBounce?: boolean;
  colors?: string[];
  style?: React.CSSProperties;
  className?: string;
  autoDemo?: boolean;
  autoSpeed?: number;
  autoIntensity?: number;
  takeoverDuration?: number;
  autoResumeDelay?: number;
  autoRampDuration?: number;
}

interface WebGLManagerProps {
  $wrapper: HTMLElement;
  autoDemo: boolean;
  autoSpeed: number;
  autoIntensity: number;
  takeoverDuration: number;
  autoResumeDelay: number;
  autoRampDuration: number;
}

const defaultColors = ['#5227FF', '#FF9FFC', '#B19EEF'];

// Common class (renderer setup)
class CommonClass {
  width = 0;
  height = 0;
  aspect = 1;
  pixelRatio = 1;
  container: HTMLElement | null = null;
  renderer: THREE.WebGLRenderer | null = null;
  clock: THREE.Clock | null = null;

  init(container: HTMLElement) {
    this.container = container;
    this.pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    this.resize();
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.autoClear = false;
    this.renderer.setClearColor(new THREE.Color(0x000000), 0);
    this.renderer.setPixelRatio(this.pixelRatio);
    this.renderer.setSize(this.width, this.height);
    const el = this.renderer.domElement;
    el.style.width = '100%';
    el.style.height = '100%';
    el.style.display = 'block';
    this.clock = new THREE.Clock();
    this.clock.start();
  }

  resize() {
    if (!this.container) return;
    const rect = this.container.getBoundingClientRect();
    this.width = Math.max(1, Math.floor(rect.width));
    this.height = Math.max(1, Math.floor(rect.height));
    this.aspect = this.width / this.height;
    if (this.renderer) this.renderer.setSize(this.width, this.height, false);
  }

  update() {
    if (!this.clock) return;
    const delta = this.clock.getDelta();
  }
}

// Simplified Mouse class
class MouseClass {
  coords = new THREE.Vector2();
  coords_old = new THREE.Vector2();
  diff = new THREE.Vector2();
  container: HTMLElement | null = null;

  init(container: HTMLElement) {
    this.container = container;
    container.addEventListener('mousemove', this.onMouseMove.bind(this));
    container.addEventListener('touchmove', this.onTouchMove.bind(this), { passive: true });
  }

  onMouseMove(event: MouseEvent) {
    if (!this.container) return;
    const rect = this.container.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    this.coords.set(x * 2 - 1, -(y * 2 - 1));
  }

  onTouchMove(event: TouchEvent) {
    if (!event.touches.length || !this.container) return;
    const touch = event.touches[0];
    const rect = this.container.getBoundingClientRect();
    const x = (touch.clientX - rect.left) / rect.width;
    const y = (touch.clientY - rect.top) / rect.height;
    this.coords.set(x * 2 - 1, -(y * 2 - 1));
  }

  update() {
    this.diff.subVectors(this.coords, this.coords_old);
    this.coords_old.copy(this.coords);
  }
}

// Simplified fluid simulation shaders (GLSL)
const face_vert = `
  attribute vec3 position;
  varying vec2 uv;
  void main() {
    uv = 0.5 + position.xy * 0.5;
    gl_Position = vec4(position, 1.0);
  }
`;

const fluid_frag = `
  precision highp float;
  uniform sampler2D velocity;
  uniform vec2 mouse;
  uniform float time;
  varying vec2 uv;
  void main() {
    vec2 vel = texture2D(velocity, uv).xy;
    vec2 dir = mouse - uv;
    float dist = length(dir);
    vec2 force = normalize(dir) * (1.0 / (1.0 + dist * 10.0));
    vec2 newVel = vel + force * 0.1;
    gl_FragColor = vec4(newVel * 0.95, 0.0, 1.0);
  }
`;

// WebGL Manager
class WebGLManager {
  props: WebGLManagerProps;
  common: CommonClass;
  mouse: MouseClass;
  scene: THREE.Scene;
  camera: THREE.Camera;
  mesh: THREE.Mesh;
  material: THREE.RawShaderMaterial;
  running = false;
  rafRef: React.MutableRefObject<number | null>;

  constructor(props: WebGLManagerProps, rafRef: React.MutableRefObject<number | null>) {
    this.props = props;
    this.rafRef = rafRef;
    this.common = new CommonClass();
    this.mouse = new MouseClass();
    this.common.init(props.$wrapper);
    this.mouse.init(props.$wrapper);
    
    // Scene setup
    this.scene = new THREE.Scene();
    this.camera = new THREE.Camera();
    
    this.material = new THREE.RawShaderMaterial({
      vertexShader: face_vert,
      fragmentShader: fluid_frag,
      transparent: true,
      uniforms: {
        velocity: { value: new THREE.Texture() },
        mouse: { value: new THREE.Vector2() },
        time: { value: 0 }
      }
    });
    
    const geometry = new THREE.PlaneGeometry(2, 2);
    this.mesh = new THREE.Mesh(geometry, this.material);
    this.scene.add(this.mesh);
  }

  resize() {
    this.common.resize();
  }

  render() {
    this.mouse.update();
    this.material.uniforms.mouse.value.copy(this.mouse.coords);
    this.material.uniforms.time.value += 0.016;
    
    if (this.common.renderer) {
      this.common.renderer.setRenderTarget(null);
      this.common.renderer.render(this.scene, this.camera);
    }
  }

  loop = (): void => {
    if (!this.running) return;
    this.render();
    this.rafRef.current = requestAnimationFrame(this.loop);
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.loop();
  }

  pause() {
    this.running = false;
    if (this.rafRef.current) {
      cancelAnimationFrame(this.rafRef.current);
      this.rafRef.current = null;
    }
  }

  dispose() {
    this.pause();
    if (this.common.renderer) {
      const canvas = this.common.renderer.domElement;
      if (canvas && canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
      this.common.renderer.dispose();
    }
  }
}

export default function LiquidEther({
  mouseForce = 20,
  cursorSize = 100,
  isViscous = false,
  viscous = 30,
  iterationsViscous = 32,
  iterationsPoisson = 32,
  dt = 0.014,
  BFECC = true,
  resolution = 0.5,
  isBounce = false,
  colors = defaultColors,
  style = {},
  className = '',
  autoDemo = true,
  autoSpeed = 0.5,
  autoIntensity = 2.2,
  takeoverDuration = 0.25,
  autoResumeDelay = 1000,
  autoRampDuration = 0.6
}: LiquidEtherProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const webglRef = useRef<WebGLManager | null>(null);
  const rafRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  // ✅ Next.js 13+ 'use client' compatible WebGL fluid simulation
  useEffect(() => {
    if (!mountRef.current) return;

    // ✅ Lazy initialization to prevent hydration issues
    const initWebGL = () => {
      if (typeof window === 'undefined') return;

      const container = mountRef.current;
      if (!container) return;
      container.style.position = 'relative';
      container.style.overflow = 'hidden';

      const webgl = new WebGLManager({
        $wrapper: container,
        autoDemo,
        autoSpeed,
        autoIntensity,
        takeoverDuration,
        autoResumeDelay,
        autoRampDuration
      }, rafRef);

      webglRef.current = webgl;
      webgl.start();

      // Cleanup
      return () => {
        webgl.dispose();
        webglRef.current = null;
      };
    };

    // ✅ Client-side only execution
    const timeoutId = setTimeout(initWebGL, 0);
    
    return () => {
      clearTimeout(timeoutId);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (webglRef.current) {
        webglRef.current.dispose();
      }
    };
  }, [autoDemo, autoSpeed, autoIntensity, takeoverDuration, autoResumeDelay, autoRampDuration]);

  // ✅ Intersection Observer for performance
  useEffect(() => {
    if (!mountRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (webglRef.current) {
          if (entry.isIntersecting) {
            webglRef.current.start();
          } else {
            webglRef.current.pause();
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(mountRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={mountRef}
      className={`w-full h-[500px] lg:h-screen relative overflow-hidden ${className}`}
      style={style}
    />
      
  
  );
}
