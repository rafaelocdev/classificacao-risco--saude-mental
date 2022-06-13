import { Request } from "express";
import { clientRepo } from "../repositories";
import { dataRepo } from "../repositories";
import { Client, Data } from "../entities";
import { AssertsShape } from "yup/lib/object";
import { serializedData } from "../schemas";

class AdminService {
  registerClient = async ({
    validated,
  }: Request): Promise<AssertsShape<any>> => {
    const newClient = new Client();

    newClient.name = validated.name;
    newClient.subscription = validated.subscription;

    await clientRepo.save(newClient);

    const newClientData = new Data();

    newClientData.cpf = validated.data.cpf;
    newClientData.birthday = validated.data.birthday;
    newClientData.gender = validated.data.gender;
    newClientData.email = validated.data.email;
    newClientData.mobile = validated.data.mobile;
    newClientData.street = validated.data.street;
    newClientData.number = validated.data.number;
    newClientData.complement = validated.data.complement;
    newClientData.zip = validated.data.zip;
    newClientData.city = validated.data.city;
    newClientData.state = validated.data.state;

    await dataRepo.save(newClientData);

    newClient.data = newClientData;

    await clientRepo.save(newClient);

    return serializedData.validate(newClient, { stripUnknown: true });
  };
}

export default new AdminService();
