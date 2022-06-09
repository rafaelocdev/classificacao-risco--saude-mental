import { Repository } from "typeorm";
import { ResultMhRisk } from "../entities";
import AppDataSource from "../data-source";

class ResultMhRiskRepo {
  private ormRepo: Repository<ResultMhRisk>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(ResultMhRisk);
  }
}

export default new ResultMhRiskRepo();
