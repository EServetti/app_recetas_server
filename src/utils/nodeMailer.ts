import { createTransport } from "nodemailer";

export const sendVerifyMail = async () => {
  try {
    const transport = createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASSWORD },
    });
    
  } catch (error) {
    throw error;
  }
};
