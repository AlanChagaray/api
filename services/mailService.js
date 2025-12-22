// import nodemailer, { createTransport } from "nodemailer";
import jwt from "jsonwebtoken";
import { createTransport } from "../config/mailer.js";

const API_KEY = process.env.API_KEY;

function getToken(idusuario, usuario) {
  return jwt.sign({ idusuario, usuario }, API_KEY, { expiresIn: "15m" });
}

export async function sendWelcomeEmail(email, usuario, idusuario) {
    console.log("📩 Email recibido en función:", email);

  // const token = jwt.sign({ idusuario, usuario }, API_KEY, { expiresIn: "15m" });
  const token = getToken(idusuario, usuario);
  const activationLink = `https://miapp.com/activate?token=${token}`;

  // Configuramos transporte SMTP (puede ser Gmail o tu proveedor)
  // const transporter = nodemailer.createTransport({
  //   host: "smtp.sendgrid.net",
  //   port: 587,
  //   secure: false, // true para 465, false para 587 (STARTTLS)
  //   auth: {
  //       user: "apikey", // este literal, siempre va así
  //       pass: "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",
  //        // tu API Key real de SendGrid
  //   },
  // });

  const transporter = createTransport();

  const mailOptions = {
    from: '"Mi App" <alanandreschagaray@gmail.com>',
    to: email,
    subject: "Bienvenido a Mi App 🚀",
    html: `
      <h3>Hola ${usuario},</h3>
      <p>Se creó tu usuario correctamente.</p>
      <p>Para ingresar haz click en el siguiente enlace (expira en 15 minutos):</p>
      <a href="${activationLink}">${activationLink}</a>
    `,
  };
  await transporter.sendMail(mailOptions);
}

export async function sendRecoveryEmail(email, usuario, idusuario) {
  console.log("📩 Email de recuperación recibido en función:", email);
}