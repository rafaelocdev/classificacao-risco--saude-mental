import { Request, Response } from "express";
import { adminService } from "../services";

export default new (class AdminController {
  getClients = async (req: Request, res: Response) => {
    const clients = await adminService.getClients();

    return res.status(200).json({ clients });
  };
})();
