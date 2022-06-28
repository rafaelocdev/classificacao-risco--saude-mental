import path from "path";
import hbs from "nodemailer-express-handlebars";
import transportMailer from "../config/mailer.config";
import { ErrorHandler } from "../errors/errors";

interface IReceivedUserData {
  name: string;
  subscription?: string;
  register?: string;
  specialty?: string;
  job?: string;
  code: string;
  data: Partial<IData>;
}

interface IData {
  cpf: string;
  birthday: string;
  gender: string;
  email: string;
  mobile: string;
  street: string;
  number: string;
  complement: string;
  zip: string;
  city: string;
  state: string;
}

interface IAppointmentEmail {
  id: string;
  patientName: string;
  risk: string;
  evaluationDate: Date;
}

interface IPendingEmail {
  name: string;
  currentDateTime: Date;
  appointments: IAppointmentEmail[];
  lengthAppointments: number;
}

class mailerService {
  private handlebarOptions = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: path.resolve("./src/views/"),
      partialsDir: path.resolve("./src/views/"),
      defaultLayout: "",
    },
    viewPath: path.resolve("./src/views/"),
  };

  private mailSender = (mailOptions) => {
    transportMailer.sendMail(mailOptions, (err) => {
      if (err) {
        throw new ErrorHandler(424, "Email could not be sent.");
      }
    });

    return { message: "Email sent successfully." };
  };

  welcomeEmail = (user: IReceivedUserData) => {
    transportMailer.use("compile", hbs(this.handlebarOptions));

    const mailOptions = {
      from: "sender@mail.com",
      to: "receiver@mail.com",
      subject: "Sign Up Confirmation",
      template: "welcomeEmail",
      context: {
        name: user.name,
        subscription: user.subscription,
        register: user.register,
        specialty: user.specialty,
        job: user.job,
        cpf: user.data.cpf,
        birthday: user.data.birthday,
        gender: user.data.gender,
        email: user.data.email,
        mobile: user.data.mobile,
        street: user.data.street,
        number: user.data.number,
        complement: user.data.complement,
        zip: user.data.zip,
        city: user.data.city,
        state: user.data.state,
        code: user.code,
      },
    };

    return this.mailSender(mailOptions);
  };

  pendingAppointmentsEmail = (data: IPendingEmail) => {
    transportMailer.use("compile", hbs(this.handlebarOptions));

    const mailOptions = {
      from: "sender@mail.com",
      to: "receiver@mail.com",
      subject: "Pending Appointment",
      template: "appointmentsEmail",
      context: {
        name: data.name,
        currentDateTime: data.currentDateTime,
        appointments: data.appointments,
        lengthAppointments: data.lengthAppointments,
      },
    };

    return this.mailSender(mailOptions);
  };
}

export default new mailerService();
