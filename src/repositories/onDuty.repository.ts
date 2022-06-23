import { Repository, UpdateResult } from "typeorm";
import { Employee, OnDuty } from "../entities";
import AppDataSource from "../data-source";

interface IOnDutyRepo {
  save: (payload: Partial<OnDuty>) => Promise<OnDuty>;
  findAll: () => Promise<OnDuty[]>;
  findOne: (payload: Partial<OnDuty>) => Promise<OnDuty>;
  update: (id: string, payload: Partial<OnDuty>) => Promise<UpdateResult>;
}

class OnDutyRepo implements IOnDutyRepo {
  private ormRepo: Repository<OnDuty>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(OnDuty);
  }

  public save = async (payload: Partial<OnDuty>) =>
    await this.ormRepo.save(payload);
  public findAll = async () => await this.ormRepo.find();
  public findOne = async (payload: Partial<OnDuty>) =>
    await this.ormRepo.findOneBy({ ...payload });
  public update = async (id: string, payload: Partial<OnDuty>) =>
    await this.ormRepo.update(id, { ...payload });
}

export default new OnDutyRepo();
