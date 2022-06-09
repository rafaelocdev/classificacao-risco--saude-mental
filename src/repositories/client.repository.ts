import { Repository } from "typeorm";
import { Client } from "../entities";
import AppDataSource from "../data-source";

class ClientRepo {
  private ormRepo: Repository<Client>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Client);
  }
}

export default new ClientRepo();
