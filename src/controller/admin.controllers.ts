import { Request, Response } from "express";
import { adminService } from "../services";

class AdminController {
  registerClient = async (req: Request, res: Response) => {
    const newClient = await adminService.registerClient(req);

    return res.status(201).json(newClient);
  };

  getAllEmployees = async (_: Request, res: Response) => {
    const employees = await adminService.getAllEmployees();

    return res.status(200).json({ employees });
  };

  updateClient = async (req: Request, res: Response) => {
    const updatedUser = await adminService.updateClient(req);

    return res.status(200).json(updatedUser);
  };

  getClients = async (req: Request, res: Response) => {
    const clients = await adminService.getClients();

    return res.status(200).json({ clients });
  };

  deleteClient = async (req: Request, res: Response) => {
    const { clientId } = req.params;
    const deletedClient = await adminService.deleteClient(clientId);

    return res.status(200).json(deletedClient);
  };
}

export default new AdminController();
