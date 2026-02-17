'use client';
  import Hyperspeed from '@/components/Hyperspeed';
  import StarWarp from '@/components/StarWarp';
  import FloatingModel from '@/components/FloatingModel';
  import { motion, AnimatePresence } from 'framer-motion';
  import {
    ArrowRight, Github, Mail, Code, Layers,
    ChevronDown, Cpu, MapPin,
    Terminal, ArrowUpRight, Folder, Globe, Menu, X
  } from 'lucide-react';
  import Link from 'next/link';
  import Image from 'next/image';
  import { useState, useRef, useEffect } from 'react';

  // --- CONFIG ---
  const MY_DATA = {
    name: "Mark",
    fullName: "Mark Multiverse",
    role: "Mobile Developer",
    oneLiner: "Crafting High-Performance Mobile Apps with Architecture in Mind",
    email: "chinnawong554@gmail.com", // แก้ไขเป็นอีเมลของคุณแล้วครับ
    github: "https://github.com/MarkCnw",
    location: "Korat, Thailand",
    projects: [
      { title: "TrailGuide", desc: "แอปพลิเคชันนำทางเดินป่าแบบ Offline P2P ไม่ต้องมีสัญญาณเน็ตก็รอดได้", stack: ["Flutter","Dart", "Clean Architecture", "Isar DB", "P2P"], link: "https://github.com/MarkCnw/trail-guide", accent: "cyan" },
      { title: "StockMark", desc: "เเอปสำหรับติดตามราคาหุ้นเเละติดตามข่าวสารของหุ้น UX/UI ที่สวยสำหรับการใช้งาน", stack: ["Flutter","Dart","Clean Architecture", "Rive", "Dio"], link: "https://github.com/MarkCnw/StockMark", accent: "purple" },
      { title: "i-have-gpu", desc: "Web Application สำหรับคนรัก Hardware และ GPU High Performance", stack: ["Next.js", "Prisma", "TypeScript", "Tailwind"], link: "https://github.com/MarkCnw/I-Have-Gpu", accent: "amber" },
      { title: "GrowTalk", desc: "เเอปที่ใช้ AI ในการวิเคราะห์พื้นที่เเละทำนายสภาพอากาศร่วมกับ Google Map", stack: ["Flutter","Dart", "Gemini AI", "Google Map"], link: "https://github.com/MarkCnw/GrowTalk", accent: "cyan" },
      { title: "Flutter UI Design", desc: "รวมโปรเจคการดีไซน์UI สำหรับFlutter", stack: ["Flutter", "Dart", "Provider"], link: "https://github.com/MarkCnw/Flutter_UI_Design", accent: "cyan" }
    ],
    skills: [
      {
        category: "Core Stack",
        icon: Code,
        accent: "cyan",
        items: [
          { name: "Mobile Development", sub: "Flutter, Dart (Provider / Cubit / BLoC)" },
          { name: "Web Development", sub: "Next.js, React, TypeScript, Tailwind CSS" }
        ]
      },
      {
        category: "Backend & Database",
        icon: Layers,
        accent: "purple",
        items: [
          { name: "Local Database (Mobile)", sub: "Isar DB, SQLite, Hive" },
          { name: "Cloud Services", sub: "Firebase (Auth, Firestore, Functions), Supabase" },
          { name: "Server-side & ORM", sub: "Prisma ORM, PostgreSQL, MongoDB" },
          { name: "API & Tools", sub: "REST API, Postman, Dio" }
        ]
      },
      {
        category: "Specialized & Others",
        icon: Cpu,
        accent: "amber",
        items: [
          { name: "Connectivity", sub: "P2P, Bluetooth/BLE, GPS Tracking (TrailGuide)" },
          { name: "Architecture", sub: "Clean Architecture, MVVM" },
          { name: "Design Tools", sub: "Figma (UI/UX Design)" }
        ]
      }
    ],
    timeline: [
      { 
        year: "2023 — Present", 
        title: "ปริญญาตรี วิทยาการคอมพิวเตอร์", 
        sub: "มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน (มทร.อีสาน)", 
        desc: "ชั้นปีที่ 3 — มุ่งเน้นศึกษาด้าน Software Architecture และ Modern Mobile Development", 
        accent: "cyan" 
      },
      { 
        year: "2025", 
        title: "Finalist - Nearby Competition", 
        sub: "Innovation Award", 
        desc: "พัฒนาแอปพลิเคชัน TrailGuide ระบบติดตามตำแหน่งเพื่อนแบบ Real-time ผ่านเทคโนโลยี P2P", 
        accent: "purple" 
      },
      { 
        year: "2025", 
        title: "GitHub Galaxy Brain", 
        sub: "GitHub Achievement", 
        desc: "ได้รับ Badge จากการมีส่วนร่วมและช่วยเหลือ Community ใน GitHub Discussions", 
        accent: "amber" 
      }
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
  function SectionLabel({ children }: { children: React.ReactNode }) { return (<motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="flex items-center gap-4 mb-16"><span className="text-sm md:text-base font-semibold tracking-[0.25em] uppercase text-gray-500">{children}</span><div className="flex-1 h-px bg-gradient-to-r from-gray-800 to-transparent" /></motion.div>); }

  // Navbar Component
  function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const links = [
      { name: 'Projects', href: '#projects' },
      { name: 'Journey', href: '#journey' },
      { name: 'About', href: '#about' },
      { name: 'Contact', href: '#contact' },
    ];

    return (
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 backdrop-blur-sm bg-black/20 border-b border-white/5">
        <Link href="/" className="text-xl font-bold tracking-tight text-white hover:text-cyan-400 transition-colors">
          MARK<span className="text-cyan-400">.</span>DEV
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link key={link.name} href={link.href} className="text-sm font-medium text-gray-400 hover:text-white transition-colors uppercase tracking-wider">
              {link.name}
            </Link>
          ))}
          <a href="/resume.pdf" target="_blank" className="px-5 py-2 text-xs font-bold text-black bg-white rounded-full hover:bg-cyan-400 transition-colors uppercase tracking-wide">
            Resume
          </a>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white p-2">
          {isOpen ? <X /> : <Menu />}
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="absolute top-full left-0 w-full bg-black/95 border-b border-white/10 p-6 flex flex-col gap-6 md:hidden">
              {links.map((link) => (
                <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-lg font-medium text-gray-300 hover:text-white">
                  {link.name}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    );
  }

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
    const isLeaving = scrollProgress > 0.95;

    return (
      <main className="relative w-full min-h-screen bg-black font-sans text-white overflow-x-hidden">
        {/* BACKGROUNDS */}
        {showHyperspeed && <div className="fixed inset-0 z-0"><Hyperspeed effectOptions={hsPreset} /></div>}
        {showStarWarp && <div className="fixed inset-0 z-0" style={{ opacity: 0.5 }}><StarWarp speed={2} starCount={7000} /></div>}

        {/* ===== 🚀 SPACESHIP (FIXED: START CENTER + APPEAR AT 10%) ===== */}
        {showStarWarp && (
          <motion.div
            className="fixed z-[5] pointer-events-none"
            style={{ 
              // 1. จัดตำแหน่งเริ่มต้นให้อยู่กลางจอด้วย Flex-like behavior
              left: 0, 
              right: 0, 
              margin: 'auto',
              bottom: '8vh', 
              width: 'min(50vw, 420px)', 
              height: 'min(50vw, 420px)',
            }}
            initial={{ x: 0, y: 100, opacity: 0 }} // เริ่มต้นที่ x: 0 (ตรงกลาง)
            animate={{
              // 2. การเลี้ยว (Horizontal Movement) 
              // เมื่อเลื่อนลง ยานจะเหวี่ยงซ้าย-ขวาตาม ScrollProgress เหมือนโค้ดชุดแรกที่ชอบ
              // ปรับเลข 25 เป็นระยะที่คุณอยากให้ยานเหวี่ยงออกไป (หน่วย vw)
              x: isLeaving ? 0 : Math.cos(scrollProgress * Math.PI * 3) * 25 + "vw",
              
              // 3. การลอยตัว (Vertical Movement)
              y: isLeaving ? -1000 : Math.sin(scrollProgress * 4) * 15, 
              
              // 4. การเอียงตัว (Banking) - สัมพันธ์กับการเหวี่ยงด้านบน
              rotateZ: isLeaving ? 0 : Math.sin(scrollProgress * Math.PI * 3) * 15, 
              
              scale: isLeaving ? 0.5 : 1,
              opacity: isLeaving ? 0 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 35, // ปรับให้หนืดขึ้นนิดหน่อยเพื่อให้ฟีลลิ่งยานลำใหญ่
              damping: 20,
              mass: 1.2,
            }}
          >
            <FloatingModel scrollProgress={scrollProgress} />
          </motion.div>
        )}
        <AnimatePresence>
          {viewState === 'warping' && <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 1.5, times: [0, 0.6, 0.9, 1] }} className="fixed inset-0 z-50 bg-white pointer-events-none" />}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {viewState === 'intro' && (
            <motion.div key="intro" exit={{ opacity: 0, scale: 1.5, filter: 'blur(30px)' }} transition={{ duration: 0.6 }} className="relative z-10 w-full h-screen flex items-center justify-center px-6">
              <motion.div variants={introStagger.container} initial="hidden" animate="visible" className="max-w-2xl w-full text-center space-y-8">
                <motion.div variants={introStagger.item} className="flex items-center justify-center gap-3">
                  <div className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-500/50" />
                  <span className="text-sm md:text-base font-semibold tracking-[0.3em] uppercase text-cyan-400/70">Portfolio 2026</span>
                  <div className="h-px w-8 bg-gradient-to-l from-transparent to-cyan-500/50" />
                </motion.div>
                <motion.div variants={introStagger.item}><h1 className="text-7xl md:text-[12rem] font-black tracking-[-0.04em] leading-[0.85] text-white">MARK</h1></motion.div>
                <motion.div variants={introStagger.item} className="space-y-3">
                  <p className="text-lg md:text-2xl text-gray-400 font-light tracking-wide">The Multiverse of Code & Creativity</p>
                  <div className="flex items-center justify-center gap-6 text-sm md:text-base text-gray-600">
                    <span className="flex items-center gap-2"><Terminal className="w-4 h-4" /> {MY_DATA.role}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-700" />
                    <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {MY_DATA.location}</span>
                  </div>
                </motion.div>
                <motion.div variants={introStagger.item} className="pt-8">
                  <button onClick={handleWarp} className="group relative inline-flex items-center gap-4 px-10 py-5 rounded-full text-base md:text-lg font-semibold transition-all duration-500 bg-white/[0.08] text-white border border-white/[0.12] hover:bg-white hover:text-black hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] backdrop-blur-sm">
                    <span className="tracking-wide">ENTER</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {viewState === 'content' && (
            <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.1 }} className="relative z-10 w-full" ref={contentRef}>
              
              <Navbar />

              {/* HERO SECTION */}
              <section className="min-h-screen flex items-center justify-center px-6 pt-32 pb-24">
                <div className="max-w-6xl w-full">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-20">
                    <motion.div variants={stagger.container} initial="hidden" animate="visible" className="flex-1 space-y-8 md:space-y-10 z-10">
                      <motion.div variants={stagger.item} className="flex items-center gap-4">
                        <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" /></span><span className="text-base md:text-lg text-gray-400 tracking-wide">Available for work</span>
                      </motion.div>
                      <motion.h1 variants={stagger.item} className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.95]">
                        <span className="text-white">สวัสดีครับ,</span><br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-purple-300">ผม {MY_DATA.name}</span>
                      </motion.h1>
                      <motion.p variants={stagger.item} className="text-xl md:text-2xl text-gray-400 max-w-2xl leading-relaxed font-light">
                        {MY_DATA.oneLiner}
                      </motion.p>
                      <motion.div variants={stagger.item} className="flex flex-wrap gap-4 pt-4">
                        <Link href="#projects" className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full text-base md:text-lg font-semibold hover:bg-cyan-400 transition-all duration-300">ดูผลงาน <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" /></Link>
                        <Link href="/resume.pdf" target="_blank" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base md:text-lg font-semibold border border-white/10 text-gray-300 hover:border-white/30 hover:text-white transition-all duration-300 backdrop-blur-sm">Resume</Link>
                      </motion.div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.8 }} className="relative flex-shrink-0 mx-auto md:mx-0 mt-8 md:mt-0 z-10">
                      <div className="relative w-64 h-64 md:w-[400px] md:h-[400px] rounded-[2rem] overflow-hidden border-2 border-white/10 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                        <Image src="/mark.png" alt="Mark Profile" fill className="object-cover" priority />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                      <div className="absolute -z-10 -top-10 -right-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-[80px]" />
                      <div className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-[80px]" />
                    </motion.div>
                  </div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="absolute bottom-12 left-1/2 -translate-x-1/2">
                    <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}><ChevronDown className="w-6 h-6 text-gray-600" /></motion.div>
                  </motion.div>
                </div>
              </section>

              {/* TECH STACK SECTION (CATEGORY CARDS) */}
              <section className="px-6 py-32 max-w-6xl mx-auto">
                <SectionLabel>Tech Stack</SectionLabel>
                <motion.div 
                  variants={stagger.container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-8" 
                >
                  {MY_DATA.skills.map(({ items, category, icon: Icon, accent }) => {
                    const a = accentMap[accent];
                    return (
                      <motion.div 
                        key={category} 
                        variants={stagger.item} 
                        className={`p-8 rounded-[2rem] border border-white/[0.05] bg-white/[0.02] backdrop-blur-md hover:border-white/[0.1] hover:bg-white/[0.04] transition-all duration-300 ${a.glow}`}
                      >
                        <div className="flex items-center gap-4 mb-8">
                          <div className={`p-4 rounded-2xl bg-white/[0.03] ${a.text} border ${a.border}`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <h4 className="text-xl font-bold tracking-wide text-white/90">{category}</h4>
                        </div>
                        <div className="space-y-6">
                          {items.map(s => (
                            <div key={s.name} className="flex flex-col gap-1 group/item">
                              <span className="text-base md:text-lg font-semibold text-gray-200 group-hover/item:text-white transition-colors">
                                {s.name}
                              </span>
                              <span className={`text-[11px] font-bold uppercase tracking-[0.1em] ${a.text} opacity-60 group-hover/item:opacity-100 transition-opacity`}>
                                {s.sub}
                              </span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </section>

              {/* FEATURED PROJECTS */}
              {/* FEATURED PROJECTS - TECH STACK STYLE 100% */}
              <section id="projects" className="px-6 py-32 max-w-6xl mx-auto">
                <SectionLabel>Featured Projects</SectionLabel>
                <motion.div variants={stagger.container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {MY_DATA.projects.map((project, i) => {
                    // ดึงค่าสีจาก accentMap เพื่อให้เหมือน Tech Stack เป๊ะๆ
                    const a = accentMap[project.accent] || accentMap.cyan;
                    
                    return (
                      <motion.a 
                        key={i} 
                        variants={stagger.item} 
                        href={project.link} 
                        target="_blank" 
                        // ใช้ Class เดียวกับ Tech Stack 100%
                        className={`group relative flex flex-col p-8 rounded-[2rem] border border-white/[0.05] bg-white/[0.02] backdrop-blur-md hover:border-white/[0.1] hover:bg-white/[0.04] transition-all duration-300 ${a.glow}`}
                      >
                        {/* Header: Icon & Arrow */}
                        <div className="flex justify-between items-start mb-6">
                          {/* Icon Box: ใช้สไตล์เดียวกับ Tech Stack Icon */}
                          <div className={`p-4 rounded-2xl bg-white/[0.03] ${a.text} border ${a.border}`}>
                            <Folder className="w-6 h-6" />
                          </div>
                          <div className="p-2 rounded-full bg-white/5 text-gray-500 group-hover:text-white group-hover:bg-white/10 transition-colors">
                            <ArrowUpRight className="w-5 h-5" />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 mb-8">
                          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-gray-400 leading-relaxed text-base font-light line-clamp-3">
                            {project.desc}
                          </p>
                        </div>

                        {/* Footer: Tags */}
                        <div className="flex flex-wrap gap-2 mt-auto">
                          {project.stack.map(t => (
                            <span key={t} className={`px-3 py-1 text-[11px] font-bold uppercase tracking-wider opacity-60 group-hover:opacity-100 transition-opacity ${a.text} bg-white/[0.03] rounded-lg`}>
                              {t}
                            </span>
                          ))}
                        </div>
                      </motion.a>
                    );
                  })}
                </motion.div>
              </section>
              {/* JOURNEY, ABOUT, FOOTER (PRESERVED 100%) */}
              <section id="journey" className="px-6 py-32 max-w-6xl mx-auto"><SectionLabel>Journey</SectionLabel><motion.div variants={stagger.container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="space-y-2">{MY_DATA.timeline.map((item, i) => { const a = accentMap[item.accent] || accentMap.cyan; return (<motion.div key={i} variants={stagger.item} className="group grid grid-cols-[140px_1fr] md:grid-cols-[200px_1fr] gap-8 py-10 border-b border-white/[0.04] last:border-0"><div className={`text-base md:text-lg font-mono ${a.text} opacity-60 pt-1`}>{item.year}</div><div><h4 className="text-xl md:text-2xl font-bold text-white mb-2">{item.title}</h4><p className="text-base md:text-lg text-gray-500 mb-3">{item.sub}</p><p className="text-base md:text-lg text-gray-400 leading-relaxed">{item.desc}</p></div></motion.div>); })}</motion.div></section>
              <section id="about" className="px-6 py-32 max-w-6xl mx-auto"><SectionLabel>About</SectionLabel><motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="max-w-4xl"><p className="text-2xl md:text-4xl text-gray-300 leading-relaxed font-light mb-10">&ldquo;ผมเชื่อว่า Code ที่ดีไม่ใช่แค่ทำงานได้ แต่ต้องอ่านรู้เรื่องและดูแลง่าย&rdquo;</p><p className="text-lg md:text-xl text-gray-500 leading-relaxed mb-12">จากความมุ่งมั่นที่อยากสร้างผลิตภัณฑ์ของตัวเอง ที่ตอบโจทย์ทั้งด้านประสิทธิภาพและความยืดหยุ่น ในการออกแบบโครงสร้างโค้ดที่สะอาดและยั่งยืน โดยมีเป้าหมายที่จะก้าวเป็น Senior Developer ผู้เชี่ยวชาญการวางระบบ Scalable Architecture สำหรับแอปพลิเคชันระดับ Enterprise</p><div className="flex flex-wrap gap-x-8 gap-y-4 text-base md:text-lg text-gray-600"><span className="flex items-center gap-2">🏋️ ชอบออกกำลังกาย</span><span className="flex items-center gap-2">🎮 เล่นเกมแนว Strategy</span><span className="flex items-center gap-2">🎬 ติดหนัง Dark Fantasy</span></div></motion.div></section>
              <footer id="contact" className="px-6 py-32 max-w-6xl mx-auto border-t border-white/[0.04]"><motion.div variants={stagger.container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}><motion.p variants={stagger.item} className="text-sm md:text-base font-semibold tracking-[0.25em] uppercase text-gray-500 mb-6">Get in touch</motion.p><motion.h3 variants={stagger.item} className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">สนใจร่วมงานหรือมีข้อสงสัยเพิ่มเติม<br className="md:hidden" />ติดต่อผมได้ทันทีครับ</motion.h3><motion.p variants={stagger.item} className="text-lg md:text-xl text-gray-500 mb-12 max-w-xl">กำลังมองหาที่ฝึกงาน / งานประจำ ติดต่อได้เลยครับ พร้อมเริ่มงานทันที</motion.p><motion.div variants={stagger.item} className="flex flex-wrap gap-4 mb-20"><a href={`mailto:${MY_DATA.email}`} className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full text-base md:text-lg font-semibold hover:bg-cyan-400 transition-all duration-300"><Mail className="w-5 h-5" /> ส่งอีเมล<ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" /></a><a href={MY_DATA.github} target="_blank" className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-base md:text-lg font-semibold border border-white/10 text-gray-300 hover:border-white/30 hover:text-white transition-all duration-300"><Github className="w-5 h-5" /> GitHub</a></motion.div><motion.div variants={stagger.item} className="flex flex-col md:flex-row md:items-center justify-between text-sm md:text-base text-gray-700 gap-4"><span>© 2026 {MY_DATA.fullName}</span><span>Built with Next.js, Three.js & Framer Motion</span></motion.div></motion.div></footer>

            </motion.div>
          )}
        </AnimatePresence>
      </main>
    );
  }