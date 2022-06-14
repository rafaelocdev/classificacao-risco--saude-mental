import { Request } from "express";
import { clientRepo } from "../repositories";
import { dataRepo } from "../repositories";
import { serializedUpdatedClientSchema } from "../schemas";

interface IReceivedClientData {
  name: string;
  subscription: number;
  data: object;
}
class AdminService {
  updateClient = async ({ validated, decoded, user }: Request) => {
    const validatedData: object = validated;

    const { name, subscription, data }: IReceivedClientData =
      validatedData as IReceivedClientData;

    const dataClient = { name, subscription };

    await dataRepo.update(user.data.id, { ...data });

    await clientRepo.update(user.id, { ...dataClient });

    const updatedClient = await clientRepo.findOneBy({ id: user.id });

    return serializedUpdatedClientSchema.validate(updatedClient, {
      stripUnknown: true,
    });
  };
}

export default new AdminService();
//TESTAR OPTIONAL NO DATA NO SCHEMA
