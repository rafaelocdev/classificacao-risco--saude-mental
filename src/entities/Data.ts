import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { v4 as uuid4 } from "uuid";
import Client from "./Clients";
import Employee from "./Employees";

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

  @OneToOne(() => Client)
  @JoinColumn({ name: "customer_id" })
  customer: Client;

  @OneToOne(() => Employee)
  @JoinColumn({ name: "user_id" })
  user: Employee;

  constructor() {
    if (!this.id) {
      this.id = uuid4();
    }
  }
}
