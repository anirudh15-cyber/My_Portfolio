"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
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

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("rounded-2xl p-4", className)}>{children}</div>;
}
function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="mb-2">{children}</div>;
}
function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={cn("font-semibold text-xl", className)}>{children}</h3>;
}
function CardContent({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

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
  role: "AI/ML Engineer | Data Science & Computer Vision",
  summary:
    "AI/ML Engineer delivering end‑to‑end products across computer vision, NLP and time‑series. Comfortable with PyTorch/TensorFlow, FastAPI, OpenCV, and scalable data pipelines.",
  location: "Delhi, India (Open to Remote)",
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
      title: "Emotion Detection using YOLOv8",
      blurb:
        "Real-time facial emotion recognition (~30 FPS) with YOLOv8 + CNN; robust preprocessing, tracked IDs, and FastAPI service.",
      stack: ["YOLOv8", "PyTorch", "OpenCV", "FastAPI"],
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
      video: "https://www.youtube.com/embed/iHjibNut5w8?rel=0",
      links: [{ label: "GitHub", href: "https://github.com/anirudh15-cyber" }],
    },
    {
      title: "Custom Hand Gesture Recognition",
      blurb:
        "MediaPipe landmarks → LSTM classifier (95% acc) for real‑time gesture control. Latency‑optimized pipeline.",
      stack: ["TensorFlow", "LSTM", "MediaPipe"],
      image:
        "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?q=80&w=1200&auto=format&fit=crop",
      video: "https://www.youtube.com/embed/0G13v7S6w7U?rel=0",
      links: [{ label: "GitHub", href: "https://github.com/anirudh15-cyber" }],
    },
    {
      title: "Real‑Time Price Prediction",
      blurb:
        "Streaming pipeline for equities/crypto with engineered features (RSI, MA, volatility) and XGBoost + LSTM; R² ≈ 0.89.",
      stack: ["XGBoost", "LSTM", "Python", "Pandas"],
      image:
        "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1200&auto=format&fit=crop",
      video: "https://www.youtube.com/embed/yKzRZ4L7dO8?rel=0",
      links: [{ label: "GitHub", href: "https://github.com/anirudh15-cyber" }],
    },
  ],
  experience: [
    {
      company: "Accenture",
      role: "Associate Software Engineer",
      period: "09/2023 — Present",
      points: [
        "Deployed ML models on large financial datasets; +15% accuracy, -20% processing time.",
        "Improved predictive modeling using deep learning; +10% decision quality.",
        "Integrated AI insights into business dashboards across teams.",
      ],
    },
  ],
  education: [
    {
      school: "Bhagwan Parshuram Institute of Technology, New Delhi",
      degree: "B.Tech in ECE",
      period: "2019 — 2023",
    },
    { school: "Hansraj Model School, New Delhi", degree: "Class XII", period: "2018 — 2019" },
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
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="flex items-center gap-3 mb-8"
  >
    {icon}
    <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
      {children}
    </h2>
  </motion.div>
);

// ============================= Sections =============================
const Nav: React.FC = () => {
  const links = ["about", "skills", "projects", "experience", "education", "contact"];
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 backdrop-blur bg-gradient-to-r from-slate-50/80 to-slate-100/80 dark:from-slate-900/80 dark:to-slate-950/80 border-b border-slate-200 dark:border-slate-800"
    >
      <Container>
        <div className="flex items-center justify-between py-4">
          <a href="#top" className="flex items-center gap-2">
            <Code2 className="h-6 w-6 text-cyan-500" />
            <span className="font-bold text-lg">Anirudh</span>
          </a>
          <div className="hidden md:flex items-center gap-6">
            {links.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className="text-sm text-slate-600 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition"
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
        </div>
      </Container>
    </motion.div>
  );
};

const Hero: React.FC = () => (
  <div id="about" className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 text-white overflow-hidden">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.1 }}
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage:
          "radial-gradient(600px 200px at 20% 20%, rgba(34,211,238,0.18), transparent), radial-gradient(500px 180px at 80% 30%, rgba(59,130,246,0.18), transparent)",
      }}
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
          <p className="text-xl mt-4 text-slate-200">{DATA.role}</p>
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
          className="hidden md:flex justify-center"
        >
          <img
            src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200"
            alt="AI Visualization"
            className="rounded-2xl shadow-lg border border-slate-700/40"
          />
        </motion.div>
      </div>
    </Container>
  </div>
);

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
                <Badge key={s} className="bg-slate-200 dark:bg-slate-800 dark:text-slate-200">
                  {s}
                </Badge>
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
    <section id="projects" className="py-20">
      <SectionTitle icon={<Database className="h-6 w-6 text-cyan-500" />}>Projects</SectionTitle>
      <div className="grid md:grid-cols-3 gap-8">
        {DATA.projects.map((p, idx) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
          >
            <Card className="bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl hover:shadow-2xl transition">
              <img src={p.image} alt={p.title} className="w-full h-44 object-cover rounded-2xl" />
              <CardHeader>
                <CardTitle className="text-lg font-bold">{p.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4 text-slate-600 dark:text-slate-300">{p.blurb}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.stack.map((s: string) => (
                    <Badge key={s} className="bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200">
                      {s}
                    </Badge>
                  ))}
                </div>
                <div className="aspect-video mb-4 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                  <iframe
                    className="w-full h-full"
                    src={p.video}
                    title={p.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <div className="flex gap-2">
                  {p.links?.map((l: { label: string; href: string }) => (
                    <Button key={l.label} className="rounded-full">
                      <a href={l.href} target="_blank" rel="noreferrer" className="flex items-center">
                        <ExternalLink className="h-3.5 w-3.5 mr-1" />
                        {l.label}
                      </a>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  </Container>
);

const Experience: React.FC = () => (
  <Container>
    <section id="experience" className="py-20">
      <SectionTitle icon={<LineChart className="h-6 w-6 text-cyan-500" />}>Experience</SectionTitle>
      <div className="grid gap-8">
        {DATA.experience.map((e) => (
          <motion.div
            key={e.company}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg font-bold">
                  {e.role} — {e.company}
                </CardTitle>
                <p className="text-sm text-slate-500 dark:text-slate-400">{e.period}</p>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  {e.points.map((pt: string, idx: number) => (
                    <li key={idx}>{pt}</li>
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
      <SectionTitle icon={<Brain className="h-6 w-6 text-cyan-500" />}>Education</SectionTitle>
      <div className="grid gap-8">
        {DATA.education.map((ed) => (
          <motion.div
            key={ed.school}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl">
              <CardHeader>
                <CardTitle>{ed.degree}</CardTitle>
                <p className="text-sm text-slate-600 dark:text-slate-400">{ed.school}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{ed.period}</p>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  </Container>
);

const Contact: React.FC = () => (
  <Container>
    <section id="contact" className="py-20">
      <SectionTitle>Contact</SectionTitle>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl p-8">
          <form className="grid gap-4" onSubmit={(e) => e.preventDefault()}>
            <Input type="text" placeholder="Your Name" required />
            <Input type="email" placeholder="Your Email" required />
            <Textarea placeholder="Your Message" rows={4} required />
            <Button className="rounded-full">Send</Button>
          </form>
        </Card>
      </motion.div>
    </section>
  </Container>
);

// ============================= Page =============================
export default function Page() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50" id="top">
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
