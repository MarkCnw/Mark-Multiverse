'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface FloatingModelProps {
  scrollProgress: number;
}

export default function FloatingModel({ scrollProgress }: FloatingModelProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number>(0);
  const scrollRef = useRef(scrollProgress);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container || rendererRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const group = new THREE.Group();
    scene.add(group);

    // Outer wireframe
    const outerGeo = new THREE.IcosahedronGeometry(1.4, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    group.add(outerMesh);

    // Middle wireframe
    const midGeo = new THREE.IcosahedronGeometry(1.0, 1);
    const midMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const midMesh = new THREE.Mesh(midGeo, midMat);
    group.add(midMesh);

    // Inner solid core
    const innerGeo = new THREE.IcosahedronGeometry(0.5, 2);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.4,
      metalness: 0.9,
      roughness: 0.1,
      transparent: true,
      opacity: 0.6,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    group.add(innerMesh);

    // Particle ring
    const ringCount = 120;
    const ringPositions = new Float32Array(ringCount * 3);
    for (let i = 0; i < ringCount; i++) {
      const angle = (i / ringCount) * Math.PI * 2;
      const radius = 2.0 + (Math.random() - 0.5) * 0.3;
      ringPositions[i * 3] = Math.cos(angle) * radius;
      ringPositions[i * 3 + 1] = (Math.random() - 0.5) * 0.2;
      ringPositions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    const ringGeo = new THREE.BufferGeometry();
    ringGeo.setAttribute('position', new THREE.BufferAttribute(ringPositions, 3));
    const ringMat = new THREE.PointsMaterial({
      color: 0x06b6d4,
      size: 0.02,
      transparent: true,
      opacity: 0.5,
    });
    const ringPoints = new THREE.Points(ringGeo, ringMat);
    group.add(ringPoints);

    // Lights
    const pointLight = new THREE.PointLight(0x06b6d4, 2, 10);
    pointLight.position.set(2, 2, 3);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xa855f7, 1.5, 10);
    pointLight2.position.set(-2, -1, 2);
    scene.add(pointLight2);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const scroll = scrollRef.current;
      const mouse = mouseRef.current;

      outerMesh.rotation.x = elapsed * 0.1 + scroll * Math.PI * 2;
      outerMesh.rotation.y = elapsed * 0.15;

      midMesh.rotation.x = -elapsed * 0.12 + scroll * Math.PI;
      midMesh.rotation.y = -elapsed * 0.18;
      midMesh.rotation.z = elapsed * 0.08;

      innerMesh.rotation.x = elapsed * 0.3;
      innerMesh.rotation.y = elapsed * 0.4;

      ringPoints.rotation.y = elapsed * 0.05;
      ringPoints.rotation.x = Math.sin(elapsed * 0.1) * 0.1;

      const pulse = Math.sin(elapsed * 2) * 0.15 + 0.55;
      innerMat.opacity = pulse;
      innerMat.emissiveIntensity = 0.3 + Math.sin(elapsed * 1.5) * 0.15;

      group.rotation.x += (mouse.y * 0.3 - group.rotation.x) * 0.05;
      group.rotation.y += (mouse.x * 0.3 - group.rotation.y) * 0.05;

      const scale = 1 + Math.sin(elapsed * 0.5) * 0.05;
      group.scale.setScalar(scale);

      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationRef.current);
      outerGeo.dispose(); outerMat.dispose();
      midGeo.dispose(); midMat.dispose();
      innerGeo.dispose(); innerMat.dispose();
      ringGeo.dispose(); ringMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      rendererRef.current = null;
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}