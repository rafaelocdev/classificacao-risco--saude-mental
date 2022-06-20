import { Repository, UpdateResult, DeleteResult } from "typeorm";
import { Client } from "../entities";
import AppDataSource from "../data-source";

interface IDataRepo {
  save: (data: Partial<Client>) => Promise<Client>;
  find: () => Promise<Client[]>;
  findOneBy: (payload: object) => Promise<Client>;
  update: (id: string, payload: Partial<Client>) => Promise<UpdateResult>;
  delete: (id: string) => Promise<DeleteResult>;
}

class ClientRepo implements IDataRepo {
  private ormRepo: Repository<Client>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Client);
  }

  public save = async (data: Partial<Client>) => await this.ormRepo.save(data);
  public find = async () => await this.ormRepo.find();
  public findOneBy = async (payload: object) =>
    await this.ormRepo.findOneBy({ ...payload });
  public update = async (id: string, payload: Partial<Client>) =>
    await this.ormRepo.update(id, { ...payload });
  public delete = async (id: string) => await this.ormRepo.delete(id);
}

export default new ClientRepo();
