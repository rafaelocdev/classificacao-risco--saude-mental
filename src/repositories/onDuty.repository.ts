import { Repository } from "typeorm";
import { OnDuty } from "../entities";
import AppDataSource from "../data-source";

class OnDutyRepo {
  private ormRepo: Repository<OnDuty>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(OnDuty);
  }
}

export default new OnDutyRepo();
