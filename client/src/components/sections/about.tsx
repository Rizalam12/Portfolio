import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { GraduationCap, Code, Globe } from "lucide-react";

export function About() {
  const education = [
    {
      degree: "Master of Computer Applications (MCA)",
      school: "Jamia Hamdard University, New Delhi",
      year: "Expected 2026",
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      school: "Ranchi University, Jharkhand",
      year: "2020 – 2023",
      grade: "CGPA: 7.97",
    }
  ];

  return (
    <section id="about" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading 
          title="About Me" 
          subtitle="A practical developer who cares about product quality, performance and the details users notice." 
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6 text-muted-foreground text-lg leading-relaxed"
          >
            <p>
              I’m a Software Engineer and MCA student with hands-on full-stack experience. I build responsive products, integrate REST APIs, and work across frontend and backend systems to turn requirements into reliable features.
            </p>
            <p>
              My work spans React, Next.js, Node.js, Express, Python and Django, with MongoDB and MySQL behind the scenes. I enjoy taking a feature from interface to API to deployment and making each layer feel intentional.
            </p>
            <p className="text-base">
              <span className="font-semibold text-foreground">Outside of code</span>, I keep learning through new tools, side projects and real-world product problems. I’m open to full-time roles and freelance work where I can contribute quickly and grow with a strong team.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mt-6 pt-6 border-t border-white/5">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Code className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Clean Code</h4>
                  <p className="text-sm">Writing maintainable and scalable architectures.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Web Perf</h4>
                  <p className="text-sm">Optimizing applications for speed and SEO.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="glass-card rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[50px]"></div>
              
              <div className="flex items-center gap-3 mb-8">
                <GraduationCap className="w-8 h-8 text-primary" />
                <h3 className="text-2xl font-display font-bold text-white">Education</h3>
              </div>

              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                {education.map((edu, idx) => (
                  <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    {/* Icon/Dot */}
                    <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-primary bg-background absolute left-0 md:left-1/2 -translate-x-1/2 z-10 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                    
                    {/* Content Card */}
                    <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-2xl bg-secondary/50 border border-white/5 group-hover:border-primary/30 transition-colors ml-auto md:ml-0 md:group-odd:mr-auto">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-medium text-primary mb-1">{edu.year}</span>
                        <h4 className="font-bold text-lg text-white">{edu.degree}</h4>
                        <p className="text-muted-foreground">{edu.school}</p>
                        {edu.grade && (
                          <span className="inline-block mt-2 text-xs px-2 py-1 bg-white/5 rounded-md w-fit border border-white/10">
                            {edu.grade}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
