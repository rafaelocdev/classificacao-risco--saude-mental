import { Request, Response } from "express";
import { adminService } from "../services";
import mailerService from "../services/mailer.service";

class AdminController {
  registerClient = async (req: Request, res: Response) => {
    const { clientReturn, clientConfirmationCode } =
      await adminService.registerClient(req);

    const message = await mailerService.welcomeEmail({
      ...clientReturn,
      code: clientConfirmationCode,
    });

    return res.status(201).json(clientReturn);
  };

  getClients = async (_: Request, res: Response) => {
    const clients = await adminService.getClients();

    return res.status(200).json(clients);
  };

  updateClient = async (req: Request, res: Response) => {
    const updatedUser = await adminService.updateClient(req);

    return res.status(200).json(updatedUser);
  };

  deleteClient = async (req: Request, res: Response) => {
    const { clientId } = req.params;
    const deletedClient = await adminService.deleteClient(clientId);

    return res.status(200).json(deletedClient);
  };

  registerEmployee = async (req: Request, res: Response) => {
    const { employeeReturn, employeeConfirmationCode } =
      await adminService.registerEmployee(req);

    const message = await mailerService.welcomeEmail({
      ...employeeReturn,
      code: employeeConfirmationCode,
    });

    return res.status(201).json(employeeReturn);
  };

  updateEmployee = async (req: Request, res: Response) => {
    const updatedEmployee = await adminService.updateEmployee(req);

    return res.status(200).json(updatedEmployee);
  };

  getAllEmployees = async (_: Request, res: Response) => {
    const employees = await adminService.getAllEmployees();

    return res.status(200).json({ employees });
  };

  getAllOnDuty = async (_: Request, res: Response) => {
    const onDuty = await adminService.getAllOnDuty();
    res.status(200).json({ onDuty });
  };

  getProcedure = async (req: Request, res: Response) => {
    const risk = await adminService.getProcedure(req);

    return res.status(200).json(risk);
  };
}

export default new AdminController();
