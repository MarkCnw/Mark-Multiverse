'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface StarWarpProps {
  speed?: number;        // ควบคุมความเร็วจากภายนอก
  starCount?: number;    // จำนวนดาว
  starColor?: number;    // สีดาว
}

export default function StarWarp({ 
  speed = 2, 
  starCount = 6000, 
  starColor = 0xaaaaaa 
}: StarWarpProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // 1. Setup Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.001);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 1;
    camera.rotation.x = Math.PI / 2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // 2. Create Stars
    const starGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = Math.random() * 600 - 300;     // x
      positions[i * 3 + 1] = Math.random() * 600 - 300; // y (แกนที่วิ่ง)
      positions[i * 3 + 2] = Math.random() * 600 - 300; // z
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const starMaterial = new THREE.PointsMaterial({
      color: starColor,
      size: 0.7,
      transparent: true,
      opacity: 0.8,
    });

    const stars = new THREE.Points(starGeo, starMaterial);
    scene.add(stars);

    // 3. Animation Loop
    let animationId: number;
    const animate = () => {
      const positions = stars.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < starCount; i++) {
        // ขยับดาว
        positions[i * 3 + 1] -= speed; 
        
        // Loop ดาวกลับไปที่จุดเริ่มต้น
        if (positions[i * 3 + 1] < -200) {
          positions[i * 3 + 1] = 200;
        }
      }
      
      stars.geometry.attributes.position.needsUpdate = true;
      stars.rotation.y += 0.002; 

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // 4. Handle Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      starGeo.dispose();
      starMaterial.dispose();
      renderer.dispose();
    };
  }, [speed, starCount, starColor]); 

  return <div ref={mountRef} className="fixed inset-0 z-0 bg-black" />;
}