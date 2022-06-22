import { Request, Response } from "express";
import { doctorService } from "../services";

class DoctorController {
  getAppointments = async (_: Request, res: Response) => {
    const appointments = await doctorService.getAppointments();

    return res.status(200).json({ appointments });
  };

  getClientById = async (req: Request, res: Response) => {
    const client = await doctorService.getClientById(req);

    return res.status(200).json(client);
  };

  appointmentStart = async (req: Request, res: Response) => {
    const startedAppointment = await doctorService.startAppointment(req);

    console.log(startedAppointment);

    return res.status(201).json({ ...startedAppointment });
  };
}

export default new DoctorController();
