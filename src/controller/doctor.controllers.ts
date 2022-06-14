import { Request, Response } from "express";
import { doctorService } from "../services";

class DoctorController {
  getById = async (req: Request, res: Response) => {
    const doctor = new doctorService();
    const client = await doctor.getById(req);

    return res.status(200).json(client);
  };
}

export default new DoctorController();
