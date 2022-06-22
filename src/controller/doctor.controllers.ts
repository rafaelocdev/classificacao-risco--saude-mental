import { Request, Response } from "express";
import { doctorService } from "../services";

class DoctorController {
  getAppointments = async (_: Request, res: Response) => {
    const appointments = await doctorService.getAppointments();

    return res.status(200).json({ appointments });
  };

  getClientById = async (req: Request, res: Response) => {
    // const doctor = new doctorService();
    // const client = await doctor.getClientById(req);
    const client = await doctorService.getClientById(req);

    return res.status(200).json(client);
  };
}

export default new DoctorController();
