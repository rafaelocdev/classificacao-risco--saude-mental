import nodemailer from "nodemailer";

const transportMailer = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "b69d916a20e9f3",
    pass: "73efc71d5a4323",
  },
});

export default transportMailer;
