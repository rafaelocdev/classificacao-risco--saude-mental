import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";
import { v4 as uuid4 } from "uuid";

@Entity("clients")
export default class Client {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ length: 255 })
  name: string;

  @Column({ type: "int" })
  subscription: number;

  constructor() {
    if (!this.id) {
      this.id = uuid4();
    }
  }
}
