'use client';

import * as THREE from 'three';
import { useEffect, useRef, type ReactNode } from 'react';

const TARGET_FPS = 30;
const FRAME_DURATION = 1000 / TARGET_FPS;

import vertexShader from './vertexShader.glsl';
import fragmentShader from './fragmentShader.glsl';

export interface LightBreezeProps {
  children?: ReactNode;
}

export const LightBreeze = ({ children }: LightBreezeProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    const dpr = Math.max(1, 0.5 * window.devicePixelRatio);
    renderer.setPixelRatio(dpr);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100vw';
    renderer.domElement.style.minHeight = 'screen';
    renderer.domElement.style.zIndex = '0';
    renderer.domElement.style.pointerEvents = 'none';
    container.appendChild(renderer.domElement);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthTest: false,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let frameId: number | undefined;
    let lastFrameTime = performance.now();
    let isActive = true;

    const handleVisibilityChange = () => {
      isActive = document.visibilityState === 'visible';
      if (isActive) {
        lastFrameTime = performance.now();
        animate(performance.now());
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const animate = (time: number) => {
      if (!isActive) return;
      const delta = time - lastFrameTime;
      if (delta >= FRAME_DURATION) {
        (material.uniforms as any).iTime.value = time * 0.001;
        renderer.render(scene, camera);
        lastFrameTime = time;
      }
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);

    const handleResize = () => {
      const dpr = Math.max(1, 0.5 * window.devicePixelRatio);
      renderer.setPixelRatio(dpr);
      renderer.setSize(window.innerWidth, window.innerHeight);
      (material.uniforms as any).iResolution.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (frameId !== undefined) cancelAnimationFrame(frameId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className='relative w-[100vw] min-h-screen'>
      <div ref={containerRef} className='fixed inset-0 top-0 left-0 pointer-events-none z-0' />
      <div className='relative flex flex-col'>{children}</div>
    </div>
  );
};
