import nodemailer from "nodemailer";
import { ENV } from "./environment";

// const transporter = nodemailer.createTransport({
//   host: "smtp.sendgrid.net",
//   port: 587,
//   secure: false,
//   auth: {
//     user: "apikey",
//     pass: process.env.SENDGRID_API_KEY, // ⚠️ Mejor usar variable de entorno
//   },
// });

export const createTransport = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    secure: false, 
    auth: {
        user: "alanandreschagaray@gmail.com",
        pass: process.env.MAIL_API_KEY
    },
  });
}

console.log(
  'MAIL_API_KEY loaded:',
  ENV.MAIL_API_KEY ? 'YES' : 'NO'
);


