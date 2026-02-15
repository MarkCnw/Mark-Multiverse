'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface StarWarpProps {
  speed?: number;
  starCount?: number;
}

export default function StarWarp({ speed = 2, starCount = 6000 }: StarWarpProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const speedRef = useRef(speed); // ใช้ Ref เก็บความเร็วเพื่อความลื่นไหล

  // อัปเดตความเร็วเข้า Ref เมื่อ Prop เปลี่ยน
  useEffect(() => { speedRef.current = speed; }, [speed]);

  useEffect(() => {
    if (!mountRef.current) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 1; camera.rotation.x = Math.PI / 2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const starGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = Math.random() * 600 - 300;
      positions[i * 3 + 1] = Math.random() * 600 - 300;
      positions[i * 3 + 2] = Math.random() * 600 - 300;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const starMaterial = new THREE.PointsMaterial({ color: 0xaaaaaa, size: 0.7, transparent: true, opacity: 0.8 });
    const stars = new THREE.Points(starGeo, starMaterial);
    scene.add(stars);

    let animationId: number;
    const animate = () => {
      const pos = stars.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < starCount; i++) {
        pos[i * 3 + 1] -= speedRef.current; // ใช้ความเร็วจาก Ref
        if (pos[i * 3 + 1] < -200) pos[i * 3 + 1] = 200;
      }
      stars.geometry.attributes.position.needsUpdate = true;
      stars.rotation.y += 0.002;
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
      starGeo.dispose(); starMaterial.dispose(); renderer.dispose();
    };
  }, [starCount]); // รันแค่รอบเดียวตอน Mount

  return <div ref={mountRef} className="fixed inset-0 z-0 bg-black" />;
}