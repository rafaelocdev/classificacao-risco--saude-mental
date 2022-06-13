import { Request } from "express";
import { clientRepo } from "../repositories";
import { dataRepo } from "../repositories";
import { Client, Data } from "../entities";

class AdminService {
  registerClient = async ({ body }: Request) => {
    const basicData = {
      name: body.name,
      subscription: body.subscription,
    };

    const newClient: Client = await clientRepo.save(basicData);

    newClient.data = new Data();

    newClient.data.cpf = body.cpf;
    newClient.data.birthday = body.birthday;
    newClient.data.gender = body.gender;
    newClient.data.email = body.email;
    newClient.data.mobile = body.mobile;
    newClient.data.street = body.street;
    newClient.data.number = body.number;
    newClient.data.complement = body.complement;
    newClient.data.zip = body.zip;
    newClient.data.city = body.city;
    newClient.data.state = body.state;

    await dataRepo.save(newClient.data);

    const client: Client = await clientRepo.findOneBy({
      id: newClient.id,
    });

    const data: Data = await dataRepo.findOneBy({
      id: newClient.data.id,
    });

    return { client: client, data: data };
  };
}

export default new AdminService();
