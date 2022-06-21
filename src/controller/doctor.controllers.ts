import { Request, Response } from "express";
import { doctorService } from "../services";

class DoctorController {
  getClientById = async (req: Request, res: Response) => {
    const client = await doctorService.getClientById(req);

    return res.status(200).json(client);
  };

  appointmentStart = async (req: Request, res: Response) => {
    const startedAppointment = await doctorService.startAppointment(req);

    return res.status(201).json({ appointment: startedAppointment });
  };
}

export default new DoctorController();
