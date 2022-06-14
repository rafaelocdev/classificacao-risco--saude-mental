import { Request, Response } from "express";
import { adminService } from "../services";

export class AdminController {

    getAllEmployees = async (_:Request, res: Response) =>{
        const employees = await adminService.getAllEmployees();

        return res.status(200).json({ employees });
    }
}


export default new AdminController();