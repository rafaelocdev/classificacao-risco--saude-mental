import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { v4 as uuid4 } from "uuid";
import Data from "./Data";

@Entity("employees")
export default class Employee {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ length: 255 })
  name: string;

  @Column()
  password: string;

  @Column({ length: 50 })
  register: string;

  @Column()
  job: string;

  @Column()
  specialty: string;

  // @ManyToOne(() => Job, (job) => job.employees)
  // @JoinColumn({ name: "job_id" })
  // job: Job;

  @OneToOne(() => Data)
  @JoinColumn({ name: "data_id" })
  data: Data;

  constructor() {
    if (!this.id) {
      this.id = uuid4();
    }
  }
}
