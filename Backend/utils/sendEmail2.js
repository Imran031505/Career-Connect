import nodemailer from "nodemailer";

export const sendEmail2 = async (to, subject, htmlContent) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail", // or any other email provider like 'Outlook', 'Yahoo'
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Career Connect" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: htmlContent, // 👈 Important: send HTML here
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
