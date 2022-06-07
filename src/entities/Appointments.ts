import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";
import { v4 as uuid4 } from "uuid";

@Entity("appointments")
export default class Appointment {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  anamnesis: string;

  @Column({ length: 255 })
  action: string;

  constructor() {
    if (!this.id) {
      this.id = uuid4();
    }
  }
}
