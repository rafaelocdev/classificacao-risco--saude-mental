import { Request, Response } from "express";
import { nurseService } from "../services";

export class NurseController {

    createQueryMhRisk = async (req: Request, res: Response) => {
        const newQuery = await nurseService.createQueryMhRisk(req);

        return res.status(201).json(newQuery);
    }
}


export default new NurseController();