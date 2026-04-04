import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { sendContactEmail } from "./email";

// Portfolio data for chatbot - keep facts granular so we can answer only what is asked
const portfolioData = {
  about: `Md Rizwan Alam, a passionate Full Stack Developer and MCA student at Jamia Hamdard University, New Delhi. He specializes in building scalable web applications, integrating REST APIs, and optimizing system performance, with experience in React, Next.js, Node.js, Express, Python, Django, MongoDB Atlas, Vercel, Render, and OOP concepts.`,

  education: {
    full: `Master of Computer Applications (MCA) - Jamia Hamdard University, New Delhi (Expected 2026). Bachelor of Computer Applications (BCA) - Ranchi University, Jharkhand (2020-2023) with CGPA: 7.97`,
    degree: `MCA (expected 2026) from Jamia Hamdard University, and BCA (2020-2023) from Ranchi University with CGPA 7.97.`,
    university: `Jamia Hamdard University, New Delhi (MCA) and Ranchi University, Jharkhand (BCA).`,
    cgpa: `7.97 (BCA from Ranchi University).`,
  },

  skills: {
    full: `Frontend: HTML5, CSS3, JavaScript, React.js, Next.js, Tailwind CSS. Backend: Node.js, Express.js, Python, Django. Databases: MongoDB, MySQL, MongoDB Atlas. Deployment: Vercel, Render. Tools: Git, VS Code. Concepts: REST APIs, Data Structures, OOP.`,
    frontend: `HTML5, CSS3, JavaScript, React.js, Tailwind CSS.`,
    backend: `Node.js, Python, Django, Express.`,
    database: `MySQL, SQLite, PostgreSQL.`,
  },

  projects: {
    full: `1. CryptoTracker (React, CoinGecko API). 
    2. Dashboard (React, Vite).
     3. Build-A-Thon 2024 (HTML/CSS/JS hackathon site). 
     4. FullStack Django (Django tweet app).
      5. Web Scraping (BeautifulSoup/Scrapy).
       6. LMS (MERN stack). 
       7. Ecommerce (MERN full-stack shop).`,
    cryptotracker: `CryptoTracker - Real-time crypto dashboard with CoinGecko API, React.js, Tailwind CSS.`,
    dashboard: `Dashboard - Responsive admin UI with React + Vite.`,
    buildathon: `Build-A-Thon 2024 - Hackathon platform (HTML/CSS/JS).`,
    fullstackdjango: `FullStack Django - Tweet app with auth/CRUD (Django, MySQL).`,
    webscraping: `Web Scraping Tool - Data extraction (BeautifulSoup, Scrapy).`,
    lms: `LMS - MERN learning management system with auth/roles.`,
    ecommerce: `Ecommerce - Full MERN shop with cart/orders/auth.`,
  },

  experience: {
    full: `Full Stack Developer Intern at Blue Planet, Pune (July 2025 - Dec 2025). WordPress Developer Intern at FADWRAP, Chandigarh (Sept 2022 - Mar 2023).`,
    current: `Full Stack Developer Intern at Blue Planet, Pune (July 2025 - Dec 2025).`,
    companies: `Blue Planet (Pune) and FADWRAP (Chandigarh).`,
  },

  certifications: `AWS Educate – Cloud 101 (Amazon Web Services), and Python Using AI (Fundamentals).`,

  contact: {
    email: `mdrizwanalam21@gmail.com`,
    phone: `+91 6206712882`,
    location: `New Delhi, India`,
    linkedin: `https://www.linkedin.com/in/mdrizwanalam`,
    github: `https://github.com/Rizalam12`,
    full: `Phone: +91 6206712882 | Email: mdrizwanalam21@gmail.com | Location: New Delhi, India | LinkedIn: linkedin.com/in/mdrizwanalam | GitHub: github.com/Rizalam12`,
  },
};

function generateAIResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase().trim();
  if (!msg) return "What would you like to know about Rizwan?";

  // Greeting / help — short reply, no info dump
  if (/^(hi|hello|hey|hiya|yo)\s*!*$/.test(msg) || msg === "help" || msg === "what can you do") {
    return "Hi! I can answer questions about Rizwan—his skills, projects, experience, education, certifications, or contact. What do you want to know?";
  }

  // Contact — answer only what was asked
  if (/\b(email|e-?mail|mail id|gmail)\b/.test(msg) && !/\b(phone|number|linkedin|github|location|where)\b/.test(msg)) {
    return portfolioData.contact.email;
  }
  if (/\b(phone|number|mobile|call|contact number)\b/.test(msg) && !/\b(email|linkedin|github)\b/.test(msg)) {
    return portfolioData.contact.phone;
  }
  if (/\b(linkedin|linked in)\b/.test(msg)) {
    return portfolioData.contact.linkedin;
  }
  if (/\b(github|git hub|repository|repos)\b/.test(msg)) {
    return portfolioData.contact.github;
  }
  if (/\b(location|where (does he )?live|city|address|based|from)\b/.test(msg)) {
    return portfolioData.contact.location;
  }
  if (/\b(contact|reach|get in touch|how to (contact|reach)|connect)\b/.test(msg)) {
    return portfolioData.contact.full;
  }

  // Education — only what was asked
  if (/\b(cgpa|grade|gpa|score)\b/.test(msg)) {
    return portfolioData.education.cgpa;
  }
  if (/\b(university|college|institute|where (did he )?study|school)\b/.test(msg)) {
    return portfolioData.education.university;
  }
  if (/\b(degree|qualification|education|study|studied|mca|bca)\b/.test(msg)) {
    return portfolioData.education.degree;
  }

  // Skills — only what was asked
  if (/\b(frontend|front-?end|react|ui)\b/.test(msg) && !/\b(backend|full stack)\b/.test(msg)) {
    return portfolioData.skills.frontend;
  }
  if (/\b(backend|back-?end|node|django|server)\b/.test(msg) && !/\b(frontend)\b/.test(msg)) {
    return portfolioData.skills.backend;
  }
  if (/\b(database|db|sql)\b/.test(msg)) {
    return portfolioData.skills.database;
  }
  if (/\b(skill|technology|tech stack|technologies|tools|what (does he )?know|expertise)\b/.test(msg)) {
    return portfolioData.skills.full;
  }

  // Projects — only what was asked
  if (/\b(crypto(tracker)?|cryptotracker)\b/.test(msg)) {
    return portfolioData.projects.cryptotracker;
  }
  if (/\b(dashboard|admin)\b/.test(msg)) {
    return portfolioData.projects.dashboard;
  }
  if (/\b(build.?athon|hackathon)\b/.test(msg)) {
    return portfolioData.projects.buildathon;
  }
  if (/\b(fullstack.*django|django|tweets?\b)\b/.test(msg)) {
    return portfolioData.projects.fullstackdjango;
  }
  if (/\b(web ?scrap(e|ing)|beautifulsoup|scrapy)\b/.test(msg)) {
    return portfolioData.projects.webscraping;
  }
  if (/\b(lms|learning|management system)\b/.test(msg)) {
    return portfolioData.projects.lms;
  }
  if (/\b(ecommerce|e-?commerce|shop|cart)\b/.test(msg)) {
    return portfolioData.projects.ecommerce;
  }
  if (/\b(project|work|built|portfolio|what (has he )?built)\b/.test(msg)) {
    return portfolioData.projects.full;
  }

  // Experience — only what was asked
  if (/\b(company|companies|where (does he )?work|employer)\b/.test(msg)) {
    return portfolioData.experience.companies;
  }
  if (/\b(current|present|now|internship)\b/.test(msg)) {
    return portfolioData.experience.current;
  }
  if (/\b(experience|job|intern|work history|career)\b/.test(msg)) {
    return portfolioData.experience.full;
  }

  // Certifications
  if (/\b(certification|certificate|award|aws|python)\b/.test(msg)) {
    return portfolioData.certifications;
  }

  // About / who is Rizwan
  if (/\b(about|who (is|are)|yourself|introduce|tell me about)\b/.test(msg)) {
    return portfolioData.about;
  }

  // Default: do not dump all info — ask what they want
  return "I can tell you about Rizwan's skills, projects, experience, education, certifications, or contact details. What would you like to know?";
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post(api.messages.create.path, async (req, res) => {
    try {
      const input = api.messages.create.input.parse(req.body);
      if (input.website && input.website.trim()) {
        return res.status(400).json({ message: "Invalid request.", field: "form" });
      }
      const { website: _, ...data } = input;
      const message = await storage.createMessage(data);
      
      // Send email notification
      const emailSent = await sendContactEmail({
        name: data.name,
        email: data.email,
        message: data.message,
      });
      
      res.status(201).json({ ...message, emailSent });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.get(api.chat.list.path, async (_req, res) => {
    const messages = await storage.getChatMessages();
    res.json(messages.reverse());
  });

  app.post(api.chat.create.path, async (req, res) => {
    try {
      const { message } = api.chat.create.input.parse(req.body);
      
      // Store user message
      await storage.createChatMessage({ role: 'user', content: message });

      // Use AI response generator based on portfolio data
      const aiResponse = generateAIResponse(message);
      
      const assistantMsg = await storage.createChatMessage({
        role: 'assistant', 
        content: aiResponse 
      });

      res.json({ message: assistantMsg.content });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete(api.chat.reset.path, async (_req, res) => {
    await storage.clearChatMessages();
    res.json({ ok: true });
  });

  return httpServer;
}
