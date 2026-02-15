'use client';
import Hyperspeed from '@/components/Hyperspeed';
import StarWarp from '@/components/StarWarp';
import FloatingModel from '@/components/FloatingModel';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Github, Mail, Smartphone, Code, Layers,
  Award, User, ChevronDown, ExternalLink, Cpu, MapPin,
  Terminal, ArrowUpRight
} from 'lucide-react';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

// --- CONFIG ---
const MY_DATA = {
  name: "Mark",
  fullName: "Mark Multiverse",
  role: "Flutter Developer",
  oneLiner: "Junior Flutter Developer ที่หลงใหลในการสร้าง Mobile App และ AI Architecture",
  email: "contact@mark.dev",
  github: "https://github.com/MarkCnw",
  location: "Bangkok, Thailand",
  projects: [
    { title: "TrailGuide", desc: "แอปพลิเคชันนำทางเดินป่าแบบ Offline P2P ไม่ต้องมีสัญญาณเน็ตก็รอดได้", stack: ["Flutter", "Clean Arch", "Isar DB", "P2P Protocol"], link: "#", accent: "cyan" },
    { title: "CarboCare", desc: "Carbon Footprint Tracking พร้อม Tamagotchi Earth ที่โตตามความดีที่เราทำ", stack: ["Flutter", "Rive Animation", "Firebase"], link: "#", accent: "purple" },
    { title: "i-have-gpu", desc: "Web Application สำหรับคนรัก Hardware และ GPU High Performance", stack: ["Next.js", "Tailwind CSS", "TypeScript"], link: "https://github.com/MarkCnw/i-have-gpu", accent: "amber" }
  ],
  skills: {
    languages: ["Dart", "JavaScript/TypeScript", "Python", "SQL"],
    frameworks: ["Flutter", "Next.js", "React", "Node.js"],
    tools: ["Git", "Firebase", "Figma", "Docker"]
  },
  timeline: [
    { year: "2023 — Present", title: "ปริญญาตรี วิศวกรรมคอมพิวเตอร์", sub: "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้า", desc: "ชั้นปีที่ 3 — สนใจ Software Architecture & Mobile Dev", accent: "cyan" },
    { year: "2025", title: "Finalist — Hackathon", sub: "Google Developer Student Clubs", desc: "พัฒนาแอป CarboCare ในหัวข้อ Sustainability", accent: "purple" },
    { year: "2025", title: "GitHub Galaxy Brain", sub: "GitHub Achievement", desc: "ได้รับ Badge จากการช่วยเหลือ Community", accent: "amber" }
  ]
};

// --- Hyperspeed Presets ---
const hsNormal = {
  speedUp: 0.5, movingAwaySpeed: [20, 30] as [number, number],
  colors: { roadColor: 0x080808, islandColor: 0x0a0a0a, background: 0x000000, shoulderLines: 0x00ffff, brokenLines: 0x00ffff, leftCars: [0xd856bf, 0x6750a2], rightCars: [0x03b3c3, 0x0e5ea5], sticks: 0x03b3c3 },
  distortion: 'turbulentDistortion', length: 400, roadWidth: 10, islandWidth: 2, lanesPerRoad: 3, fov: 90, fovSpeedUp: 150, carLightsFade: 0.4, totalSideLightSticks: 20, lightPairsPerRoadWay: 40,
  shoulderLinesWidthPercentage: 0.05, brokenLinesWidthPercentage: 0.1, brokenLinesLengthPercentage: 0.5, lightStickWidth: [0.12, 0.5] as [number, number], lightStickHeight: [1.3, 1.7] as [number, number],
  movingCloserSpeed: [-20, -30] as [number, number], carLightsLength: [12, 80] as [number, number], carLightsRadius: [0.05, 0.14] as [number, number], carWidthPercentage: [0.3, 0.5] as [number, number],
  carShiftX: [-0.8, 0.8] as [number, number], carFloorSeparation: [0, 5] as [number, number]
};
const hsWarp = { ...hsNormal, speedUp: 50, fov: 120, movingAwaySpeed: [200, 300] as [number, number], movingCloserSpeed: [-300, -500] as [number, number] };

