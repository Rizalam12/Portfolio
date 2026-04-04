import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({ title, subtitle, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-10 md:mb-14 relative", className)}>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-3xl md:text-5xl font-extrabold text-foreground"
      >
        {title}
        <span className="text-primary">.</span>
      </motion.h2>
      
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-muted-foreground text-lg max-w-2xl"
        >
          {subtitle}
        </motion.p>
      )}
      
      {/* Decorative line */}
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: "80px" }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        className="h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-4"
      />
    </div>
  );
}
