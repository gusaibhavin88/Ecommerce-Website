import nodemailer from "nodemailer";

export const sendMail = async (email, subject, message) => {
  // Create a transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "may.waelchi@ethereal.email",
      pass: "ZWjb1wAUZYMAzWmEwZ",
    },
  });

  // Define the email content
  const mailOptions = {
    from: "may.waelchi@ethereal.email", // Sender address
    to: email, // List of recipients - Ensure email is a valid email address
    subject: subject, // Subject line
    text: message, // Plain text body
  };

  // Send the email
  const info = await transporter.sendMail(mailOptions);
  console.log("Email sent:", info.response);
};
