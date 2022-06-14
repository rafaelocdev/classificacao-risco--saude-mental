import { clientRepo } from "../repositories";

export default new (class AdminService {
  getClients = async () => {
    const clients = await clientRepo.find();

    return clients;
  };
})();
