import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";
import { v4 as uuid4 } from "uuid";

@Entity("data")
export default class Data {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ unique: true })
  cpf: string;

  @Column()
  birthday: string;

  @Column()
  gender: string;

  @Column({ unique: true })
  email: string;

  @Column()
  mobile: string;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column()
  complement: string;

  @Column()
  zip: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column({ default: false })
  confirmation_status: boolean;

  @Column("uuid")
  confirmation_code: string;

  constructor() {
    if (!this.id) {
      this.id = uuid4();
    }
  }
}
