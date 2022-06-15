import { Request } from "express";
import { clientRepo } from "../repositories";
import { dataRepo } from "../repositories";
import { Client, Data } from "../entities";
import { AssertsShape } from "yup/lib/object";
import { serializedData } from "../schemas";
import { employeeRepo } from "../repositories";
import { getAllEmployeesSchema } from "../schemas";
import { serializedUpdatedClientSchema } from "../schemas";
import { ErrorHandler } from "../errors/errors";

interface IReceivedUserData {
  name: string;
  subscription: number;
  data: Partial<IData>;
}

interface IData {
  cpf: number;
  birthday: string;
  gender: string;
  email: string;
  mobile: number;
  street: string;
  number: number;
  complement: string;
  zip: number;
  city: string;
  state: string;
}

class AdminService {
  registerClient = async ({
    validated,
  }: Request): Promise<AssertsShape<any>> => {
    const newClient = new Client();

    newClient.name = (validated as Client).name;
    newClient.subscription = (validated as Client).subscription;

    await clientRepo.save(newClient);

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

    // data && (await dataRepo.update(user.data.id, { ...data }));

    if (data) {
      if (data.cpf) {
        const foundCpfData = await dataRepo.findOneBy({ cpf: data.cpf });

        if (foundCpfData && foundCpfData.id !== user.data.id) {
          throw new ErrorHandler(409, "CPF already exists.");
        }
      }
      await dataRepo.update(user.data.id, { ...data });
    }

    await clientRepo.update(user.id, { ...dataClient });

    const updatedClient = await clientRepo.findOneBy({ id: user.id });

    return serializedUpdatedClientSchema.validate(updatedClient, {
      stripUnknown: true,
    });
  };
}

export default new AdminService();
