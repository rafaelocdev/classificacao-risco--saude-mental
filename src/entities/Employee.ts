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

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ unique: true })
  register: string;

  @Column()
  job: string;

  @Column()
  specialty: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToOne(() => Data, { eager: true, nullable: false })
  @JoinColumn({ name: "data_id" })
  data: Data;

  constructor() {
    if (!this.id) {
      this.id = uuid4();
    }
  }
}
