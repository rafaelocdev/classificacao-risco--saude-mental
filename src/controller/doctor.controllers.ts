import { Request, Response } from "express";
import { doctorService } from "../services";

class DoctorController {
  getClientById = async (req: Request, res: Response) => {
    const doctor = new doctorService();
    const client = await doctor.getClientById(req);

    return res.status(200).json(client);
  };

  finishAppointment = async (req: Request, res: Response) => {
    const doctor = new doctorService();
    const updatedAppointment = await doctor.finishAppointment(req);

    return res.status(200).json(updatedAppointment);
  };
}

export default new DoctorController();
