import nodemailer from "nodemailer";


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

