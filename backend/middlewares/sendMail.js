import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
// Créer un transporteur
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODE_CODE_SENDING_MAIL_ADDRESS, // Votre adresse email
    pass: process.env.NODE_CODE_SENDING_MAIL_PASSWORD, // Votre mot de passe
  },
});
