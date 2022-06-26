import { Request, Response } from "express";
import { adminService } from "../services";
import mailerService from "../services/mailer.service";

class AdminController {
  registerClient = async (req: Request, res: Response) => {
    const newClient = await adminService.registerClient(req);

    const clientData = {
      name: "Graham Jordan",
      cpf: "808.988.660-72",
      birthday: "Jan 5, 1911",
      gender: "Male",
      email: "cubilia.curae.donec@hotmail.com",
      mobile: "44-34022-4365",
      address: "823-7594 Vestibulum. Av.",
    };

    const message = await mailerService.welcomeEmail(clientData);

    return res.status(201).json(newClient);
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
    const newEmployee = await adminService.registerEmployee(req);

    return res.status(201).json(newEmployee);
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
