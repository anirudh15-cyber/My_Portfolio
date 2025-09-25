"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ProjectCard } from "@/components/ui/project-card";
import Logo from "@/components/ui/Logo";
import LoadingScreen from "@/components/ui/LoadingScreen";
import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import {
  Github,
  Linkedin,
  Menu,
  X,
  Mail,
  ExternalLink,
  Download,
  MapPin,
  Phone,
  Database,
  Brain,
  LineChart,
  Sun,
  Moon,
  Code2,
} from "lucide-react";
import emailjs from "@emailjs/browser";

// =============== Small local UI + utils (no external imports) ===============
const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center px-4 py-2 rounded-full font-medium transition shadow-sm",
        "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500",
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("px-2 py-1 rounded-md text-xs font-medium", className)}>{children}</span>;
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-transparent focus:ring-2 focus:ring-cyan-500",
        props.className
      )}
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-transparent focus:ring-2 focus:ring-cyan-500",
        props.className
      )}
    />
  );
}

// ============================= Site Data =============================

const DATA = {
  name: "Anirudh Narang",
  role: "AI/ML Engineer | Delivering Scalable Solutions in Computer Vision, NLP & Time-Series",
  summary: "Hi, I’m Anirudh 👋 — a Data Scientist & AI Engineer with a passion for exploring the boundaries of AI. Whether it’s deep learning, NLP, or time-series forecasting, I enjoy experimenting, learning, and pushing ideas from notebooks into production-ready systems.",
  location: "Delhi, India",
  email: "anirudhnarang16@gmail.com",
  phone: "+91-9818924498",
  resumeUrl: "/Anirudh_Narang AI.pdf",
  socials: [
    { label: "GitHub", href: "https://github.com/anirudh15-cyber", icon: Github },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/anirudh-narang", icon: Linkedin },
    { label: "Email", href: "mailto:anirudhnarang16@gmail.com", icon: Mail },
  ],
  skills: {
    "Programming Languages": ["Python", "Java", "R", "SQL"],
    "Machine Learning & AI": [
      "Deep Learning",
      "Computer Vision",
      "Natural Language Processing (NLP)",
      "Predictive Modeling",
      "Supervised Learning",
      "Unsupervised Learning",
      "Transformers"
    ],
    "Frameworks & Libraries": [
      "TensorFlow",
      "PyTorch",
      "Keras",
      "Scikit-learn",
      "OpenCV",
      "Pandas",
      "NumPy"
    ],
    "Data Visualization": ["Tableau", "Excel", "Matplotlib", "Seaborn"],
    "Tools & Platforms": ["MySQL", "FastAPI", "JIRA", "GitHub", "Docker"]
  },
  projects: [
    {
      title: "Emotion Detection System",
      blurb:
        "Built a real-time emotion recognition pipeline using YOLOv8 and CNNs (92% accuracy) — optimized for live video inference, enabling smarter human–computer interaction and behavioral analytics.",
      stack: ["YOLOv8", "PyTorch", "OpenCV", "FastAPI"],
      video: "/videos/EDS.mp4",
      links: [{ label: "GitHub", href: "https://github.com/anirudh15-cyber/Emotion_detection-using-YOLOv8" }],
    },
    {
      title: "Custom Hand Gesture Recognition",
      blurb:
        "Developed a gesture-controlled system (95% accuracy) with LSTM + MediaPipe landmarks, enabling touchless interaction for automation and accessibility use cases.",
      stack: ["TensorFlow", "LSTM", "MediaPipe", "Pose Estimation"],
      video: "/videos/HGRS.mp4",
      links: [{ label: "GitHub", href: "https://github.com/anirudh15-cyber/Custom-Hand-Gesture-Recognition-System" }],
    },
    {
      title: "Social Distancing Violation Detection System",
      blurb: "Implemented a YOLO-based monitoring system that flags distancing violations in real time, supporting crowd safety and smart surveillance in public spaces.",
      stack: ["YOLO", "OpenCV", "Computer Vision", "Deep Learning"],
      video: "/videos/SDS.mp4",
      links: [{ label: "GitHub", href: "https://github.com/anirudh15-cyber/Social-Distancing-Violation-Detection-System" }],
    },
  ],
  experience: [
    {
      company: "Accenture",
      role: "Associate Software Engineer",
      period: "09/2023 — Present",
      points: [
        "Developed and optimized policies & claims management systems using SAP ABAP, ensuring scalability and performance improvements.",
        "Automated recurring processes by writing modular ABAP code, reducing manual efforts by 20%.",
        "Collaborated with cross-functional teams for requirement gathering, debugging, and deployment of client-specific solutions.",
        "Conducted knowledge transfer (KT) sessions and created technical documentation to upskill team members on automation workflows and deployment practices.",
        "Achieved recognition through the Gold Star Award (2025) for delivering high impact solutions that directly improved business efficiency.",
      ],
    },
  ],
  education: [
    {
      school: "Bhagwan Parshuram Institute of Technology, New Delhi",
      degree: "B.Tech in ECE",
      period: "2019 — 2023",
      percentage: "Percentage: 91.8%",
    },
    { school: "Hansraj Model School, New Delhi", degree: "Class XII", period: "2018 — 2019", percentage: "Percentage: 89%", },
  ],
};

