import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Certifications } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";
import { ChatBot } from "@/components/chatbot";
import { motion, useScroll, useSpring } from "framer-motion";
import { Code2, Rocket, Users, Layers3 } from "lucide-react";


function ProofStrip() {
  const items = [
    { icon: Code2, value: "7+", label: "full-stack projects" },
    { icon: Rocket, value: "15+", label: "websites shipped" },
    { icon: Layers3, value: "MERN", label: "plus Django stack" },
    { icon: Users, value: "24h", label: "target response time" },
  ];

  return (
    <section className="border-y border-white/5 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 grid grid-cols-2 md:grid-cols-4 gap-3">
        {items.map(({ icon: Icon, value, label }) => (
          <motion.div key={label} whileHover={{ y: -2 }} className="flex items-center justify-center md:justify-start gap-3 rounded-2xl border border-white/5 bg-background/30 px-4 py-3">
            <Icon className="h-5 w-5 text-primary shrink-0" />
            <div><p className="font-bold text-foreground">{value}</p><p className="text-xs text-muted-foreground">{label}</p></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen bg-background selection:bg-primary/30 text-foreground overflow-x-hidden">
      {/* Top Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary transform origin-left z-[100]"
        style={{ scaleX }}
      />
      
      <Navbar />
      
      <main id="main-content">
        <Hero />
        <ProofStrip />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Contact />
      </main>

      <ChatBot />
      <Footer />
    </div>
  );
}
