import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   host: "smtp.sendgrid.net",
//   port: 587,
//   secure: false,
//   auth: {
//     user: "apikey",
//     pass: process.env.SENDGRID_API_KEY, // ⚠️ Mejor usar variable de entorno
//   },
// });

export function createTransport() {
  return nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    secure: false, // true para 465, false para 587 (STARTTLS)
    auth: {
        user: "apikey",
        pass: process.env.SENDGRID_API_KEY,
          // tu API Key real de SendGrid
    },
  });
}