// ============================= Theme Toggle =============================
function useDarkMode() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);
  return { dark, setDark };
}

const ThemeToggle: React.FC = () => {
  const { dark, setDark } = useDarkMode();
  return (
    <Button className="rounded-full shadow-md" onClick={() => setDark((d) => !d)} aria-label="Toggle theme">
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
};

// ============================= Layout Helpers =============================
const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="max-w-7xl mx-auto px-6 lg:px-12">{children}</div>
);

const SectionTitle: React.FC<{ icon?: React.ReactNode; children: React.ReactNode }> = ({ icon, children }) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="flex items-center gap-3 mb-8"
  >
    {icon && (
      <motion.div
        animate={{ y: [0, -6, 0] }} // bounce effect
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        {icon}
      </motion.div>
    )}
    <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
      {children}
    </h2>
  </motion.section>
);


// ============================= Sections =============================
const Nav: React.FC = () => {
  const links = ["about", "skills", "projects", "experience", "education", "contact"];
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 backdrop-blur bg-gradient-to-r 
                 from-slate-50/80 to-slate-100/80 dark:from-slate-900/80 
                 dark:to-slate-950/80 border-b border-slate-200 dark:border-slate-800"
    >
      <Container>
        <div className="flex items-center justify-between py-4">
          {/* Logo + Animated Title */}
          <a href="#top" className="flex items-center gap-2">
            <Logo size={40} /> {/* ✅ small, clean logo here */}
            <span className="font-bold text-lg flex items-center gap-2">
              Anirudh Narang —
              <TypeAnimation
                sequence={[
                  "AI/ML Engineer 🚀",
                2000,
                "Computer Vision Specialist 👁️",
                2000,
                "Data Scientist📊",
                2000,
                "Building Scalable AI ⚡",
                2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-cyan-600 dark:text-cyan-400"
              />
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className="text-base font-medium text-slate-600 dark:text-slate-300 
                           hover:text-cyan-500 dark:hover:text-cyan-400 transition"
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
            <ThemeToggle />
            {DATA.resumeUrl && (
              <Button className="rounded-full">
                <a href={DATA.resumeUrl} className="flex items-center">
                  <Download className="h-4 w-4 mr-2" /> Resume
                </a>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-cyan-500"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden flex flex-col items-center gap-4 pb-4">
            {links.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setMenuOpen(false)}
                className="text-base font-medium text-slate-600 dark:text-slate-300 
                           hover:text-cyan-500 dark:hover:text-cyan-400 transition"
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
            <ThemeToggle />
            {DATA.resumeUrl && (
              <Button className="rounded-full">
                <a href={DATA.resumeUrl} className="flex items-center">
                  <Download className="h-4 w-4 mr-2" /> Resume
                </a>
              </Button>
            )}
          </div>
        )}
      </Container>
    </motion.div>
  );
};


const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 100]); // parallax shift

  return (
    <div
      id="about"
      className="relative overflow-hidden text-white min-h-screen flex items-center"
    >
      {/* 🌌 Animated Gradient Background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, rgba(6,182,212,0.25), transparent 70%), radial-gradient(circle at 80% 70%, rgba(59,130,246,0.25), transparent 70%)",
            "radial-gradient(circle at 30% 40%, rgba(147,51,234,0.25), transparent 70%), radial-gradient(circle at 70% 60%, rgba(6,182,212,0.25), transparent 70%)",
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "mirror" }}
      />

      {/* 🌠 Floating Particles Layer */}
      <motion.div
        className="absolute inset-0"
        style={{ backgroundImage: "url('/particles.png')" }}
        animate={{ backgroundPosition: ["0px 0px", "100px 100px"] }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
      />

      <Container>
        <div className="relative grid md:grid-cols-2 gap-12 items-center py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {DATA.name}
            </h1>
            <TypeAnimation
              sequence={[
                "AI/ML Engineer 🚀",
                2000,
                "Computer Vision Specialist 👁️",
                2000,
                "Data Scientist📊",
                2000,
                "Building Scalable AI ⚡",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="block text-xl mt-4 text-slate-200"
            />
            <p className="mt-6 text-slate-300 max-w-xl">{DATA.summary}</p>
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <Badge className="flex items-center gap-1 bg-slate-800 text-slate-200">
                <MapPin className="h-3.5 w-3.5" /> {DATA.location}
              </Badge>
              <a href={`tel:${DATA.phone}`} className="flex items-center gap-2 text-sm hover:underline">
                <Phone className="h-4 w-4" />
                {DATA.phone}
              </a>
              <a href={`mailto:${DATA.email}`} className="flex items-center gap-2 text-sm hover:underline">
                <Mail className="h-4 w-4" />
                {DATA.email}
              </a>
            </div>
            <motion.div className="flex items-center gap-3 mt-8">
              {DATA.socials.map((s) => (
                <Button key={s.label} className="rounded-full border-slate-600 text-white/90 hover:text-white">
                  <a href={s.href} target="_blank" rel="noreferrer" className="flex items-center">
                    {React.createElement(s.icon, { className: "h-4 w-4 mr-2" })}
                    {s.label}
                  </a>
                </Button>
              ))}
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="flex justify-center relative mt-10 md:mt-0"
          >
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="flex justify-center relative mt-10 md:mt-0"
              style={{ y }} // ✅ parallax shift
            ></motion.div>
            {/* Glowing Halo */}
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="w-80 h-80 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-500 blur-3xl opacity-30 animate-pulse"></div>
            </div>
            {/* Headshot */}
            <img
              src="/GIF.gif"
              alt="Anirudh Narang"
              className="rounded-2xl shadow-lg border border-slate-700/40 
             w-full max-w-sm md:max-w-md lg:max-w-lg 
             object-cover"
            />


            {/* Floating Icon 1 */}
            <motion.div
              animate={{ y: [0, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 bg-white dark:bg-slate-800 p-2 rounded-full shadow-md"
            >
              <Code2 className="h-8 w-8 text-cyan-500" />
            </motion.div>

            {/* Floating Icon 2 */}
            <motion.div
              animate={{ x: [0, 10, 0], scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute bottom-6 -left-6 bg-white dark:bg-slate-800 p-2 rounded-full shadow-md"
            >
              <Brain className="h-8 w-8 text-blue-500" />
            </motion.div>

          </motion.div>

        </div>
      </Container>
    </div>
  );
};

const Skills: React.FC = () => (
  <Container>
    <section id="skills" className="py-20">
      <SectionTitle>Skills</SectionTitle>
      <div className="flex flex-col gap-4">
        {Object.entries(DATA.skills).map(([category, skills]) => (
          <div key={category}>
            <div className="font-semibold mb-2">{category}</div>
            <div className="flex flex-wrap gap-2">
              {(skills as string[]).map((s) => (
                <motion.div
                  key={s}
                  whileHover={{ scale: 1.15, rotate: 2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Badge
                    className={cn(
                      "relative px-3 py-1 rounded-md text-xs font-medium text-white cursor-pointer",
                      "bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500",
                      "bg-[length:200%_200%] animate-shimmer", // shimmer effect
                      "hover:from-cyan-400 hover:via-blue-600 hover:to-purple-600 shadow-md"
                    )}
                  >
                    {s}
                  </Badge>
                </motion.div>

              ))}

            </div>
          </div>
        ))}
      </div>
    </section>
  </Container>
);

const Projects: React.FC = () => (
  <Container>
    <section id="projects" className="py-24 relative">
      {/* 🌌 Animated Background */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          background: [
            "radial-gradient(circle at 20% 40%, rgba(6,182,212,0.15), transparent 70%), radial-gradient(circle at 80% 60%, rgba(59,130,246,0.15), transparent 70%)",
            "radial-gradient(circle at 30% 30%, rgba(147,51,234,0.15), transparent 70%), radial-gradient(circle at 70% 70%, rgba(6,182,212,0.15), transparent 70%)",
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "mirror" }}
      />

      <SectionTitle icon={<Database className="h-6 w-6 text-cyan-500" />}>
        Projects
      </SectionTitle>

      <motion.div
        className="grid md:grid-cols-3 gap-8 items-stretch auto-rows-fr"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.15, duration: 0.6 },
          },
        }}
      >
        {DATA.projects.map((p) => (
          <motion.div
            key={p.title}
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            whileHover={{ scale: 1.05, rotateZ: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="group relative rounded-2xl overflow-hidden"
          >
            {/* 🌈 Gradient Glow Overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-2xl"></div>

            {/* Glassmorphism Project Card */}
            <ProjectCard
              className="relative flex flex-col h-full
                         rounded-2xl border border-white/20 
                         bg-white/10 dark:bg-slate-900/20 
                         backdrop-blur-md shadow-xl
                         hover:shadow-[0_0_25px_rgba(6,182,212,0.5)]
                         transition-all duration-500"
            >
              <CardHeader className="pb-0">
                <CardTitle className="text-lg font-bold">{p.title}</CardTitle>
              </CardHeader>

              <CardContent className="flex flex-col flex-1 pt-0">
                <p className="text-sm mb-6 text-slate-600 dark:text-slate-300 leading-relaxed">
                  {p.blurb}
                </p>

                {/* 🛠 Tech stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.stack.map((s: string) => (
                    <Badge
                      key={s}
                      className="bg-slate-200/60 dark:bg-slate-800/60 dark:text-slate-200 
                                 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 
                                 hover:text-white transition-all cursor-pointer"
                    >
                      {s}
                    </Badge>
                  ))}
                </div>

                {/* 🎥 Video preview */}
                <div className="mt-auto aspect-video rounded-xl overflow-hidden relative border border-white/20">
                  <video
                    src={p.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                  />
                  {p.links?.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="absolute bottom-3 right-3 p-2 rounded-full bg-cyan-600 hover:bg-cyan-700 text-white shadow-md transition"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </ProjectCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  </Container>
);


const Experience: React.FC = () => (
  <Container>
    <section id="experience" className="py-20">
      <SectionTitle icon={<LineChart className="h-6 w-6 text-cyan-500" />}>
        Experience
      </SectionTitle>

      <div className="relative ml-6">
        {/* Animated glowing vertical line */}
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: "100%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute left-[-1px] top-0 w-[3px] 
                     bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-500
                     rounded-full animate-pulse"
        />

        {DATA.experience.map((e) => (
          <motion.div
            key={e.company}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="relative mb-12 pl-6"
          >
            {/* Glowing timeline dot */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1], boxShadow: [
                  "0 0 0px #22d3ee",
                  "0 0 20px #22d3ee",
                  "0 0 0px #22d3ee"
                ]
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -left-[25px] top-6 w-5 h-5 rounded-full bg-cyan-500"
            />

            <Card className="bg-white/10 dark:bg-slate-900/20 
             backdrop-blur-md border border-white/20 
             rounded-2xl shadow-xl transition 
             hover:shadow-cyan-500/20 hover:scale-[1.02] 
             duration-300">
              <CardHeader>
                <CardTitle className="text-lg font-bold">
                  {e.role} — {e.company}
                </CardTitle>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {e.period}
                </p>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  {e.points.map((pt: string, idx: number) => (
                    <motion.li
                      key={idx}
                      initial={{ x: -10, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.1, duration: 0.3 }}
                    >
                      {pt}
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  </Container>
);

const Education: React.FC = () => (
  <Container>
    <section id="education" className="py-20">
      <SectionTitle icon={<Brain className="h-6 w-6 text-cyan-500" />}>
        Education
      </SectionTitle>

      <div className="relative ml-6">
        {/* Animated glowing vertical line */}
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: "100%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute left-[-1px] top-0 w-[3px] 
                     bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-500
                     rounded-full animate-pulse"
        />

        {DATA.education.map((ed, idx) => (
          <motion.div
            key={ed.school}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="relative mb-12 pl-6"
          >
            {/* Glowing timeline dot */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1], boxShadow: [
                  "0 0 0px #22d3ee",
                  "0 0 20px #22d3ee",
                  "0 0 0px #22d3ee"
                ]
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -left-[25px] top-6 w-5 h-5 rounded-full bg-cyan-500"
            />

            <Card className="bg-white/10 dark:bg-slate-900/20 
             backdrop-blur-md border border-white/20 
             rounded-2xl shadow-xl transition 
             hover:shadow-cyan-500/20 hover:scale-[1.02] 
             duration-300">
              <CardHeader>
                <CardTitle className="text-lg font-bold">{ed.degree}</CardTitle>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {ed.school}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {ed.period}
                </p>
                <motion.p
                  initial={{ x: -10, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="text-sm text-slate-600 dark:text-slate-400"
                >
                  {ed.percentage}
                </motion.p>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  </Container>
);

const Contact: React.FC = () => {
  const formRef = React.useRef<HTMLFormElement | null>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (formRef.current) {
      emailjs
        .sendForm(
          "service_txw7ekh",   // 🔹 Replace with EmailJS Service ID
          "template_8b98t6c",  // 🔹 Replace with EmailJS Template ID
          formRef.current,
          "0_HjT6FhTjW0TiNjV"    // 🔹 Replace with EmailJS Public Key
        )
        .then(
          () => {
            alert("✅ Message sent successfully!");
            formRef.current?.reset();
          },
          (error) => {
            console.error(error.text);
            alert("❌ Failed to send message. Please try again.");
          }
        );
    }
  };

  return (
    <Container>
      <section id="contact" className="py-20">
        <SectionTitle>Contact</SectionTitle>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-white/10 dark:bg-slate-900/20 
             backdrop-blur-md border border-white/20 
             rounded-2xl shadow-xl transition 
             hover:shadow-cyan-500/20 hover:scale-[1.02] 
             duration-300">
            <form ref={formRef} onSubmit={sendEmail} className="grid gap-4">
              <Input type="text" name="from_name" placeholder="Your Name" required />
              <Input type="email" name="reply_to" placeholder="Your Email" required />
              <Textarea name="message" placeholder="Your Message" rows={4} required />
              <Button type="submit" className="rounded-full">
                Send
              </Button>
            </form>
          </Card>
        </motion.div>
      </section>
    </Container>
  );
};



// ============================= Page =============================
export default function Page() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000); // show loader for 3s
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;  // ✅ show loader first
  }

  return (
    <div
      className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50"
      id="top"
    >
      <Nav />
      <Hero />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Contact />
    </div>
  );
}
