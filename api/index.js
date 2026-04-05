import express from "express"
import cors from "cors"
import nodemailer from "nodemailer"
import Anthropic from "@anthropic-ai/sdk"

const app = express()
app.use(cors())
app.use(express.json())

// Contact form route
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body
    
    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })
    
    await transporter.sendMail({
      from: process.env.GMAIL_EMAIL,
      to: process.env.GMAIL_EMAIL,
      replyTo: email,
      subject: `Portfolio Contact from ${name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    })
    
    res.json({ message: "Email sent successfully" })
  } catch (error) {
    res.status(500).json({ message: "Failed to send email" })
  }
})

// AI Chat route
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body
    
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    })
    
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: `You are Rizwan's AI assistant on his portfolio.
               Answer questions about Rizwan Alam:
               - Full Stack Developer
               - MCA student at Jamia Hamdard University
               - Skills: React, Next.js, Node.js, Python, Django
               - Email: mdrizwanalam21@gmail.com
               - Location: New Delhi, India
               Only answer what is asked. Be concise.`,
      messages: [
        { role: "user", content: message }
      ]
    })
    
    const reply = response.content[0].type === "text" 
      ? response.content[0].text 
      : "Sorry I could not process that."
    
    res.json({ message: reply })
  } catch (error) {
    res.status(500).json({ 
      message: "Sorry something went wrong." 
    })
  }
})

export default app
