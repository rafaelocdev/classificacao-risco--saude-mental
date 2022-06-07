import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { v4 as uuid4 } from "uuid";
import Job from "./Jobs";

@Entity("employees")
export default class Employee {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 50 })
  password: string;

  @Column({ length: 50 })
  register: string;

  @ManyToOne(() => Job, (job) => job.employees)
  @JoinColumn({ name: "job_id" })
  job: Job;

  constructor() {
    if (!this.id) {
      this.id = uuid4();
    }
  }
}
