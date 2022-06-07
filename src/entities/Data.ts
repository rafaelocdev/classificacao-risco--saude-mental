import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";
import { v4 as uuid4 } from "uuid";

@Entity("data")
export default class Data {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ type: "int", unique: true })
  cpf: number;

  @Column({ length: 255 })
  email: string;

  @Column({ type: "int" })
  mobile: number;

  @Column({ length: 255 })
  street: string;

  @Column({ type: "int" })
  number: number;

  @Column({ length: 50 })
  complement: string;

  @Column({ type: "int" })
  zip: number;

  @Column({ length: 255 })
  city: string;

  @Column({ type: "char", length: 2 })
  state: string;

  constructor() {
    if (!this.id) {
      this.id = uuid4();
    }
  }
}
