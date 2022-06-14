import { appointmentRepo } from "../repositories";

class DoctorService {
  getAppointments = async () => {
    const appointments = await appointmentRepo.listAll();

    return appointments;
  };
}

export default new DoctorService();
