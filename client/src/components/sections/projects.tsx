import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, FolderKanban, ChevronDown, ChevronUp } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

type ProjectLink = { github?: string; demo?: string };

const projects = [
  {
    title: "CryptoTracker",
    description: "A real-time cryptocurrency dashboard fetching live price data from the CoinGecko API. Features dynamic price charts, market stats, and a fully responsive modern UI built with Tailwind CSS.",
    tags: ["JavaScript", "React", "Tailwind CSS", "CoinGecko API"],
    links: {
      github: "https://github.com/Rizalam12/CryptoTracker",
    } as ProjectLink,
    detail: {
      challenge: "Fetching and displaying live cryptocurrency data with performant UI updates.",
      solution: "CoinGecko API integration with React hooks, dynamic charts, and responsive Tailwind design.",
      result: "Smooth real-time dashboard handling multiple coins and timeframes with modern UI.",
    },
  },
  {
    title: "DashBoard",
    description: "A responsive admin dashboard UI built with React and Vite, featuring a sidebar, header, and modular component architecture. Demonstrates clean layout design and reusable React components.",
    tags: ["React", "JavaScript", "Vite", "CSS"],
    links: {
      github: "https://github.com/Rizalam12/DashBoard",
    } as ProjectLink,
    detail: {
      challenge: "Creating an intuitive, responsive admin interface with reusable components.",
      solution: "React + Vite with modular sidebar/header components and responsive CSS grid.",
      result: "Professional dashboard template ready for backend integration.",
    },
  },
  {
    title: "Build-A-Thon 2024",
    description: "Contributed to a hackathon event platform where participants can register, submit projects, and showcase their work. Built under time pressure with a focus on responsive design and smooth UX.",
    tags: ["HTML", "CSS", "JavaScript"],
    links: {
      github: "https://github.com/Rizalam12/Build-A-Thon2024",
    } as ProjectLink,
    detail: {
      challenge: "Rapid development of hackathon platform under tight deadline.",
      solution: "Vanilla HTML/CSS/JS with responsive design and smooth form interactions.",
      result: "Functional hackathon site enabling registration and project showcase.",
    },
  },
  {
    title: "FullStack in Django",
    description: "A full-stack tweet application built with Django, featuring custom user registration, authentication, CRUD operations, and Jinja2 templating. Demonstrates backend architecture and MVC design patterns.",
    tags: ["Python", "Django", "Jinja2", "MySQL"],
    links: {
      github: "https://github.com/Rizalam12/FullStack-in-Django",
    } as ProjectLink,
    detail: {
      challenge: "Implementing full authentication and CRUD for tweets with clean MVC structure.",
      solution: "Django models/views/templates with custom user auth and MySQL backend.",
      result: "Complete tweet app with user registration, login, and tweet management.",
    },
  },
  {
    title: "Web Scraping Tool",
    description: "An automated web scraping tool that extracts structured data from websites using BeautifulSoup and Scrapy. Demonstrates data extraction, parsing, and Python scripting skills.",
    tags: ["Python", "BeautifulSoup", "Scrapy"],
    links: {
      github: "https://github.com/Rizalam12/Web-Scraping",
    } as ProjectLink,
    detail: {
      challenge: "Efficiently scrape and parse unstructured web data reliably.",
      solution: "BeautifulSoup for parsing + Scrapy for scalable crawling and data extraction.",
      result: "Robust scraping tool outputting clean structured data from any website.",
    },
  },
  {
    title: "Learning Management System (LMS)",
    description: "Built a full-stack MERN application with authentication and role-based access control. Developed RESTful APIs and implemented CRUD operations using Node.js and MongoDB. Deployed with secure routing and responsive React frontend.",
    tags: ["MongoDB", "Express.js", "React.js", "Node.js", "MERN"],
    links: {
      github: "https://github.com/Rizalam12/LMS",
    } as ProjectLink,
    detail: {
      challenge: "Role-based access control and scalable CRUD for courses/users in MERN stack.",
      solution: "REST APIs with Node/Express, MongoDB auth, React frontend with protected routes.",
      result: "Full LMS with admin/student roles, course management, and responsive UI.",
    },
  },
  {
    title: "E-Commerce Web Application",
    description: "Developed a full-stack e-commerce platform using MongoDB, Express.js, React.js, and Node.js. Implemented authentication, product management, cart, and order processing features. Designed RESTful APIs and deployed with responsive user interface.",
    tags: ["MongoDB", "Express.js", "React.js", "Node.js", "MERN"],
    links: {
      github: "https://github.com/Rizalam12/Ecommerce",
    } as ProjectLink,
    detail: {
      challenge: "Secure e-commerce flow with cart, orders, auth, and payment simulation.",
      solution: "MERN stack with MongoDB products/orders, React cart UI, Node APIs.",
      result: "Complete e-commerce site with auth, cart, orders, and responsive design.",
    },
  },
];

function isPlaceholder(href: string | undefined): boolean {
  return !href || href === "#";
}

export function Projects() {
  return (
    <section id="projects" className="py-16 md:py-24 relative bg-secondary/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          title="Featured Projects"
          subtitle="Showcasing some of my recent work and personal projects."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const { title, description, tags, links, detail } = project;
  const hasRealLinks = links.github && !isPlaceholder(links.github);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.1 }}
      className="group glass-card hover-glow rounded-3xl p-8 flex flex-col h-full relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-transparent transition-all duration-500" />

      <div className="relative z-10 flex justify-between items-start mb-6">
        <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
          <FolderKanban className="w-7 h-7" />
        </div>
        <div className="flex gap-3">
          {links.github && (
            <a
              href={hasRealLinks ? links.github : "#"}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => !hasRealLinks && e.preventDefault()}
              className="text-muted-foreground hover:text-foreground transition-colors"
              title={hasRealLinks ? "View on GitHub" : "Add your repo link in the code"}
            >
              <Github className="w-6 h-6" />
            </a>
          )}
          {links.demo && links.demo.trim() !== "" && (
            <a
              href={links.demo}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              title="View demo"
            >
              <ExternalLink className="w-6 h-6" />
            </a>
          )}
        </div>
      </div>

      <div className="relative z-10 flex-grow">
        <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground text-lg leading-relaxed mb-5">{description}</p>

        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary/80 -ml-2"
            >
              {open ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-1" />
                  Less
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-1" />
                  Challenge / Solution / Result
                </>
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mt-4 p-4 rounded-xl bg-background/50 border border-primary/10 space-y-3 text-sm">
              <p><span className="font-semibold text-primary">Challenge:</span> {detail.challenge}</p>
              <p><span className="font-semibold text-primary">Solution:</span> {detail.solution}</p>
              <p><span className="font-semibold text-primary">Result:</span> {detail.result}</p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      <div className="relative z-10 flex flex-wrap gap-2 mt-auto pt-5 border-t border-white/5">
        {tags.map((tag, tIdx) => (
          <span
            key={tIdx}
            className="text-sm font-medium text-primary px-3 py-1 rounded-full bg-primary/10"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
