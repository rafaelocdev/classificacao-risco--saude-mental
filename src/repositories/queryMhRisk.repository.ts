import { Repository } from "typeorm";
import { QueryMhRisk } from "../entities";
import AppDataSource from "../data-source";

class QueryMhRiskRepo {
  private ormRepo: Repository<QueryMhRisk>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(QueryMhRisk);
  }
}

export default new QueryMhRiskRepo();
