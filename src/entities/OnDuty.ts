import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";
import { v4 as uuid4 } from "uuid";

@Entity("on_duty")
export default class OnDuty {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ type: "boolean", name: "on_duty" })
  onDuty: boolean;

  @Column({ type: "boolean" })
  available: boolean;

  constructor() {
    if (!this.id) {
      this.id = uuid4();
    }
  }
}
