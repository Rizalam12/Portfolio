import { Github, Linkedin } from "lucide-react";
import { SiGmail } from "react-icons/si";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background py-10 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-display font-bold text-2xl mb-2">
              Md Rizwan Alam<span className="text-primary"></span>
            </h3>
            <p className="text-muted-foreground">Full Stack Developer & Software Engineer</p>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/Rizalam12" 
              target="_blank" 
              rel="noreferrer"
              aria-label="GitHub"
              title="GitHub"
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white hover:-translate-y-1 transition-all duration-300"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="https://www.linkedin.com/in/mdrizwanalam" 
              target="_blank" 
              rel="noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-[#0077b5] hover:text-white hover:-translate-y-1 transition-all duration-300"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="mailto:mdrizwanalam21@gmail.com"
              aria-label="Email (Gmail)"
              title="Gmail"
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-[#0077b5] hover:text-white hover:-translate-y-1 transition-all duration-300"
            >
              <SiGmail className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-white/5 text-center text-muted-foreground text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Md Rizwan Alam. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with React & Tailwind <span className="text-primary">♥</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