// --- Animation helpers ---
const stagger = { container: { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } } }, item: { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const } } };
const introStagger = { container: { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }, item: { hidden: { opacity: 0, y: 30, filter: 'blur(10px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const } } } };
const accentMap: Record<string, { border: string; bg: string; text: string; glow: string }> = {
  cyan:   { border: 'border-cyan-500/20', bg: 'bg-cyan-500/5', text: 'text-cyan-400', glow: 'shadow-[0_0_30px_rgba(6,182,212,0.08)]' },
  purple: { border: 'border-purple-500/20', bg: 'bg-purple-500/5', text: 'text-purple-400', glow: 'shadow-[0_0_30px_rgba(168,85,247,0.08)]' },
  amber:  { border: 'border-amber-500/20', bg: 'bg-amber-500/5', text: 'text-amber-400', glow: 'shadow-[0_0_30px_rgba(245,158,11,0.08)]' },
};
function SectionLabel({ children }: { children: React.ReactNode }) { return (<motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="flex items-center gap-4 mb-16"><span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-gray-500">{children}</span><div className="flex-1 h-px bg-gradient-to-r from-gray-800 to-transparent" /></motion.div>); }

export default function Home() {
  const [viewState, setViewState] = useState<'intro' | 'warping' | 'content'>('intro');
  const [hsPreset, setHsPreset] = useState(hsNormal);
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewState !== 'content') return;
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [viewState]);

  const handleWarp = () => {
    setViewState('warping'); setHsPreset(hsWarp);
    setTimeout(() => { setViewState('content'); if (typeof window !== 'undefined') window.scrollTo(0, 0); }, 1500);
  };

  const showHyperspeed = viewState !== 'content';
  const showStarWarp = viewState === 'content';
  
  // เริ่มวาร์ปออกตอน Scroll เกือบสุด (95%)
  const isLeaving = scrollProgress > 0.95;

  return (
    <main className="relative w-full min-h-screen bg-black font-sans text-white overflow-x-hidden">
      {/* BACKGROUNDS */}
      {showHyperspeed && <div className="fixed inset-0 z-0"><Hyperspeed effectOptions={hsPreset} /></div>}
      {showStarWarp && <div className="fixed inset-0 z-0" style={{ opacity: 0.5 }}><StarWarp speed={2} starCount={7000} /></div>}

      {/* ===== SPACESHIP ===== */}
      {showStarWarp && (
        <motion.div
          className="fixed z-[5] pointer-events-none"
          // จัดวางให้อยู่กลางจอเป็นแกนหลัก
          style={{ 
            top: 0, bottom: 0, left: 0, right: 0, margin: 'auto',
            width: 'min(45vw, 400px)', height: 'min(45vw, 400px)' 
          }}
          initial={{ x: "30vw", y: "0vh" }} // เริ่มต้นที่ขวากลางจอ
          animate={{
            // 1. Math.cos(0) = 1 (ขวา) -> ลดลงไปติดลบ (ซ้าย) -> กลับมาบวก (ขวา)
            // * 30vw คือระยะห่างจากตรงกลาง
            x: isLeaving ? "0vw" : Math.cos(scrollProgress * Math.PI * 3) * 30 + "vw",
            
            // 2. Y: ให้แกว่งๆ อยู่แถวกลางจอ (-10vh ถึง +10vh)
            y: isLeaving ? "0vh" : (-10 + scrollProgress * 20) + "vh",
            
            // 3. ตอนจบ (isLeaving): ขนาดเหลือ 0, หมุนติ้ว, จางหาย
            scale: isLeaving ? 0 : 1,
            rotateZ: isLeaving ? 720 : Math.sin(scrollProgress * 5) * 10,
            opacity: isLeaving ? 0 : 1
          }}
          transition={{
            type: "spring", stiffness: 40, damping: 20, mass: 1,
            scale: { duration: 0.8, ease: "backIn" }, // วูบหายไปเร็วๆ
            opacity: { duration: 0.8 },
            rotateZ: { duration: 0.8, ease: "easeInOut" }
          }}
        >
          <FloatingModel scrollProgress={scrollProgress} />
        </motion.div>
      )}

      {/* FLASH & PAGES (ส่วนที่เหลือเหมือนเดิม) */}
      <AnimatePresence>
        {viewState === 'warping' && <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 1.5, times: [0, 0.6, 0.9, 1] }} className="fixed inset-0 z-50 bg-white pointer-events-none" />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {viewState === 'intro' && (
          <motion.div key="intro" exit={{ opacity: 0, scale: 1.5, filter: 'blur(30px)' }} transition={{ duration: 0.6 }} className="relative z-10 w-full h-screen flex items-center justify-center px-6">
            <motion.div variants={introStagger.container} initial="hidden" animate="visible" className="max-w-2xl w-full text-center space-y-8">
              <motion.div variants={introStagger.item} className="flex items-center justify-center gap-3">
                <div className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-500/50" />
                <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-cyan-400/70">Portfolio 2026</span>
                <div className="h-px w-8 bg-gradient-to-l from-transparent to-cyan-500/50" />
              </motion.div>
              <motion.div variants={introStagger.item}><h1 className="text-7xl md:text-[10rem] font-black tracking-[-0.04em] leading-[0.85] text-white">MARK</h1></motion.div>
              <motion.div variants={introStagger.item} className="space-y-3">
                <p className="text-base md:text-lg text-gray-400 font-light tracking-wide">The Multiverse of Code & Creativity</p>
                <div className="flex items-center justify-center gap-4 text-xs text-gray-600">
                  <span className="flex items-center gap-1.5"><Terminal className="w-3 h-3" /> {MY_DATA.role}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-700" />
                  <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {MY_DATA.location}</span>
                </div>
              </motion.div>
              <motion.div variants={introStagger.item} className="pt-6">
                <button onClick={handleWarp} className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-500 bg-white/[0.08] text-white border border-white/[0.12] hover:bg-white hover:text-black hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] backdrop-blur-sm">
                  <span className="tracking-wide">ENTER</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {viewState === 'content' && (
          <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.1 }} className="relative z-10 w-full" ref={contentRef}>
            <section className="min-h-screen flex items-center justify-center px-6 py-24">
              <div className="max-w-5xl w-full">
                <motion.div variants={stagger.container} initial="hidden" animate="visible" className="space-y-8">
                  <motion.div variants={stagger.item} className="flex items-center gap-3"><span className="relative flex h-2.5 w-2.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" /></span><span className="text-sm text-gray-400 tracking-wide">Available for work</span></motion.div>
                  <motion.h1 variants={stagger.item} className="text-5xl md:text-8xl font-black tracking-tight leading-[0.95]"><span className="text-white">สวัสดีครับ,</span><br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-purple-300">ผม {MY_DATA.name}</span></motion.h1>
                  <motion.p variants={stagger.item} className="text-lg md:text-2xl text-gray-400 max-w-2xl leading-relaxed font-light">{MY_DATA.oneLiner}</motion.p>
                  <motion.div variants={stagger.item} className="flex flex-wrap gap-3 pt-4">
                    <Link href="#projects" className="group inline-flex items-center gap-2 px-7 py-3.5 bg-white text-black rounded-full text-sm font-semibold hover:bg-cyan-400 transition-all duration-300">ดูผลงาน <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" /></Link>
                    <Link href="/resume.pdf" target="_blank" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold border border-white/10 text-gray-300 hover:border-white/30 hover:text-white transition-all duration-300 backdrop-blur-sm">Resume</Link>
                  </motion.div>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="absolute bottom-10 left-1/2 -translate-x-1/2">
                  <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}><ChevronDown className="w-5 h-5 text-gray-600" /></motion.div>
                </motion.div>
              </div>
            </section>

            <section className="px-6 py-24 max-w-5xl mx-auto"><SectionLabel>Tech Stack</SectionLabel><motion.div variants={stagger.container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 md:grid-cols-3 gap-5">{[{ data: MY_DATA.skills.languages, label: 'Languages', icon: Code, accent: 'cyan' }, { data: MY_DATA.skills.frameworks, label: 'Frameworks', icon: Layers, accent: 'purple' }, { data: MY_DATA.skills.tools, label: 'Tools', icon: Cpu, accent: 'amber' }].map(({ data, label, icon: Icon, accent }) => { const a = accentMap[accent]; return (<motion.div key={label} variants={stagger.item} className={`group p-7 rounded-2xl border ${a.border} ${a.bg} ${a.glow} backdrop-blur-sm hover:border-white/20 transition-all duration-500`}><div className="flex items-center gap-2 mb-5"><Icon className={`w-4 h-4 ${a.text} opacity-70`} /><h4 className={`text-xs font-semibold tracking-[0.2em] uppercase ${a.text} opacity-80`}>{label}</h4></div><div className="flex flex-wrap gap-2">{data.map(s => (<span key={s} className="px-3 py-1.5 rounded-lg bg-white/[0.03] text-[13px] text-gray-300 border border-white/[0.06] font-medium">{s}</span>))}</div></motion.div>); })}</motion.div></section>
            <section id="projects" className="px-6 py-24 max-w-5xl mx-auto"><SectionLabel>Featured Projects</SectionLabel><motion.div variants={stagger.container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="space-y-6">{MY_DATA.projects.map((project, i) => { const a = accentMap[project.accent] || accentMap.cyan; return (<motion.a key={i} variants={stagger.item} href={project.link} target="_blank" className={`group block p-8 md:p-10 rounded-2xl border ${a.border} ${a.bg} ${a.glow} backdrop-blur-sm hover:border-white/20 transition-all duration-500 cursor-pointer`}><div className="flex items-start justify-between mb-4"><div><span className={`text-xs font-semibold tracking-[0.15em] uppercase ${a.text} opacity-70 mb-2 block`}>Project {String(i + 1).padStart(2, '0')}</span><h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-white/90 transition-colors">{project.title}</h3></div><ArrowUpRight className="w-5 h-5 text-gray-600 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" /></div><p className="text-gray-400 text-base leading-relaxed mb-6 max-w-2xl">{project.desc}</p><div className="flex flex-wrap gap-2">{project.stack.map(t => (<span key={t} className="px-3 py-1 text-xs rounded-full bg-white/[0.04] text-gray-400 border border-white/[0.06] font-mono">{t}</span>))}</div></motion.a>); })}</motion.div></section>
            <section className="px-6 py-24 max-w-5xl mx-auto"><SectionLabel>Journey</SectionLabel><motion.div variants={stagger.container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="space-y-1">{MY_DATA.timeline.map((item, i) => { const a = accentMap[item.accent] || accentMap.cyan; return (<motion.div key={i} variants={stagger.item} className="group grid grid-cols-[120px_1fr] md:grid-cols-[180px_1fr] gap-6 py-8 border-b border-white/[0.04] last:border-0"><div className={`text-sm font-mono ${a.text} opacity-60 pt-1`}>{item.year}</div><div><h4 className="text-lg font-semibold text-white mb-1">{item.title}</h4><p className="text-sm text-gray-500 mb-2">{item.sub}</p><p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p></div></motion.div>); })}</motion.div></section>
            <section className="px-6 py-24 max-w-5xl mx-auto"><SectionLabel>About</SectionLabel><motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="max-w-3xl"><p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light mb-8">&ldquo;ผมเชื่อว่า Code ที่ดีไม่ใช่แค่ทำงานได้ แต่ต้องอ่านรู้เรื่องและดูแลง่าย&rdquo;</p><p className="text-base text-gray-500 leading-relaxed mb-10">จุดเริ่มต้นของผมคือการอยากมี App เป็นของตัวเอง จนได้มาเจอกับ Flutter และตกหลุมรักความสามารถของมัน เป้าหมายในอีก 3 ปีข้างหน้า คือการเป็น Senior Mobile Developer ที่สามารถออกแบบ System ใหญ่ๆ ได้</p><div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600"><span className="flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5" /> ชอบประกอบคอม</span><span className="flex items-center gap-1.5">🎮 เล่นเกมแนว Strategy</span><span className="flex items-center gap-1.5">☕ ติดกาแฟดำ</span></div></motion.div></section>
            <footer className="px-6 py-24 max-w-5xl mx-auto border-t border-white/[0.04]"><motion.div variants={stagger.container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}><motion.p variants={stagger.item} className="text-xs font-semibold tracking-[0.25em] uppercase text-gray-500 mb-4">Get in touch</motion.p><motion.h3 variants={stagger.item} className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">ร่วมงานกับผม<br className="md:hidden" />ไหมครับ?</motion.h3><motion.p variants={stagger.item} className="text-gray-500 mb-10 max-w-lg">กำลังมองหาที่ฝึกงาน / งานประจำ ติดต่อได้เลยครับ พร้อมเริ่มงานทันที</motion.p><motion.div variants={stagger.item} className="flex flex-wrap gap-3 mb-16"><a href={`mailto:${MY_DATA.email}`} className="group inline-flex items-center gap-2 px-7 py-3.5 bg-white text-black rounded-full text-sm font-semibold hover:bg-cyan-400 transition-all duration-300"><Mail className="w-4 h-4" /> ส่งอีเมล<ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" /></a><a href={MY_DATA.github} target="_blank" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold border border-white/10 text-gray-300 hover:border-white/30 hover:text-white transition-all duration-300"><Github className="w-4 h-4" /> GitHub</a></motion.div><motion.div variants={stagger.item} className="flex flex-col md:flex-row md:items-center justify-between text-xs text-gray-700 gap-2"><span>© 2026 {MY_DATA.fullName}</span><span>Built with Next.js, Three.js & Framer Motion</span></motion.div></motion.div></footer>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}