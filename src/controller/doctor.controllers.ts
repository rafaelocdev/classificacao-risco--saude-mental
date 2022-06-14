import { Request, Response } from "express";
import { doctorService } from "../services";

class DoctorController {
  getAppointments = async (_: Request, res: Response) => {
    const appointments = await doctorService.getAppointments();

    return res.status(200).json({ appointments });
  };
}

export default new DoctorController();
