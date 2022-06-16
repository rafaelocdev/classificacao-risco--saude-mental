import { Request } from "express";

import { clientRepo } from "../repositories";
import { dataRepo } from "../repositories";
import { employeeRepo } from "../repositories";

import { Client, Data, Employee } from "../entities";

import { serializedData } from "../schemas";
import { getAllEmployeesSchema, serializeEmployeeData } from "../schemas/admin";

import { AssertsShape } from "yup/lib/object";
import { ErrorHandler } from "../errors/errors";
import bcrypt from "bcrypt";

class AdminService {
  registerClient = async ({
    validated,
  }: Request): Promise<AssertsShape<any>> => {
    const subscriptionAlreadyRegistered = await clientRepo.findOneBy({
      subscription: (validated as Client).subscription,
    });

    const cpfAlreadyRegistered = await dataRepo.findOneBy({
      cpf: (validated as Client).data.cpf,
    });

    const emailAlreadyRegistered = await dataRepo.findOneBy({
      email: (validated as Client).data.email,
    });

    if (subscriptionAlreadyRegistered || cpfAlreadyRegistered)
      throw new ErrorHandler(409, "Client already registered.");

    if (emailAlreadyRegistered)
      throw new ErrorHandler(409, "Email already registered.");

    const newClientData = new Data();

    newClientData.cpf = (validated as Client).data.cpf;
    newClientData.birthday = (validated as Client).data.birthday;
    newClientData.gender = (validated as Client).data.gender;
    newClientData.email = (validated as Client).data.email;
    newClientData.mobile = (validated as Client).data.mobile;
    newClientData.street = (validated as Client).data.street;
    newClientData.number = (validated as Client).data.number;
    newClientData.complement = (validated as Client).data.complement;
    newClientData.zip = (validated as Client).data.zip;
    newClientData.city = (validated as Client).data.city;
    newClientData.state = (validated as Client).data.state;

    await dataRepo.save(newClientData);

    const newClient = new Client();

    newClient.name = (validated as Client).name;
    newClient.subscription = (validated as Client).subscription;
    newClient.data = newClientData;

    await clientRepo.save(newClient);

    return await serializedData.validate(newClient, { stripUnknown: true });
  };

  getClients = async () => {
    const clients = await clientRepo.find();

    return clients;
  };

  deleteClient = async (clientId: string) => {
    const foundUser = await clientRepo.findOneBy({
      id: clientId,
    });

    if (!foundUser) throw new ErrorHandler(400, "User not found.");

    await clientRepo.delete(clientId);

    return { message: "User deleted successfully!" };
  };

  registerEmployee = async ({ validated }): Promise<AssertsShape<any>> => {
    const registerNumberAlreadyRegistered = await employeeRepo.findOneBy({
      register: (validated as Employee).register,
    });

    const cpfAlreadyRegistered = await dataRepo.findOneBy({
      cpf: (validated as Employee).data.cpf,
    });

    const emailAlreadyRegistered = await dataRepo.findOneBy({
      email: (validated as Employee).data.email,
    });

    if (registerNumberAlreadyRegistered)
      throw new ErrorHandler(409, "Register number already being used.");

    if (cpfAlreadyRegistered)
      throw new ErrorHandler(409, "Employee already registered.");

    if (emailAlreadyRegistered)
      throw new ErrorHandler(409, "Email already registered.");

    const hashedPassword = await bcrypt.hash(
      (validated as Employee).password,
      10
    );

    const newEmployeeData = new Data();

    newEmployeeData.cpf = (validated as Employee).data.cpf;
    newEmployeeData.birthday = (validated as Employee).data.birthday;
    newEmployeeData.gender = (validated as Employee).data.gender;
    newEmployeeData.email = (validated as Employee).data.email;
    newEmployeeData.mobile = (validated as Employee).data.mobile;
    newEmployeeData.street = (validated as Employee).data.street;
    newEmployeeData.number = (validated as Employee).data.number;
    newEmployeeData.complement = (validated as Employee).data.complement;
    newEmployeeData.zip = (validated as Employee).data.zip;
    newEmployeeData.city = (validated as Employee).data.city;
    newEmployeeData.state = (validated as Employee).data.state;

    await dataRepo.save(newEmployeeData);

    const newEmployee = new Employee();

    newEmployee.name = (validated as Employee).name;
    newEmployee.password = hashedPassword;
    newEmployee.register = (validated as Employee).register;
    newEmployee.job = (validated as Employee).job;
    newEmployee.specialty = (validated as Employee).specialty;
    newEmployee.data = newEmployeeData;

    await employeeRepo.save(newEmployee);

    return await serializeEmployeeData.validate(newEmployee, {
      stripUnknown: true,
    });
  };

  getAllEmployees = async () => {
    const employees = await employeeRepo.find();

    return await getAllEmployeesSchema.validate(employees, {
      stripUnknown: true,
    });
  };
}

export default new AdminService();
