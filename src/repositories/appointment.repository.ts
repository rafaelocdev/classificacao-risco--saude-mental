import { Repository } from "typeorm";
import { Appointment } from "../entities";
import AppDataSource from "../data-source";

class AppointmentRepo {
  private ormRepo: Repository<Appointment>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Appointment);
  }
}

export default new AppointmentRepo();
