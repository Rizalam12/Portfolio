const express = require("express")
const cors = require("cors")
const nodemailer = require("nodemailer")
const Anthropic = require("@anthropic-ai/sdk")

const app = express()
app.use(cors())
app.use(express.json())

// Chat route
app.post("/api/chat", async (req, res) => {
  return handleChat(req, res)
})

app.post("/api/messages", async (req, res) => {
  return handleChat(req, res)
})

async function handleChat(req, res) {
  try {
    const { message } = req.body

    if (!message) {
      return res.status(400).json({ 
        message: "Message is required" 
      })
    }

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    })

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: `You are Rizwan's AI assistant 
               on his portfolio website.
               Answer only questions about:
               Name: Md Rizwan Alam
               Role: Full Stack Developer
               Skills: React, Next.js, Node.js,
                       Python, Django, MongoDB
               Education: MCA Jamia Hamdard 2026
               Location: New Delhi India
               Email: mdrizwanalam21@gmail.com
               Be concise and professional.`,
      messages: [
        { role: "user", content: message }
      ]
    })

    const reply = response.content[0].type === "text"
      ? response.content[0].text
      : "Sorry I could not process that."

    res.json({ message: reply })

  } catch (error) {
    console.error("Chat error:", error)
    res.status(500).json({
      message: "Sorry something went wrong.",
      error: error.message
    })
  }
})

// Contact route
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
    console.error("Email error:", error)
    res.status(500).json({ 
      message: "Failed to send email" 
    })
  }
})

module.exports = app
