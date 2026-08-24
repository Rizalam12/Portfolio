import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Code2 as Github, Linkedin, Sparkles, CheckCircle2, Layers3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

const RESUME_PDF_PATH = "/cv.pdf";

export function Hero() {
  const [resumeLoading, setResumeLoading] = useState(false);
  const { toast } = useToast();

  async function handleDownloadResume(e: React.MouseEvent) {
    e.preventDefault();
    setResumeLoading(true);
    try {
      const res = await fetch(RESUME_PDF_PATH);
      if (!res.ok || !(res.headers.get("content-type") ?? "").includes("pdf")) throw new Error("Resume unavailable");
      const blob = await res.blob();
      const url = URL.createObjectURL(new Blob([blob], { type: "application/pdf" }));
      const a = document.createElement("a");
      a.href = url;
      a.download = "Md-Rizwan-Alam-Resume.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast({ title: "Resume downloaded", description: "Thanks for taking a look." });
    } catch {
      toast({
        title: "Resume not available",
        description: "Please email me and I’ll send you a copy.",
        variant: "destructive",
        action: <ToastAction asChild altText="Email me"><a href="mailto:mdrizwanalam21@gmail.com?subject=Resume Request">Email me</a></ToastAction>,
      });
    } finally {
      setResumeLoading(false);
    }
  }

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-primary/15 blur-[120px]" />
      <div className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-accent/10 blur-[140px]" />

      <div className="max-w-7xl mx-auto w-full px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-[1.15fr_.85fr] gap-14 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }} className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm text-primary mb-7">
              <span className="relative flex h-2.5 w-2.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" /><span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" /></span>
              Available for full-time & freelance work
            </motion.div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .05 }} className="text-sm uppercase tracking-[.22em] text-muted-foreground mb-4">
              Full-Stack Developer · New Delhi, India
            </motion.p>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }} className="text-5xl sm:text-6xl xl:text-8xl font-display font-extrabold leading-[.98] tracking-tight">
              I build products<br />
              <span className="text-gradient text-glow">people enjoy using.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15 }} className="mt-7 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
              I’m Md Rizwan Alam, a Software Engineer focused on React, Node.js and Django. I turn ideas into fast, responsive and maintainable web experiences.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25 }} className="mt-9 flex flex-col sm:flex-row gap-3">
              <Button size="lg" onClick={() => scrollTo("projects")} className="h-14 rounded-full px-8 text-base font-bold shadow-lg shadow-primary/20">
                Explore my work <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" onClick={handleDownloadResume} disabled={resumeLoading} className="h-14 rounded-full px-8 border-white/10 bg-white/[.02] text-base">
                <Download className="mr-2 h-5 w-5" /> {resumeLoading ? "Preparing…" : "Download resume"}
              </Button>
              <div className="flex items-center gap-2 sm:ml-2">
                <a href="https://github.com/Rizalam12" target="_blank" rel="noreferrer" aria-label="GitHub" className="h-12 w-12 rounded-full border border-white/10 bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition"><Github className="h-5 w-5" /></a>
                <a href="https://www.linkedin.com/in/mdrizwanalam" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="h-12 w-12 rounded-full border border-white/10 bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition"><Linkedin className="h-5 w-5" /></a>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .4 }} className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Responsive by default</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> API-first thinking</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Clean, scalable code</span>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: .92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: .8 }} className="relative max-w-[520px] mx-auto w-full">
            <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-tr from-primary/15 via-transparent to-accent/15 blur-2xl" />
            <div className="relative rounded-[2rem] border border-white/10 bg-card/60 backdrop-blur-2xl p-4 shadow-2xl">
              <div className="flex items-center justify-between px-3 pb-4">
                <div className="flex gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-red-400/70" /><span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" /><span className="h-2.5 w-2.5 rounded-full bg-green-400/70" /></div>
                <span className="text-xs text-muted-foreground font-mono">portfolio.tsx</span>
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-background">
                <img src="/images/profile.jpeg" alt="Md Rizwan Alam" className="w-full aspect-[4/3] object-cover object-center" />
              </div>
              <div className="grid grid-cols-3 gap-3 pt-4">
                {[{label:"Projects", value:"7+"},{label:"Stack", value:"MERN + Django"},{label:"Focus", value:"Web Apps"}].map((item) => (
                  <div key={item.label} className="rounded-xl border border-white/5 bg-secondary/60 p-3 text-center">
                    <div className="text-sm font-bold text-foreground">{item.value}</div>
                    <div className="text-[11px] text-muted-foreground mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-5 -left-5 hidden sm:flex items-center gap-3 rounded-2xl border border-primary/20 bg-background/90 backdrop-blur-xl px-4 py-3 shadow-xl">
              <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center"><Layers3 className="h-5 w-5" /></div>
              <div><p className="text-xs text-muted-foreground">Currently building</p><p className="text-sm font-semibold">Scalable full-stack apps</p></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
