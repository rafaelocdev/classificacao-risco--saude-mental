import { Request, Response } from "express";
import { adminService } from "../services";

export default class AdminController {
  getClients = async (req: Request, res: Response) => {
    const clients = await adminService.getClients(req);
    return res.status(200).json({ clients });
  };
}
