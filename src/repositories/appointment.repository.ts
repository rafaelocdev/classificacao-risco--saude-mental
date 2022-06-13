import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { Appointment } from "../entities";
import AppDataSource from "../data-source";

interface IAppointmentRepo {
  create: (course: Partial<Appointment>) => Promise<Partial<Appointment>>;
  listAll: () => Promise<Partial<Appointment[]>>;
  listOne: (payload: object) => Promise<Partial<Appointment>>;
  update: (id: string, payload: Partial<Appointment>) => Promise<UpdateResult>;
  delete: (id: string) => Promise<DeleteResult>;
}

class AppointmentRepo implements IAppointmentRepo {
  private ormRepo: Repository<Appointment>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Appointment);
  }

  create = async (
    appointment: Partial<Appointment>
  ): Promise<Partial<Appointment>> => await this.ormRepo.save(appointment);

  listAll = async (): Promise<Partial<Appointment[]>> =>
    await this.ormRepo.find();

  listOne = async (payload: object): Promise<Partial<Appointment>> =>
    await this.ormRepo.findOneBy({ ...payload });

  update = async (
    id: string,
    payload: Partial<Appointment>
  ): Promise<UpdateResult> => await this.ormRepo.update(id, { ...payload });

  delete = async (id: string): Promise<DeleteResult> =>
    await this.ormRepo.delete(id);
}

export default new AppointmentRepo();
