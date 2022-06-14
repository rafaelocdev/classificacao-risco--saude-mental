import { Repository, UpdateResult } from "typeorm";
import { Employee, OnDuty } from "../entities";
import AppDataSource from "../data-source";

interface IOnDutyRepo {
  save: (payload: Partial<OnDuty>) => Promise<OnDuty>;
  findAll: () => Promise<OnDuty[]>;
  update: (id: string, payload: Partial<OnDuty>) => Promise<UpdateResult>;
}

class OnDutyRepo implements IOnDutyRepo {
  private ormRepo: Repository<OnDuty>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(OnDuty);
  }

  public save = (payload: Partial<OnDuty>) => this.ormRepo.save(payload);
  public findAll = () => this.ormRepo.find();
  public update = (id: string, payload: Partial<OnDuty>) =>
    this.ormRepo.update(id, { ...payload });
}

export default new OnDutyRepo();
