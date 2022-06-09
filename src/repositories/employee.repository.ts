import { Repository } from "typeorm";
import { Employee } from "../entities";
import AppDataSource from "../data-source";

interface IEmployeeRepo {
  save: (data: Partial<Employee>) => Promise<Employee>;
  find: () => Promise<Employee[]>;
  findOneBy: (payload: object) => Promise<Employee>;
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
}

export default new EmployeeRepo();
