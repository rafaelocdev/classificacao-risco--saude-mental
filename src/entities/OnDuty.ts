import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { v4 as uuid4 } from "uuid";
import Appointment from "./Appointments";
import Employee from "./Employees";

@Entity("on_duty")
export default class OnDuty {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ type: "boolean", name: "on_duty" })
  onDuty: boolean;

  @Column({ type: "boolean" })
  available: boolean;

  @OneToOne(() => Employee)
  @JoinColumn({ name: "user_id" })
  user: Employee;

  @OneToMany(() => Appointment, (appointments) => appointments.onDuty)
  appointments: Appointment[];

  constructor() {
    if (!this.id) {
      this.id = uuid4();
    }
  }
}
