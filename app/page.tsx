'use client';

import StarWarp from '@/components/StarWarp'; // เรียกใช้ component ใหม่
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Github, Mail, Smartphone, Code, Layers, 
  Award, User, ChevronDown, ExternalLink, Cpu 
} from 'lucide-react';
import Link from 'next/link';
import { useState, useRef } from 'react';

// --- CONFIG 1: ข้อมูลของคุณ ---
const MY_DATA = {
  name: "Mark", 
  fullName: "Mark Multiverse",
  oneLiner: "Junior Flutter Developer ที่หลงใหลในการสร้าง Mobile App และ AI Architecture",
  email: "contact@mark.dev",
  github: "https://github.com/MarkCnw",
  
  projects: [
    {
      title: "TrailGuide",
      desc: "แอปพลิเคชันนำทางเดินป่าแบบ Offline P2P ไม่ต้องมีสัญญาณเน็ตก็รอดได้",
      stack: ["Flutter", "Clean Arch", "Isar DB", "P2P Protocol"],
      link: "#", 
      imageColor: "from-green-500/20 to-emerald-900/20"
    },
    {
      title: "CarboCare",
      desc: "Carbon Footprint Tracking พร้อม Tamagotchi Earth ที่โตตามความดีที่เราทำ",
      stack: ["Flutter", "Rive Animation", "Firebase"],
      link: "#",
      imageColor: "from-blue-500/20 to-cyan-900/20"
    },
    {
      title: "i-have-gpu",
      desc: "Web Application สำหรับคนรัก Hardware และ GPU High Performance",
      stack: ["Next.js", "Tailwind CSS", "TypeScript"],
      link: "https://github.com/MarkCnw/i-have-gpu",
      imageColor: "from-purple-500/20 to-indigo-900/20"
    }
  ],

  skills: {
    languages: ["Dart", "JavaScript/TypeScript", "Python", "SQL"],
    frameworks: ["Flutter", "Next.js", "React", "Node.js"],
    tools: ["Git", "Firebase", "Figma", "Docker"]
  }
};

