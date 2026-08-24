import "dotenv/config";
import nodemailer from "nodemailer";

const GMAIL_EMAIL = process.env.GMAIL_EMAIL?.trim() ?? "";
const GMAIL_APP_PASSWORD = (process.env.GMAIL_APP_PASSWORD ?? "").replace(/\s/g, "");

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendContactEmail(data: ContactMessage): Promise<boolean> {
  if (!GMAIL_EMAIL || !GMAIL_APP_PASSWORD) {
    console.warn("Email notifications are disabled: GMAIL_EMAIL or GMAIL_APP_PASSWORD is missing.");
    return false;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GMAIL_EMAIL,
      pass: GMAIL_APP_PASSWORD,
    },
  });

  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const message = escapeHtml(data.message).replace(/\n/g, "<br>");

  try {
    await transporter.sendMail({
      from: GMAIL_EMAIL,
      to: GMAIL_EMAIL,
      replyTo: data.email,
      subject: `New Contact Form Submission from ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong style="color: #666;">Name:</strong> ${name}</p>
            <p><strong style="color: #666;">Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong style="color: #666;">Message:</strong></p>
            <p style="background: white; padding: 15px; border-radius: 5px; margin-top: 10px;">${message}</p>
          </div>
          <p style="color: #999; font-size: 12px;">This email was sent from your portfolio contact form.</p>
        </div>
      `,
      text: `New Contact Form Submission\nName: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`,
    });
    return true;
  } catch (error) {
    console.error("Error sending contact email:", error);
    return false;
  }
}
