import { Repository } from "typeorm";
import { Data } from "../entities";
import AppDataSource from "../data-source";

class DataRepo {
  private ormRepo: Repository<Data>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Data);
  }
}

export default new DataRepo();
