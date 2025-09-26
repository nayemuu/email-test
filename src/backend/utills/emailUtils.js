import nodemailer from "nodemailer";

/**
 * Send email using Gmail & Nodemailer
 * @param {Object} options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.text - Plain text content
 * @param {string} [options.html] - HTML content (optional)
 */
export const sendEmail = async ({ to, subject, text, html }) => {
  console.log("inside sendEmail");
  console.log(
    "NODEMAILER_GMAIL_USER = ",
    process.env.NEXT_PUBLIC_NODEMAILER_GMAIL_USER
  );
  console.log(
    "NODEMAILER_GMAIL_PASS = ",
    process.env.NEXT_PUBLIC_NODEMAILER_GMAIL_PASS
  );
  try {
    // 1. Create a transporter
    // Render is blocking outbound SMTP traffic on port 465/587 for Gmail and other common mail providers.
    const transporter = nodemailer.createTransport({
      pool: true,
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // use TLS
      auth: {
        user: process.env.NODEMAILER_GMAIL_USER, // Your Gmail
        pass: process.env.NODEMAILER_GMAIL_PASS, // App password (not your Gmail password!)
      },
    });

    // 2. Mail options
    const mailOptions = {
      from: `Blogify`,
      to,
      subject,
      text,
      html,
    };

    // 3. Send mail
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent");
    return info;
  } catch (error) {
    console.error("Email sending failed:", error);
  }
};
