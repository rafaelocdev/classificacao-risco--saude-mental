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
    const basicData = {
      name: validated.name,
      subscription: validated.subscription,
    };

    const newClient = await clientRepo.save(basicData);

    newClient.data = new Data();
    newClient.data.cpf = validated.data.cpf;
    newClient.data.birthday = validated.data.birthday;
    newClient.data.gender = validated.data.gender;
    newClient.data.email = validated.data.email;
    newClient.data.mobile = validated.data.mobile;
    newClient.data.street = validated.data.street;
    newClient.data.number = validated.data.number;
    newClient.data.complement = validated.data.complement;
    newClient.data.zip = validated.data.zip;
    newClient.data.city = validated.data.city;
    newClient.data.state = validated.data.state;

    await dataRepo.save(newClient.data);

    return serializedData.validate(newClient, { stripUnknown: true });
  };
}

export default new AdminService();
