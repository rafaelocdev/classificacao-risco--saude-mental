import { Repository, UpdateResult } from "typeorm";
import { QueryMhRisk } from "../entities";
import AppDataSource from "../data-source";

interface IQueryMhRiskRepo {
  save: (data: Partial<QueryMhRisk>) => Promise<QueryMhRisk>;
  findOneBy: (payload: object) => Promise<QueryMhRisk>;
  update: (id: string, payload: Partial<QueryMhRisk>) => Promise<UpdateResult>;
}

class QueryMhRiskRepo implements IQueryMhRiskRepo {
  private ormRepo: Repository<QueryMhRisk>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(QueryMhRisk);
  }

  public save = async (data: Partial<QueryMhRisk>) =>
    await this.ormRepo.save(data);

  public findOneBy = async (payload: object) =>
    await this.ormRepo.findOneBy(payload);

  public update = async (id: string, payload: Partial<QueryMhRisk>) =>
    this.ormRepo.update(id, { ...payload });
}

export default new QueryMhRiskRepo();
