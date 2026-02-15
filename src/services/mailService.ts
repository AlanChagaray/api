import jwt from 'jsonwebtoken';
import { createTransport } from '../config/mailer';
import { ENV } from '../config/environment';

function getToken(idusuario: number, usuario: string) {
  return jwt.sign({ idusuario, usuario }, ENV.API_KEY, { expiresIn: '24h' });
}

export async function sendWelcomeEmail(email: string, usuario: string, idusuario: number) {
  const token = getToken(idusuario, usuario);
  const activationLink = `https://miapp.com/activate?token=${token}`;
  console.log('📩 Enviando email de bienvenida a:', email);
  console.log('🔗 Token de activación:', token);

  const transporter = createTransport();

  const mailOptions = {
    from: '"Mi App" <alanandreschagaray@gmail.com>',
    to: email,
    subject: 'Bienvenido a Mi App 🚀',
    html: `
      <h3>Hola ${usuario},</h3>
      <p>Creación de usuario en proceso.</p>
      <p>Para finalizar proceso debe activar su cuenta.</p>
      <p>Para ingresar haz click en el siguiente enlace para activar su cuenta (expira en 24 horas):</p>
      <a href="${activationLink}">${activationLink}</a>
    `,
  };
  await transporter.sendMail(mailOptions);
}

export async function sendCreatePassword(email: string, usuario: string, token: string) {
  const recoveryLink = `https://miapp.com/create-password?token=${token}`;
  console.log('📩 Enviando email de creación de contraseña a:', email);
  console.log('🔗 Token de creación de contraseña:', token);
  const transporter = createTransport();

  console.log(transporter.verify());

  const mailOptions = {
    from: '"Mi App" <alanandreschagaray@gmail.com>',
    to: email,
    subject: 'Creación de contraseña 🔐',
    html: `
      <h3>Hola ${usuario},</h3>
      <p>Se ha solicitado la creación de una contraseña para su cuenta.</p>
      <p>Para crear su contraseña, haga click en el siguiente enlace (expira en 15 minutos):</p>
      <a href="${recoveryLink}">${recoveryLink}</a>
    `,
  };
  await transporter.sendMail(mailOptions);
}

export async function sendRecoveryEmail(email: string, usuario: string, token:string) {
  const recoveryLink = `https://miapp.com/recover-password?token=${token}`;

  console.log('📩 Enviando email de recuperación de contraseña a:', email);
  const transporter = createTransport();
  const mailOptions = {
    from: '"Mi App" <alanandreschagaray@gmail.com>',
    to: email,
    subject: 'Recuperación de contraseña 🔐',
    html: `
      <h3>Hola ${usuario},</h3>
      <p>Se ha solicitado la recuperación de su contraseña.</p>
      <p>Para recuperar su contraseña, haga click en el siguiente enlace (expira en 15 minutos):</p>
      <a href="${recoveryLink}">${recoveryLink}</a>
    `,
  };
  await transporter.sendMail(mailOptions);
}