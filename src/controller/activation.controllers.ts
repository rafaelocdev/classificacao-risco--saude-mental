import { Request, Response } from "express";
import path from "path";
import { activationService } from "../services";

class ActivationController {
  activation = async (req: Request, res: Response) => {
    const activation_response = await activationService.getActivation(req);

    // return res.status(200).json(activation_response);

    return res.sendFile(
      path.join(__dirname + "/../templates/activationPage/index.html")
    );
  };
}

export default new ActivationController();
