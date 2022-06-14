import { Request, Response } from "express";
import { adminService } from "../services";

export class AdminController {
  
    registerClient = async (req: Request, res: Response) => {
      const newClient = await adminService.registerClient(req);

      return res.status(201).json(newClient);
    };

    getAllEmployees = async (_:Request, res: Response) =>{
        const employees = await adminService.getAllEmployees();

        return res.status(200).json({ employees });
    }
}


export default new AdminController();

