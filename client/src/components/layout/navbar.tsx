import { useState, useEffect, MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme";

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Certifications", href: "#certifications" },
];

export function Navbar(): JSX.Element {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = (): void => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    setIsMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled ? "bg-background/95 backdrop-blur-xl border-b border-white/10 py-3 sm:py-4" : "bg-transparent/80 py-4 sm:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 flex items-center justify-between min-h-[56px] sm:min-h-[64px]">
          {/* Logo */}
          <a 
            href="#main-content" 
            onClick={(e) => { 
              e.preventDefault(); 
              window.scrollTo({ top: 0, behavior: 'smooth' }); 
            }} 
            className="flex items-center gap-2 group flex-shrink-0"
            aria-label="Home"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-all duration-300">
              <Code2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="font-display font-bold text-lg sm:text-xl tracking-tight hidden sm:block whitespace-nowrap">
              Rizwan<span className="text-primary">.dev</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <ul className="flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-sm xl:text-base font-medium text-muted-foreground hover:text-foreground px-2 py-1.5 relative group transition-colors duration-200"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>

            <Button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="rounded-full px-5 py-2.5 bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold hover:from-primary/90 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 whitespace-nowrap hidden md:inline-flex"
            >
              Hire Me
            </Button>
          </nav>

          {/* Mobile Menu Toggle - Large touch target */}
          <button 
            type="button"
            className="lg:hidden relative z-[200] flex items-center justify-center h-12 w-12 rounded-full bg-accent/20 hover:bg-accent hover:text-accent-foreground active:bg-accent active:scale-[0.96] transition-all duration-200 p-0 border border-accent/30 shadow-md"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay - Fullscreen */}
      <AnimatePresence mode="wait">
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobileMenu}
            className="fixed inset-0 z-[150] bg-black/50 backdrop-blur-sm lg:hidden"
          />
        )}
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed top-[70px] right-0 h-[calc(100vh-70px)] w-full max-w-sm bg-background/95 backdrop-blur-xl border-l border-white/10 shadow-2xl z-[160] lg:hidden overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 pb-4 space-y-4">
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={closeMobileMenu}
                      className="block w-full text-lg font-semibold text-muted-foreground hover:text-primary hover:bg-accent/50 px-4 py-3 rounded-xl transition-all duration-200 active:scale-[0.98]"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
              
              <div className="pt-4 border-t border-white/10 space-y-3">
              <Button 
                  onClick={() => {
                    closeMobileMenu();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold text-base shadow-lg hover:shadow-xl active:scale-[0.98] transition-all"
                >
                  Hire Me
                </Button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
