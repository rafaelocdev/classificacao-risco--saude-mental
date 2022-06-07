import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";
import { v4 as uuid4 } from "uuid";

@Entity("clients")
export default class Clients {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  name: string;

  @Column({ type: "int", nullable: false })
  subscription: number;

  constructor() {
    if (!this.id) {
      this.id = uuid4();
    }
  }
}
