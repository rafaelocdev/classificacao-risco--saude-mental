import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transportMailer = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export default transportMailer;
