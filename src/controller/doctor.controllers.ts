import { Request, Response } from "express";
import { doctorService } from "../services";

class DoctorController {
  getClientById = async (req: Request, res: Response) => {
    const doctor = new doctorService();
    const client = await doctor.getClientById(req);

    return res.status(200).json(client);
  };
}

export default new DoctorController();
