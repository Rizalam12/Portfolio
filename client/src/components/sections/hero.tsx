import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

/** Resume PDF path (file must be in client/public/). Use "cv.pdf" or "resume.pdf". */
const RESUME_PDF_PATH = "/cv.pdf";

export function Hero() {
  const [resumeLoading, setResumeLoading] = useState(false);
  const { toast } = useToast();

  async function handleDownloadResume(e: React.MouseEvent) {
    e.preventDefault();
    setResumeLoading(true);
    try {
      const res = await fetch(RESUME_PDF_PATH, { method: "GET" });
      const contentType = res.headers.get("content-type") ?? "";
      const isPdf = res.ok && (contentType.includes("application/pdf") || res.url.endsWith(".pdf"));
      if (!isPdf) throw new Error("Not a PDF");
      const blob = await res.blob();
      if (blob.type && !blob.type.includes("pdf")) throw new Error("Not a PDF");
      const url = URL.createObjectURL(new Blob([blob], { type: "application/pdf" }));
      const a = document.createElement("a");
      a.href = url;
      a.download = "Resume.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast({
        title: "Resume downloaded",
        description: "Check your downloads folder.",
      });
    } catch {
      toast({
        title: "Resume not available",
        description: `Add ${RESUME_PDF_PATH.replace("/", "")} to client/public, or request it via email.`,
        variant: "destructive",
        action: (
          <ToastAction asChild altText="Email me">
            <a href="mailto:mdrizwanalam21@gmail.com?subject=Resume Request">Email me</a>
          </ToastAction>
        ),
      });
    } finally {
      setResumeLoading(false);
    }
  }

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-1/4 -left-64 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-64 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
        {/* Mobile Profile Image - shows at top on mobile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative lg:hidden flex justify-center mb-6"
        >
          <div className="relative z-10 w-full aspect-square max-w-[250px] mx-auto">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-2xl blur-2xl opacity-50"></div>
            <div className="relative h-full w-full rounded-2xl overflow-hidden glass-card p-2 border-white/10">
              <div className="h-full w-full rounded-xl overflow-hidden border-4 border-primary/40 shadow-2xl shadow-primary/30">
                <img src="/images/profile.jpeg" alt="Md Rizwan Alam - Software Engineer" className="w-full h-full object-contain" loading="lazy" />
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-white/5 mb-6"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              <span className="text-sm font-medium text-muted-foreground">Available for new opportunities</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-display font-extrabold leading-[1.1] tracking-tight mb-5"
            >
              Hi, I'm <span className="text-white">Rizwan</span>.<br />
              <span className="text-gradient text-glow">Software Engineer</span>

            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl leading-relaxed"
            >
              I build scalable web applications and seamless user experiences using React, Node.js, and Django.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <Button 
                size="lg" 
                className="w-full sm:w-auto rounded-full h-14 px-8 bg-gradient-to-r from-primary to-primary/80 hover:to-primary text-lg font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View My Work
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto rounded-full h-14 px-8 border-white/10 hover:bg-white/5 text-lg font-medium hover:-translate-y-1 transition-all duration-300"
                onClick={handleDownloadResume}
                disabled={resumeLoading}
                aria-label="Download resume (PDF)"
              >
                {resumeLoading ? (
                  <>
                    <span className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Downloading…
                  </>
                ) : (
                  <>
                    <Download className="mr-2 w-5 h-5" />
                    Download Resume
                  </>
                )}
              </Button>

              <div className="flex items-center gap-3 ml-0 sm:ml-4 mt-4 sm:mt-0">
                <a href="https://github.com/Rizalam12" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-secondary hover:bg-white/10 hover:text-white text-muted-foreground transition-colors" aria-label="GitHub profile" title="GitHub">
                  <Github className="w-6 h-6" />
                </a>
                <a href="https://www.linkedin.com/in/mdrizwanalam" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-secondary hover:bg-white/10 hover:text-white text-muted-foreground transition-colors" aria-label="LinkedIn profile" title="LinkedIn">
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 w-full aspect-square max-w-[300px] mx-auto group">
              {/* Outer glow rings */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-2xl blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Image Frame */}
              <div className="relative h-full w-full rounded-2xl overflow-hidden glass-card p-2 border-white/10 group-hover:border-primary/50 transition-colors duration-500">
                {/* Profile Image - rectangular frame */}
                <div className="h-full w-full rounded-xl overflow-hidden border-4 border-primary/40 shadow-2xl shadow-primary/30">
                  <img src="/images/profile.jpeg" alt="Md Rizwan Alam - Software Engineer" className="w-full h-full object-contain" loading="lazy" />
                </div>
              </div>

             
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
