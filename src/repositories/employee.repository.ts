import { Repository } from "typeorm";
import { Employee } from "../entities";
import AppDataSource from "../data-source";

class EmployeeRepo {
  private ormRepo: Repository<Employee>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Employee);
  }
}

export default new EmployeeRepo();
