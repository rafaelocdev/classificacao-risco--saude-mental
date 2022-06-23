import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { v4 as uuid4 } from "uuid";
import OnDuty from "./OnDuty";
import QueryMhRisk from "./QueryMhRisk";

@Entity("appointments")
export default class Appointment {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ nullable: true })
  anamnesis?: string;

  @Column({ nullable: true })
  action?: string;

  @ManyToOne(() => OnDuty, (onDuty) => onDuty.appointments, {
    nullable: true,
    eager: true,
  })
  @JoinColumn({ name: "on_duty_id", referencedColumnName: "employee" })
  onDuty: OnDuty;

  @OneToOne(() => QueryMhRisk, { eager: true, nullable: false })
  @JoinColumn({ name: "query_mh_risk_id" })
  queryMhRisk: QueryMhRisk;

  constructor() {
    if (!this.id) {
      this.id = uuid4();
    }
  }
}
