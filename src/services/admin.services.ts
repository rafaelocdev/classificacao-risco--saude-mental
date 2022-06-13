import { clientRepo } from "../repositories";

export default class AdminService {
  getClients = async () => {
    const clients = await clientRepo.find();

    return clients;
  };
}
