import { Repository, UpdateResult } from "typeorm";
import { Employee } from "../entities";
import AppDataSource from "../data-source";

interface IEmployeeRepo {
  save: (data: Partial<Employee>) => Promise<Employee>;
  find: () => Promise<Employee[]>;
  findOneBy: (payload: object) => Promise<Employee>;
  update: (id: string, payload: Partial<Employee>) => Promise<UpdateResult>;
}

class EmployeeRepo implements IEmployeeRepo {
  private ormRepo: Repository<Employee>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Employee);
  }

  public save = async (data: Partial<Employee>) =>
    await this.ormRepo.save(data);
  public find = async () => await this.ormRepo.find();
  public findOneBy = async (payload: object) =>
    await this.ormRepo.findOneBy(payload);
  public update = async (id: string, payload: Partial<Employee>) =>
    await this.ormRepo.update(id, { ...payload });
}

export default new EmployeeRepo();
