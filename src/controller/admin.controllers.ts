import { Request, Response } from "express";
import { adminService } from "../services";

export class AdminController {
  registerClient = async (req: Request, res: Response) => {
    const newClient = await adminService.registerClient(req);

    return res.status(201).json(newClient);
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

  registerEmployee = async (req: Request, res: Response) => {
    const newEmployee = await adminService.registerEmployee(req);

    return res.status(201).json(newEmployee);
  };

  getAllEmployees = async (_: Request, res: Response) => {
    const employees = await adminService.getAllEmployees();

    return res.status(200).json({ employees });
  };
}

export default new AdminController();
