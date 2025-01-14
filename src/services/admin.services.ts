import { Request } from "express";
import { AssertsShape } from "yup/lib/object";
import bcrypt from "bcrypt";

import {
  employeeRepo,
  clientRepo,
  dataRepo,
  resultMhRiskRepo,
  onDutyRepo,
} from "../repositories";
import { Client, Data, Employee, OnDuty } from "../entities";
import {
  serializedData,
  serializedUpdatedClientSchema,
  getAllEmployeesSchema,
  serializeEmployeeData,
} from "../schemas";
import { ErrorHandler } from "../errors/errors";
import { serializedUpdatedEmployeeSchema } from "../schemas/admin";

interface IReceivedUserData {
  name: string;
  subscription: string;
  data: Partial<IData>;
}

interface IData {
  cpf: string;
  birthday: string;
  gender: string;
  email: string;
  mobile: string;
  street: string;
  number: string;
  complement: string;
  zip: string;
  city: string;
  state: string;
}

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

  updateClient = async ({ validated, decoded, user }: Request) => {
    const validatedData = validated as Partial<IReceivedUserData>;

    const { name, subscription, data }: IReceivedUserData =
      validatedData as IReceivedUserData;

    const dataClient = { name, subscription };

    if (subscription) {
      const foundSubscription = await clientRepo.findOneBy({
        subscription: subscription,
      });

      if (foundSubscription && foundSubscription.id !== user.id) {
        throw new ErrorHandler(409, "Subscription already exists.");
      }
    }

    if (data) {
      if (data.cpf) {
        const foundCpfData = await dataRepo.findOneBy({ cpf: data.cpf });

        if (foundCpfData && foundCpfData.id !== user.data.id) {
          throw new ErrorHandler(409, "CPF already exists.");
        }
      }

      if (data.email) {
        const foundEmailData = await dataRepo.findOneBy({ email: data.email });

        if (foundEmailData && foundEmailData.id !== user.data.id) {
          throw new ErrorHandler(409, "Email already exists.");
        }
      }
      await dataRepo.update(user.data.id, { ...data });
    }

    if (name || subscription) {
      await clientRepo.update(user.id, { ...dataClient });
    }

    const updatedClient = await clientRepo.findOneBy({ id: user.id });

    return serializedUpdatedClientSchema.validate(updatedClient, {
      stripUnknown: true,
    });
  };

  getClients = async () => {
    const clients = await clientRepo.find();

    return { clients };
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

    await this.registerOnDuty(newEmployee);

    return await serializeEmployeeData.validate(newEmployee, {
      stripUnknown: true,
    });
  };

  updateEmployee = async ({
    params,
    validated,
  }: Request): Promise<AssertsShape<any>> => {
    const { id } = params;

    const employee = await employeeRepo.findOneBy({ id });

    let { name, password, register, job, specialty, isActive, data } =
      validated as Partial<Employee>;

    if (password) {
      const hashedPwd = await bcrypt.hash(password, 10);
      (validated as Partial<Employee>).password = hashedPwd;
    }

    if (register) {
      const registerAlreadyExists = await employeeRepo.findOneBy({
        register,
      });

      if (registerAlreadyExists)
        throw new ErrorHandler(409, "Register number already exists.");
    }

    if (job) {
      const ALLOWED_JOBS = ["Médico(a)", "Enfermeiro(a)", "Administrador(a)"];

      if (!ALLOWED_JOBS.includes(job))
        throw new ErrorHandler(409, {
          error: "Job not allowed",
          allowed_values: ALLOWED_JOBS,
        });
    }

    if (specialty) {
      const ALLOWED_SPECIALTIES = ["Psiquiatra", "Atendente", "Admin"];

      if (!ALLOWED_SPECIALTIES.includes(specialty))
        throw new ErrorHandler(409, {
          error: "Specialty not allowed",
          allowed_values: ALLOWED_SPECIALTIES,
        });
    }

    if (isActive) {
      if (typeof isActive !== "boolean")
        throw new ErrorHandler(409, "Only boolean types are allowed");
    }

    if (data) {
      if (data.cpf) {
        const cpfAlreadyRegistered = await dataRepo.findOneBy({
          cpf: data.cpf,
        });

        if (cpfAlreadyRegistered)
          throw new ErrorHandler(409, "CPF already registered.");
      }

      if (data.email) {
        const emailAlreadyRegistered = await dataRepo.findOneBy({
          email: data.email,
        });

        if (emailAlreadyRegistered)
          throw new ErrorHandler(409, "Email already registered.");
      }

      await dataRepo.update(employee.data.id, { ...data });
    }

    if (name || password || register || job || specialty || isActive) {
      const employeeData: Partial<Employee> = { ...validated };

      if (employeeData.data) delete employeeData.data;

      await employeeRepo.update(employee.id, {
        ...employeeData,
      });
    }

    const updatedEmployee = await employeeRepo.findOneBy({ id });

    return await serializedUpdatedEmployeeSchema.validate(updatedEmployee, {
      stripUnknown: true,
    });
  };

  getAllEmployees = async () => {
    const employees = await employeeRepo.find();

    return await getAllEmployeesSchema.validate(employees, {
      stripUnknown: true,
    });
  };

  registerOnDuty = async (employee: Employee) => {
    if (employee.job === "Médico(a)") {
      const newOnDuty = new OnDuty();
      newOnDuty.employee = employee;
      await onDutyRepo.save(newOnDuty);
    }
  };

  getAllOnDuty = async () => {
    return await onDutyRepo.findAll();
  };

  getProcedure = async ({ params }: Request) => {
    try {
      const procedure = await resultMhRiskRepo.findOneBy(params);
      return { procedure: procedure.procedure };
    } catch {
      throw new ErrorHandler(400, "Risk does not exist.");
    }
  };
}

export default new AdminService();