// --- MAIN COMPONENT ---
export default function Home() {
  const [viewState, setViewState] = useState<'intro' | 'warping' | 'content'>('intro');
  const [starSpeed, setStarSpeed] = useState(2); // ความเร็วเริ่มต้น (ลอยช้าๆ)
  const contentRef = useRef<HTMLDivElement>(null);

  const handleWarp = () => {
    setViewState('warping'); 
    setStarSpeed(50); // 🚀 เร่งความเร็วสุดขีดตอนกดปุ่ม
    
    // รอ 2 วินาที (ให้วาร์ปทำงาน) -> แฟลช -> โชว์เนื้อหา
    setTimeout(() => {
      setViewState('content');
      setStarSpeed(0.5); // 🛑 ลดความเร็วลงให้ช้ามากๆ ตอนอ่านเนื้อหา
      if (typeof window !== 'undefined') window.scrollTo(0, 0);
    }, 2000);
  };

  return (
    <main className="relative w-full min-h-screen bg-black font-sans text-white overflow-x-hidden">
      
      {/* 1. BACKGROUND (StarWarp) */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
        {/* ส่งค่า starSpeed เข้าไปควบคุมความเร็วดาว */}
        <StarWarp speed={starSpeed} starCount={7000} />
      </div>

      {/* 2. WHITE FLASH (แสงวาบตอนวาร์ปจบ) */}
      <AnimatePresence>
        {viewState === 'warping' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }} // จาง -> ขาวจ้า -> จาง
            transition={{ duration: 2, times: [0, 0.6, 0.9, 1] }}
            className="fixed inset-0 z-50 bg-white pointer-events-none"
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        
        {/* === STATE: INTRO (หน้าแรก) === */}
        {viewState === 'intro' && (
          <motion.div 
            key="intro"
            exit={{ opacity: 0, scale: 2, filter: 'blur(20px)' }}
            transition={{ duration: 0.8 }}
            className="relative z-10 w-full h-screen flex flex-col items-center justify-center p-4"
          >
             <motion.div 
               initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
               className="text-center space-y-6 max-w-4xl"
             >
                <span className="px-3 py-1 text-xs font-bold tracking-[0.3em] text-cyan-400 border border-cyan-500/30 rounded-full bg-black/50 backdrop-blur-md uppercase animate-pulse">
                  System Ready
                </span>
                <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-purple-900 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                  MARK
                </h1>
                <p className="text-xl md:text-3xl text-gray-300 font-light tracking-wide">
                  The Multiverse of Code & Creativity
                </p>
                
                <div className="pt-8">
                  <button 
                    onClick={handleWarp}
                    className="group relative inline-flex items-center gap-3 px-10 py-5 bg-white text-black rounded-full font-bold text-lg hover:bg-cyan-400 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                  >
                    GET STARTED
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
             </motion.div>
          </motion.div>
        )}

        {/* === STATE: CONTENT (หน้า Portfolio เต็มรูปแบบ) === */}
        {viewState === 'content' && (
          <motion.div 
            key="content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative z-10 w-full"
            ref={contentRef}
          >
            
            {/* HERO SECTION */}
            <section className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative">
              <div className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 p-1 mb-8 shadow-[0_0_50px_rgba(6,182,212,0.4)]">
                <div className="w-full h-full rounded-full bg-gray-900 overflow-hidden relative">
                   <div className="w-full h-full flex items-center justify-center text-4xl">👨‍💻</div>
                </div>
              </div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                className="text-2xl md:text-4xl font-bold text-white mb-4"
              >
                สวัสดีครับ ผม <span className="text-cyan-400">{MY_DATA.name}</span>
              </motion.h2>
              
              <h1 className="text-4xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-purple-400 mb-6 max-w-4xl leading-tight">
                {MY_DATA.oneLiner}
              </h1>

              <div className="flex gap-4 mt-8">
                <Link href="#projects" className="px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-cyan-400 transition-colors">
                  ดูผลงานของผม
                </Link>
                <Link href="/resume.pdf" target="_blank" className="px-8 py-3 border border-white/30 rounded-full font-bold hover:bg-white/10 transition-colors backdrop-blur-sm">
                  ดาวน์โหลด Resume
                </Link>
              </div>

              <motion.div 
                animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10"
              >
                <ChevronDown className="w-8 h-8 text-gray-500" />
              </motion.div>
            </section>

            {/* TECH STACK */}
            <section className="py-20 px-6 max-w-6xl mx-auto">
              <h3 className="text-3xl font-bold mb-12 flex items-center gap-3">
                <Layers className="text-cyan-400" /> คลังอาวุธ (Tech Stack)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 rounded-2xl bg-gray-900/60 border border-gray-800 backdrop-blur-md">
                  <h4 className="text-xl font-bold mb-4 text-cyan-300">Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {MY_DATA.skills.languages.map((skill) => (
                      <span key={skill} className="px-3 py-1 rounded-md bg-cyan-900/30 text-cyan-200 text-sm border border-cyan-500/20">{skill}</span>
                    ))}
                  </div>
                </div>
                
                <div className="p-6 rounded-2xl bg-gray-900/60 border border-gray-800 backdrop-blur-md">
                  <h4 className="text-xl font-bold mb-4 text-purple-300">Frameworks</h4>
                  <div className="flex flex-wrap gap-2">
                    {MY_DATA.skills.frameworks.map((skill) => (
                      <span key={skill} className="px-3 py-1 rounded-md bg-purple-900/30 text-purple-200 text-sm border border-purple-500/20">{skill}</span>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-gray-900/60 border border-gray-800 backdrop-blur-md">
                  <h4 className="text-xl font-bold mb-4 text-green-300">Tools & Soft Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {MY_DATA.skills.tools.map((skill) => (
                      <span key={skill} className="px-3 py-1 rounded-md bg-green-900/30 text-green-200 text-sm border border-green-500/20">{skill}</span>
                    ))}
                    <span className="px-3 py-1 rounded-md bg-yellow-900/30 text-yellow-200 text-sm border border-yellow-500/20">Fast Learner</span>
                  </div>
                </div>
              </div>
            </section>

            {/* FEATURED PROJECTS */}
            <section id="projects" className="py-20 px-6 max-w-6xl mx-auto">
              <h3 className="text-3xl font-bold mb-12 flex items-center gap-3">
                <Smartphone className="text-purple-400" /> พระเอกของงาน (Featured Projects)
              </h3>

              <div className="space-y-16">
                {MY_DATA.projects.map((project, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8 rounded-3xl bg-gray-900/40 border border-gray-800 hover:border-gray-600 transition-colors"
                  >
                    <div className={`w-full h-64 rounded-2xl bg-gradient-to-br ${project.imageColor} flex items-center justify-center overflow-hidden shadow-2xl group-hover:scale-[1.02] transition-transform duration-500`}>
                       <span className="text-4xl opacity-50 font-black tracking-widest">{project.title}</span>
                    </div>

                    <div>
                      <h4 className="text-3xl font-bold text-white mb-2">{project.title}</h4>
                      <p className="text-gray-400 text-lg mb-6 leading-relaxed">{project.desc}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.stack.map(tech => (
                          <span key={tech} className="px-2 py-1 text-xs rounded bg-gray-800 text-gray-300 border border-gray-700 font-mono">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-4">
                        <a href={project.link} target="_blank" className="flex items-center gap-2 px-5 py-2 rounded-full bg-white text-black font-bold hover:bg-cyan-400 transition-colors">
                          <ExternalLink className="w-4 h-4" /> Live Demo
                        </a>
                        <a href={project.link} target="_blank" className="flex items-center gap-2 px-5 py-2 rounded-full border border-gray-600 hover:border-white transition-colors">
                          <Code className="w-4 h-4" /> Source Code
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* EDUCATION & ACHIEVEMENTS */}
            <section className="py-20 px-6 max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold mb-12 flex items-center gap-3">
                <Award className="text-yellow-400" /> การศึกษา & รางวัล
              </h3>

              <div className="relative border-l border-gray-800 ml-3 space-y-12">
                <div className="ml-8 relative">
                   <span className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-cyan-500 border-4 border-black"></span>
                   <h4 className="text-xl font-bold text-white">ปริญญาตรี วิศวกรรมคอมพิวเตอร์</h4>
                   <p className="text-cyan-400 mb-2">มหาวิทยาลัยเทคโนโลยีพระจอมเกล้า... (2023 - Present)</p>
                   <p className="text-gray-400">กำลังศึกษาชั้นปีที่ 3 | สนใจพิเศษด้าน Software Architecture & Mobile Dev</p>
                </div>

                <div className="ml-8 relative">
                   <span className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-purple-500 border-4 border-black"></span>
                   <h4 className="text-xl font-bold text-white">Finalist - Hackathon 2025</h4>
                   <p className="text-purple-400 mb-2">Google Developer Student Clubs</p>
                   <p className="text-gray-400">พัฒนาแอป CarboCare แข่งขันในหัวข้อ Sustainability</p>
                </div>
                
                 <div className="ml-8 relative">
                   <span className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-yellow-500 border-4 border-black"></span>
                   <h4 className="text-xl font-bold text-white">GitHub Galaxy Brain</h4>
                   <p className="text-yellow-400 mb-2">GitHub Achievement</p>
                   <p className="text-gray-400">ได้รับ Badge จากการตอบคำถามและช่วยเหลือ Community</p>
                </div>
              </div>
            </section>

            {/* ABOUT ME */}
            <section className="py-20 px-6 max-w-4xl mx-auto text-center">
              <h3 className="text-3xl font-bold mb-8 flex items-center justify-center gap-3">
                <User className="text-pink-400" /> เกี่ยวกับผม (About Me)
              </h3>
              <div className="bg-gray-900/50 p-8 rounded-3xl border border-gray-800 backdrop-blur-sm">
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  "ผมเชื่อว่า Code ที่ดีไม่ใช่แค่ทำงานได้ แต่ต้องอ่านรู้เรื่องและดูแลง่าย" <br/><br/>
                  จุดเริ่มต้นของผมคือการอยากมี App เป็นของตัวเอง จนได้มาเจอกับ <strong>Flutter</strong> และตกหลุมรักความสามารถของมัน 
                  เป้าหมายในอีก 3 ปีข้างหน้า คือการเป็น <strong>Senior Mobile Developer</strong> ที่สามารถออกแบบ System ใหญ่ๆ ได้
                </p>
                <div className="flex justify-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><Cpu className="w-4 h-4"/> ชอบประกอบคอม</span>
                  <span className="flex items-center gap-1">🎮 เล่นเกมแนว Strategy</span>
                  <span className="flex items-center gap-1">☕ ติดกาแฟดำ</span>
                </div>
              </div>
            </section>

            {/* FOOTER */}
            <footer className="py-12 border-t border-gray-900 bg-black/80 backdrop-blur-md text-center">
              <h3 className="text-2xl font-bold text-white mb-4">ร่วมงานกับผมไหมครับ?</h3>
              <p className="text-gray-400 mb-8">กำลังมองหาที่ฝึกงาน / งานประจำ ติดต่อได้เลยครับ พร้อมเริ่มงานทันที!</p>
              
              <div className="flex justify-center gap-6 mb-8">
                <a href={`mailto:${MY_DATA.email}`} className="flex items-center gap-2 px-6 py-3 rounded-full bg-gray-800 hover:bg-white hover:text-black transition-all">
                  <Mail className="w-5 h-5" /> ส่งอีเมล
                </a>
                <a href={MY_DATA.github} target="_blank" className="flex items-center gap-2 px-6 py-3 rounded-full bg-gray-800 hover:bg-white hover:text-black transition-all">
                  <Github className="w-5 h-5" /> GitHub
                </a>
              </div>

              <div className="text-xs text-gray-600">
                © 2026 {MY_DATA.fullName}. Built with Next.js & StarWarp.
              </div>
            </footer>

          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}