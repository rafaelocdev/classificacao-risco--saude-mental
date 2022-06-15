import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { v4 as uuid4 } from "uuid";
import Appointment from "./Appointment";
import Employee from "./Employee";

@Entity("on_duty")
export default class OnDuty {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ name: "on_duty", default: false })
  onDuty?: boolean;

  @Column({ type: "boolean", default: false })
  available?: boolean;

  @OneToOne(() => Employee)
  @JoinColumn({ name: "employee_id" })
  employee: Employee;

  @OneToMany(() => Appointment, (appointments) => appointments.onDuty)
  appointments: Appointment[];

  constructor() {
    if (!this.id) {
      this.id = uuid4();
    }
  }
}
