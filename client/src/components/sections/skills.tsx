import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { Database, Layout, Server, Settings, TerminalSquare, Cloud, Code } from "lucide-react";

export function Skills() {
  const skillCategories = [
    {
      title: "Frontend",
      icon: <Layout className="w-6 h-6" />,
      skills: ["HTML5", "CSS3", "JavaScript (ES6+)", "React.js", "Next.js", "Tailwind CSS"],
      color: "from-blue-500/20 to-cyan-500/20",
      textColor: "text-cyan-400"
    },
    {
      title: "Backend",
      icon: <Server className="w-6 h-6" />,
      skills: ["Node.js", "Express.js", "Python", "Django", "RESTful API"],
      color: "from-green-500/20 to-emerald-500/20",
      textColor: "text-emerald-400"
    },
    {
      title: "Databases & Cloud",
      icon: <Database className="w-6 h-6" />,
      skills: ["MongoDB", "MySQL", "MongoDB Atlas"],
      color: "from-orange-500/20 to-amber-500/20",
      textColor: "text-amber-400"
    },
    {
      title: "Deployment & Tools",
      icon: <Cloud className="w-6 h-6" />,
      skills: ["Vercel", "Render", "Git", "GitHub", "VS Code", "Cursor AI"],
      color: "from-purple-500/20 to-pink-500/20",
      textColor: "text-pink-400"
    },
    {
      title: "Concepts",
      icon: <TerminalSquare className="w-6 h-6" />,
      skills: ["Data Structures", "OOP", "REST APIs"],
      color: "from-indigo-500/20 to-violet-500/20",
      textColor: "text-violet-400"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <section id="skills" className="py-16 md:py-24 relative bg-secondary/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading 
          title="Technical Arsenal" 
          subtitle="The technologies and tools I use to build robust digital solutions." 
        />

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {skillCategories.map((category, idx) => (
            <motion.div 
              key={idx} 
              variants={item}
              className="glass-card hover-glow rounded-3xl p-8"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center ${category.textColor} mb-6`}>
                {category.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, sIdx) => (
                  <span 
                    key={sIdx} 
                    className="px-3 py-1.5 bg-background border border-white/5 rounded-lg text-sm text-muted-foreground hover:text-white hover:border-white/20 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
