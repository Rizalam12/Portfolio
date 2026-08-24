import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { Briefcase } from "lucide-react";

export function Experience() {
  const experiences = [
{
      role: "Full-Stack Developer Intern",
      company: "Blue Planet",
      location: "Pune, India",
      period: "Nov 2025 – Apr 2026",
      highlights: [
        "Built and deployed full-stack applications using React.js, Next.js, and Node.js.",
        "Integrated REST APIs and implemented Claude AI features to enhance application functionality.",
        "Used Cursor AI and Git to improve development efficiency and performance."
      ]
    },
    {
      role: "WordPress Developer Intern",
      company: "FADWRAP",
      location: "Chandigarh",
      period: "Sept 2022 – Mar 2023",
      highlights: [
        "Developed 15+ client websites using WordPress, Bootstrap, HTML, CSS, and JavaScript.",
        "Increased website traffic by 50% using modern SEO techniques.",
        "Built responsive and highly optimized web interfaces across all devices."
      ]
    }
  ];

  return (
    <section id="experience" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading 
          title="Work Experience" 
          subtitle="Professional journey and industry impact." 
        />

        <div className="space-y-6 lg:w-3/4">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="glass-card hover-glow rounded-3xl p-8 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[60px] group-hover:bg-primary/10 transition-colors"></div>
              
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-primary mt-1 shrink-0">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
                    <p className="text-lg text-primary font-medium">{exp.company} <span className="text-muted-foreground font-normal text-base ml-2">• {exp.location}</span></p>
                  </div>
                </div>
                <div className="sm:text-right">
                  <span className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>
              </div>

              <ul className="relative z-10 space-y-3 mt-6">
                {exp.highlights.map((item, iIdx) => (
                  <li key={iIdx} className="flex items-start gap-3 text-muted-foreground text-base">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
