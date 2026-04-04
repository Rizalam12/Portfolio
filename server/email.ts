import nodemailer from "nodemailer";

const GMAIL_EMAIL = "mdrizwanalam21@gmail.com";
const GMAIL_APP_PASSWORD = "bmeb cljq brkt oxng";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_EMAIL,
    pass: GMAIL_APP_PASSWORD,
  },
});

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export async function sendContactEmail(data: ContactMessage): Promise<boolean> {
  try {
    const mailOptions = {
      from: GMAIL_EMAIL,
      to: GMAIL_EMAIL,
      replyTo: data.email,
      subject: `New Contact Form Submission from ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong style="color: #666;">Name:</strong> ${data.name}</p>
            <p><strong style="color: #666;">Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            <p><strong style="color: #666;">Message:</strong></p>
            <p style="background: white; padding: 15px; border-radius: 5px; margin-top: 10px;">${data.message.replace(/\n/g, "<br>")}</p>
          </div>
          <p style="color: #999; font-size: 12px;">This email was sent from your portfolio contact form.</p>
        </div>
      `,
      text: `
New Contact Form Submission
Name: ${data.name}
Email: ${data.email}
Message: ${data.message}
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending contact email:", error);
    return false;
  }
}