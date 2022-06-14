import { Repository, UpdateResult } from "typeorm";
import { Data } from "../entities";
import AppDataSource from "../data-source";

interface IDataRepo {
  save: (data: Partial<Data>) => Promise<Data>;
  find: () => Promise<Data[]>;
  findOneBy: (payload: object) => Promise<Data>;
  update: (id: string, payload: Partial<Data>) => Promise<UpdateResult>;
}

class DataRepo implements IDataRepo {
  private ormRepo: Repository<Data>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Data);
  }

  public save = async (data: Partial<Data>) => await this.ormRepo.save(data);
  public find = async () => await this.ormRepo.find();
  public findOneBy = async (payload: object) =>
    await this.ormRepo.findOneBy({ ...payload });
  public update = async (id: string, payload: Partial<Data>) =>
    await this.ormRepo.update(id, { ...payload });
}

export default new DataRepo();
