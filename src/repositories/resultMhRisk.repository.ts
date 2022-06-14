import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { ResultMhRisk } from "../entities";
import AppDataSource from "../data-source";

interface IResultMhRiskRepo {
  save: (data: Partial<ResultMhRisk>) => Promise<ResultMhRisk>;
  findOneBy: (payload: object) => Promise<ResultMhRisk>;
  find: () => Promise<ResultMhRisk[]>;
  update: (risk: string, payload: Partial<ResultMhRisk>) => Promise<UpdateResult>;
  delete: (risk: string) => Promise<DeleteResult>;
}

class ResultMhRiskRepo implements IResultMhRiskRepo {
  private ormRepo: Repository<ResultMhRisk>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(ResultMhRisk);
  }

  public save = async (data: Partial<ResultMhRisk>) =>
    await this.ormRepo.save(data);

  public findOneBy = async (payload: object) =>
    await this.ormRepo.findOneBy(payload);

  public find = async () =>
    await this.ormRepo.find();

  public update = async (risk: string, payload: Partial<ResultMhRisk>) => 
    await this.ormRepo.update(risk, {...payload});

  public delete = async (risk: string) =>
    await this.ormRepo.delete(risk);

}

export default new ResultMhRiskRepo();
