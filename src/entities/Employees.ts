import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";
import { v4 as uuid4 } from "uuid";

@Entity("employees")
export default class Employees {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 50 })
  password: string;

  @Column({ length: 50 })
  register: string;

  constructor() {
    if (!this.id) {
      this.id = uuid4();
    }
  }
}
