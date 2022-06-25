import cron from "node-cron";
import { Appointment, OnDuty } from "../entities";
import { adminService, doctorService } from "../services";
import mailerService from "../services/mailer.service";
import dotenv from "dotenv";

dotenv.config();

class Monitoring {
  private openAppointmentsSerializer = (
    openAppointmentsGroup: Appointment[],
  ) => {
    return openAppointmentsGroup.map((appointment) => {
      return {
        id: appointment.id,
        patientName: appointment.queryMhRisk.client.name,
        risk: appointment.queryMhRisk.resultMhRisk.risk,
        evaluationDate: appointment.queryMhRisk.evaluationDate,
      };
    });
  };

  availableDoctorGroupsSendMail = (
    availableDoctorsGroup: OnDuty[],
    openAppointmentsGroup: Appointment[],
  ) => {
    const serializedOpenAppointments = this.openAppointmentsSerializer(
      openAppointmentsGroup,
    );

    availableDoctorsGroup.forEach((doctor) => {
      const mailData = {
        name: doctor.employee.name,
        currentDateTime: new Date(),
        appointments: serializedOpenAppointments,
        lengthAppointments: serializedOpenAppointments.length,
      };

      mailerService.pendingAppointmentsEmail(mailData);
    });
  };

  openAppointmentsAndNotificationDoctors = () => {
    cron.schedule(`*/${process.env.MINUTES_NOTIFICATION} * * * *`, async () => {
      const openAppointmentsGroup = await doctorService.getOpenAppointments();
      if (!openAppointmentsGroup.length) {
        console.log("There are not open appointments");
        return;
      }

      const availableDoctorsGroup = await adminService.getAvailableDoctors();

      if (!availableDoctorsGroup.length) {
        console.log(
          `There are ${openAppointmentsGroup.length} open appointments but no doctor available`,
        );
        return;
      }

      console.log(
        `There are ${openAppointmentsGroup.length} open appointments`,
      );

      this.availableDoctorGroupsSendMail(
        availableDoctorsGroup,
        openAppointmentsGroup,
      );
    });
  };
}

export default new Monitoring();
