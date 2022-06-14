import { Request, Response } from "express";
import { loginService } from "../services";

class LoginController {
  login = async (req: Request, res: Response) => {
    const token = await loginService.login(req);
    return res.status(200).json(token);
  };
}

export default new LoginController();
