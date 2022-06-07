import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";
import { v4 as uuid4 } from "uuid";

@Entity("jobs")
export default class Jobs {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ length: 50 })
  job: string;

  @Column({ length: 50 })
  specialty: string;

  constructor() {
    if (!this.id) {
      this.id = uuid4();
    }
  }
}
