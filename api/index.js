const express = require("express")
const cors = require("cors")
const nodemailer = require("nodemailer")
const Anthropic = require("@anthropic-ai/sdk")

const app = express()

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}))
app.use(express.json())

// ✅ Handle both /api/chat and /api/messages
async function handleChat(req, res) {
  try {
    const { message } = req.body

    if (!message) {
      return res.status(400).json({
        message: "Message is required"
      })
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return res.status(500).json({
        message: "API key not configured"
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
               Answer questions about Rizwan Alam:
               - Full Stack Developer
               - MCA student Jamia Hamdard 2026
               - Skills: React Next.js Node.js
                 Python Django MongoDB
               - Location: New Delhi India
               - Email: mdrizwanalam21@gmail.com
               Be concise and professional.`,
      messages: [
        { role: "user", content: message }
      ]
    })

    const reply = response.content[0].type === "text"
      ? response.content[0].text
      : "Sorry I could not process that."

    return res.json({ message: reply })

  } catch (error) {
    console.error("Chat error:", error.message)
    return res.status(500).json({
      message: "Sorry something went wrong.",
      error: error.message
    })
  }
}

// ✅ Both routes handle same function
app.post("/api/chat", handleChat)
app.post("/api/messages", handleChat)

// ✅ Contact form
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body

    if (!name || !email || !message) {
      return res.status(400).json({
        message: "All fields are required"
      })
    }

    const transporter = nodemailer.createTransport({
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

    return res.json({ message: "Email sent successfully" })

  } catch (error) {
    console.error("Email error:", error.message)
    return res.status(500).json({
      message: "Failed to send email",
      error: error.message
    })
  }
})

module.exports = app
