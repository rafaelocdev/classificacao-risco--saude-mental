import { Request, Response } from "express";
import { activationService } from "../services";

class ActivationController {
  activation = async (req: Request, res: Response) => {
    const activation_response = await activationService.getActivation(req);

    return res.status(200).json(activation_response);
  };
}

export default new ActivationController();
