import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from "typeorm";
import { v4 as uuid4 } from "uuid";
import Employee from "./Employees";

@Entity("jobs")
export default class Job {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ length: 50 })
  job: string;

  @Column({ length: 50 })
  specialty: string;

  @OneToMany(() => Employee, (employees) => employees.job)
  employees: Employee[];

  constructor() {
    if (!this.id) {
      this.id = uuid4();
    }
  }
}
