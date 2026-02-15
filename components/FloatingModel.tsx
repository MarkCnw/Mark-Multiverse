'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface FloatingModelProps {
  scrollProgress: number;
}

export default function FloatingModel({ scrollProgress }: FloatingModelProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const shipRef = useRef<THREE.Group | null>(null);
  const scrollRef = useRef(scrollProgress);
  
  const animParts = useRef<{
    glows: THREE.Mesh[];
    afterburners: THREE.Mesh[];
    navLights: THREE.Mesh[];
  }>({ glows: [], afterburners: [], navLights: [] });

  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container || rendererRef.current) return;

    // 1. Setup Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 3, 8); 
    camera.lookAt(0, 0, -5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const ship = new THREE.Group();
    ship.rotation.x = 0.1;
    scene.add(ship);
    shipRef.current = ship;

    const meshGroup = new THREE.Group();
    meshGroup.rotation.y = Math.PI; 
    ship.add(meshGroup);

    // --- MATERIALS (ชุดเดิม) ---
    const matHull = new THREE.MeshStandardMaterial({ color: 0x708090, metalness: 0.6, roughness: 0.3 });
    const matDark = new THREE.MeshStandardMaterial({ color: 0x2f3542, metalness: 0.8, roughness: 0.5 });
    const matAccent = new THREE.MeshStandardMaterial({ color: 0x00bcd4, metalness: 0.5, roughness: 0.2, emissive: 0x00bcd4, emissiveIntensity: 0.2 });
    const matGlass = new THREE.MeshPhysicalMaterial({ color: 0x111111, metalness: 0.9, roughness: 0.1, transmission: 0.1, clearcoat: 1.0 });
    const matGlow = new THREE.MeshBasicMaterial({ color: 0x00ffff });
    const matRedLight = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const matGreenLight = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    // --- MODELING (ชุดเดิม ใส่ใน meshGroup) ---
    const bodyGeo = new THREE.CylinderGeometry(0.6, 0.4, 4.5, 8); bodyGeo.rotateX(Math.PI / 2); const body = new THREE.Mesh(bodyGeo, matHull); body.castShadow = true; body.receiveShadow = true; meshGroup.add(body);
    const noseGeo = new THREE.ConeGeometry(0.4, 1.5, 8); noseGeo.rotateX(Math.PI / 2); const nose = new THREE.Mesh(noseGeo, matHull); nose.position.z = 3; nose.castShadow = true; meshGroup.add(nose);
    const scoopGeo = new THREE.BoxGeometry(0.8, 0.4, 1.5); const scoop = new THREE.Mesh(scoopGeo, matDark); scoop.position.set(0, 0.5, -1); scoop.castShadow = true; meshGroup.add(scoop);
    const cockpitGeo = new THREE.CapsuleGeometry(0.35, 1.2, 4, 8); cockpitGeo.rotateX(Math.PI / 2); const cockpit = new THREE.Mesh(cockpitGeo, matGlass); cockpit.position.set(0, 0.35, 1.2); cockpit.scale.set(1, 0.7, 1); meshGroup.add(cockpit);

    const wingShape = new THREE.Shape(); wingShape.moveTo(0, 0); wingShape.lineTo(2.5, -1.5); wingShape.lineTo(2.5, -2.5); wingShape.lineTo(0, -1.0);
    const wingGeo = new THREE.ExtrudeGeometry(wingShape, { depth: 0.1, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05, bevelSegments: 2 }); wingGeo.rotateX(-Math.PI / 2);
    const wingR = new THREE.Mesh(wingGeo, matHull); wingR.position.set(0.4, -0.1, 0.5); wingR.castShadow = true; wingR.receiveShadow = true; meshGroup.add(wingR);
    const wingL = wingR.clone(); wingL.scale.x = -1; wingL.position.set(-0.4, -0.1, 0.5); meshGroup.add(wingL);

    const stripeGeo = new THREE.BoxGeometry(1.5, 0.05, 0.1); const stripeR = new THREE.Mesh(stripeGeo, matAccent); stripeR.position.set(1.5, 0.06, -0.5); stripeR.rotation.y = -0.5; wingR.add(stripeR);
    const stripeL = stripeR.clone(); stripeL.position.set(1.5, 0.06, -0.5); wingL.add(stripeL);

    const createEngine = (x: number) => {
        const engGroup = new THREE.Group();
        const engGeo = new THREE.CylinderGeometry(0.3, 0.4, 2, 12); engGeo.rotateX(Math.PI / 2); const eng = new THREE.Mesh(engGeo, matDark); eng.castShadow = true; engGroup.add(eng);
        const ringGeo = new THREE.TorusGeometry(0.25, 0.05, 8, 16); const ring = new THREE.Mesh(ringGeo, matGlow); ring.position.z = -1.05; engGroup.add(ring); animParts.current.glows.push(ring);
        const burnGeo = new THREE.ConeGeometry(0.2, 1.5, 8); burnGeo.rotateX(-Math.PI / 2); const burnMat = new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending }); const burn = new THREE.Mesh(burnGeo, burnMat); burn.position.z = -1.5; engGroup.add(burn); animParts.current.afterburners.push(burn);
        engGroup.position.set(x, 0.2, -1.5); return engGroup;
    };
    meshGroup.add(createEngine(0.8)); meshGroup.add(createEngine(-0.8));

    const tailGeo = new THREE.BoxGeometry(0.1, 1.2, 1); const tailL = new THREE.Mesh(tailGeo, matHull); tailL.position.set(-0.8, 0.8, -2); tailL.rotation.z = 0.3; tailL.castShadow = true; meshGroup.add(tailL);
    const tailR = tailL.clone(); tailR.position.set(0.8, 0.8, -2); tailR.rotation.z = -0.3; meshGroup.add(tailR);

    const navGeo = new THREE.SphereGeometry(0.05); const navL = new THREE.Mesh(navGeo, matRedLight); navL.position.set(2.8, 0, -1.5); wingL.add(navL); animParts.current.navLights.push(navL);
    const navR = new THREE.Mesh(navGeo, matGreenLight); navR.position.set(2.8, 0, -1.5); wingR.add(navR); animParts.current.navLights.push(navR);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 2); dirLight.position.set(5, 10, 5); dirLight.castShadow = true; dirLight.shadow.mapSize.width = 1024; dirLight.shadow.mapSize.height = 1024; scene.add(dirLight);
    const bottomLight = new THREE.PointLight(0x00ffff, 1, 10); bottomLight.position.set(0, -2, 0); scene.add(bottomLight);
    const engineLight = new THREE.PointLight(0x00ffff, 3, 8); engineLight.position.set(0, 0, -3); meshGroup.add(engineLight);

    // --- ANIMATION ---
    const clock = new THREE.Clock();
    let animationId: number;

    const animate = () => {
      const time = clock.getElapsedTime();
      const scroll = scrollRef.current;

      if (shipRef.current) {
        // Idle
        shipRef.current.position.y = Math.sin(time * 1.5) * 0.1;
        
        // Banking Logic (ปรับปรุงใหม่ให้เข้ากับ Page.tsx)
        // เมื่อ x เคลื่อนด้วย cos, ความเร็วจะเป็น -sin
        // ดังนั้นเราใช้ Math.sin เพื่อจับจังหวะการเอียง
        const bankFactor = Math.sin(scroll * Math.PI * 4); // เอาเครื่องหมายลบออก
        
        const targetRoll = bankFactor * 0.8;
        shipRef.current.rotation.z += (targetRoll - shipRef.current.rotation.z) * 0.1;

        const targetYaw = bankFactor * 0.2;
        shipRef.current.rotation.y += (targetYaw - shipRef.current.rotation.y) * 0.1;

        const targetPitch = Math.abs(bankFactor) * 0.1;
        shipRef.current.rotation.x = 0.1 + (targetPitch - shipRef.current.rotation.x) * 0.1;

        // Effects
        const pulse = 1 + Math.sin(time * 20) * 0.1 + scroll * 0.5;
        animParts.current.glows.forEach(g => g.scale.setScalar(pulse));
        
        const thrust = 1 + scroll * 3;
        animParts.current.afterburners.forEach(ab => {
            ab.scale.set(1, thrust, 1);
            ab.scale.x = 1 + Math.random() * 0.1;
            ab.scale.z = 1 + Math.random() * 0.1;
            (ab.material as THREE.MeshBasicMaterial).opacity = 0.5 + Math.random() * 0.3;
        });

        engineLight.intensity = 2 + Math.random() * 1 + scroll * 2;

        const blink = Math.sin(time * 5) > 0;
        animParts.current.navLights.forEach(nav => {
            (nav.material as THREE.MeshBasicMaterial).opacity = blink ? 1 : 0.2;
        });
      }

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
        if(!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      rendererRef.current = null;
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}