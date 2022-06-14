import { Request, Response } from "express";
import { adminService } from "../services";

class AdminController {
  updateClient = async (req: Request, res: Response) => {
    const updatedUser = await adminService.updateClient(req);

    return res.status(200).json(updatedUser);
  };
}

export default new AdminController();
