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

  @Column()
  anamnesis: string;

  @Column({ length: 255 })
  action: string;

  @ManyToOne(() => OnDuty, (onDuty) => onDuty.appointments)
  @JoinColumn({ name: "on_duty_id" })
  onDuty: OnDuty;

  @OneToOne(() => QueryMhRisk)
  @JoinColumn({ name: "query_mh_risk_id" })
  queryMhRisk: QueryMhRisk;

  constructor() {
    if (!this.id) {
      this.id = uuid4();
    }
  }
}
