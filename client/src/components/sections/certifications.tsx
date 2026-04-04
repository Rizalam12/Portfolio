import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { Award, CheckCircle } from "lucide-react";

export function Certifications() {
  const certs = [
    { title: "AWS Educate – Cloud 101", issuer: "Amazon Web Services" },
    { title: "Python Using AI (Fundamentals)", issuer: "Various/Platform" }
  ];

  return (
    <section id="certifications" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeading 
              title="Certifications" 
              subtitle="Continuous learning and professional validations."
              className="mb-6 md:mb-8"
            />
            
            <div className="space-y-4">
              {certs.map((cert, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center p-5 rounded-2xl bg-secondary/50 border border-white/5 hover:border-primary/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4 shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-white">{cert.title}</h4>
                  </div>
                  <CheckCircle className="w-5 h-5 text-emerald-500 ml-auto opacity-50" />
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Decorative visual for certifications side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="hidden lg:flex justify-center relative"
          >
             <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-full blur-[80px]"></div>
             <div className="w-64 h-64 border-[10px] border-white/5 rounded-full relative z-10 flex items-center justify-center">
                <div className="w-48 h-48 border-[10px] border-primary/20 rounded-full flex items-center justify-center backdrop-blur-md">
                   <Award className="w-20 h-20 text-primary drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                </div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
