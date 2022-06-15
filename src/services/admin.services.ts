import { Request } from "express";
import { clientRepo } from "../repositories";
import { dataRepo } from "../repositories";
import { employeeRepo } from "../repositories";
import { Client, Data } from "../entities";
import { serializedData } from "../schemas";
import { getAllEmployeesSchema } from "../schemas";
import { serializedUpdatedClientSchema } from "../schemas";
import { AssertsShape } from "yup/lib/object";
import { ErrorHandler } from "../errors/errors";

interface IReceivedUserData {
  name: string;
  subscription: number;
  data: object;
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

    return serializedData.validate(newClient, { stripUnknown: true });
  };

  getAllEmployees = async () => {
    const employees = await employeeRepo.find();

    return await getAllEmployeesSchema.validate(employees, {
      stripUnknown: true,
    });
  };

  updateClient = async ({ validated, decoded, user }: Request) => {
    const validatedData = validated as Partial<IReceivedUserData>;

    const { name, subscription, data }: IReceivedUserData =
      validatedData as IReceivedUserData;

    const dataClient = { name, subscription };

    data && (await dataRepo.update(user.data.id, { ...data }));

    await clientRepo.update(user.id, { ...dataClient });

    const updatedClient = await clientRepo.findOneBy({ id: user.id });

    return serializedUpdatedClientSchema.validate(updatedClient, {
      stripUnknown: true,
    });
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
}

export default new AdminService();
