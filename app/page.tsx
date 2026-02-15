'use client';
import Hyperspeed from '@/components/Hyperspeed';
import StarWarp from '@/components/StarWarp';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Github, Mail, Smartphone, Code, Layers, Award, User, ChevronDown, ExternalLink, Cpu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const MY_DATA = {
  name: "Mark", 
  fullName: "Mark Multiverse",
  oneLiner: "Junior Flutter Developer ที่หลงใหลในการสร้าง Mobile App และ AI Architecture",
  email: "contact@mark.dev",
  github: "https://github.com/MarkCnw",
  projects: [
    { title: "TrailGuide", desc: "แอปนำทางเดินป่าแบบ Offline P2P", stack: ["Flutter", "Clean Arch", "Isar DB"], link: "#", imageColor: "from-green-500/20 to-emerald-900/20" },
    { title: "CarboCare", desc: "Carbon Footprint Tracking + Tamagotchi Earth", stack: ["Flutter", "Rive", "Firebase"], link: "#", imageColor: "from-blue-500/20 to-cyan-900/20" },
    { title: "i-have-gpu", desc: "Web Application สำหรับคนรัก Hardware", stack: ["Next.js", "Tailwind", "TypeScript"], link: "https://github.com/MarkCnw/i-have-gpu", imageColor: "from-purple-500/20 to-indigo-900/20" }
  ],
  skills: {
    languages: ["Dart", "JavaScript/TypeScript", "Python"],
    frameworks: ["Flutter", "Next.js", "React"],
    tools: ["Git", "Firebase", "Figma"]
  }
};

const hsNormal = { speedUp: 0.5, movingAwaySpeed: [20, 30] as [number, number], colors: { roadColor: 0x080808, islandColor: 0x0a0a0a, background: 0x000000, shoulderLines: 0x00ffff, brokenLines: 0x00ffff, leftCars: [0xd856bf, 0x6750a2], rightCars: [0x03b3c3, 0x0e5ea5], sticks: 0x03b3c3 }, distortion: 'turbulentDistortion', length: 400, roadWidth: 10, islandWidth: 2, lanesPerRoad: 3, fov: 90, fovSpeedUp: 150, carLightsFade: 0.4, totalSideLightSticks: 20, lightPairsPerRoadWay: 40, shoulderLinesWidthPercentage: 0.05, brokenLinesWidthPercentage: 0.1, brokenLinesLengthPercentage: 0.5, lightStickWidth: [0.12, 0.5] as [number, number], lightStickHeight: [1.3, 1.7] as [number, number], movingCloserSpeed: [-20, -30] as [number, number], carLightsLength: [12, 80] as [number, number], carLightsRadius: [0.05, 0.14] as [number, number], carWidthPercentage: [0.3, 0.5] as [number, number], carShiftX: [-0.8, 0.8] as [number, number], carFloorSeparation: [0, 5] as [number, number] };
const hsWarp = { ...hsNormal, speedUp: 50, fov: 120, movingAwaySpeed: [200, 300] as [number, number], movingCloserSpeed: [-300, -500] as [number, number] };

export default function Home() {
  const [viewState, setViewState] = useState<'intro' | 'warping' | 'content'>('intro');
  const [hsPreset, setHsPreset] = useState(hsNormal);

  const handleWarp = () => {
    setViewState('warping'); setHsPreset(hsWarp);
    setTimeout(() => {
      setViewState('content');
      if (typeof window !== 'undefined') window.scrollTo(0, 0);
    }, 1500);
  };

  return (
    <main className="relative w-full min-h-screen bg-black font-sans text-white overflow-x-hidden">
      {/* Background Switcher */}
      <div className={`fixed inset-0 z-0 transition-opacity duration-1000 ${viewState === 'content' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
         {viewState !== 'content' && <Hyperspeed effectOptions={hsPreset} />}
      </div>
      <div className={`fixed inset-0 z-0 transition-opacity duration-1000 ${viewState === 'content' ? 'opacity-100' : 'opacity-0'}`}>
         {viewState === 'content' && <StarWarp speed={0.5} starCount={7000} />}
      </div>

      <AnimatePresence>
        {viewState === 'warping' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 1.5, times: [0, 0.6, 0.9, 1] }} className="fixed inset-0 z-50 bg-white pointer-events-none" />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {viewState === 'intro' ? (
          <motion.div key="intro" exit={{ opacity: 0, scale: 2, filter: 'blur(20px)' }} className="relative z-10 w-full h-screen flex flex-col items-center justify-center p-4">
             <div className="text-center space-y-6">
                <span className="px-3 py-1 text-xs font-bold tracking-[0.3em] text-cyan-400 border border-cyan-500/30 rounded-full bg-black/50 backdrop-blur-md uppercase animate-pulse">System Ready</span>
                <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-purple-900">MARK</h1>
                <div className="pt-8">
                  <button onClick={handleWarp} className="group flex items-center gap-3 px-10 py-5 bg-white text-black rounded-full font-bold text-lg hover:bg-cyan-400 transition-all">
                    GET STARTED <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
             </div>
          </motion.div>
        ) : viewState === 'content' && (
          <motion.div key="content" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="relative z-10 w-full">
            <section className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
              <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 p-1 mb-8 shadow-[0_0_50px_rgba(6,182,212,0.4)]"><div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center text-4xl">👨‍💻</div></div>
              <h2 className="text-2xl md:text-4xl font-bold mb-4">สวัสดีครับ ผม <span className="text-cyan-400">{MY_DATA.name}</span></h2>
              <h1 className="text-4xl md:text-6xl font-black mb-6 max-w-4xl leading-tight">{MY_DATA.oneLiner}</h1>
              <div className="flex gap-4 mt-8">
                <Link href="#projects" className="px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-cyan-400">ดูผลงาน</Link>
                <Link href="/resume.pdf" target="_blank" className="px-8 py-3 border border-white/30 rounded-full font-bold hover:bg-white/10">Resume</Link>
              </div>
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-10"><ChevronDown className="w-8 h-8 text-gray-500" /></motion.div>
            </section>
            {/* PROJECTS, TECH STACK, FOOTER ใส่ตามปกติได้เลยครับ */}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}