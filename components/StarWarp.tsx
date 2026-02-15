'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface StarWarpProps {
  speed?: number;
  starCount?: number;
}

export default function StarWarp({ speed = 2, starCount = 6000 }: StarWarpProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const speedRef = useRef(speed);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // ป้องกัน mount ซ้ำ (React StrictMode)
    if (rendererRef.current) return;

    const w = window.innerWidth;
    const h = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 1, 1000);
    camera.position.z = 1;
    camera.rotation.x = Math.PI / 2;

    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 1);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // สร้างดาว
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      positions[i * 3]     = Math.random() * 600 - 300;
      positions[i * 3 + 1] = Math.random() * 600 - 300;
      positions[i * 3 + 2] = Math.random() * 600 - 300;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xcccccc,
      size: 0.7,
      transparent: true,
      opacity: 0.9,
    });

    const stars = new THREE.Points(geometry, material);
    scene.add(stars);

    // Animation loop
    const animate = () => {
      const pos = geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < starCount; i++) {
        pos[i * 3 + 1] -= speedRef.current;
        if (pos[i * 3 + 1] < -300) {
          pos[i * 3 + 1] = 300;
        }
      }

      geometry.attributes.position.needsUpdate = true;
      stars.rotation.y += 0.002;

      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      const newW = window.innerWidth;
      const newH = window.innerHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationRef.current);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      rendererRef.current = null;
    };
  }, [starCount]);

  // ❌ ลบ bg-black ออก เพราะ renderer.setClearColor จัดการเองแล้ว
  // ❌ ลบ fixed inset-0 ออก เพราะ parent div จัดการ layout แล้ว
  return <div ref={mountRef} className="w-full h-full" />;
}