import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";
import { v4 as uuid4 } from "uuid";

@Entity("data")
export default class Data {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ unique: true })
  cpf: string;

  @Column({ length: 20 })
  birthday: string;

  @Column({ length: 1 })
  gender: string;

  @Column({ length: 255 })
  email: string;

  @Column()
  mobile: string;

  @Column({ length: 255 })
  street: string;

  @Column()
  number: number;

  @Column({ length: 50 })
  complement: string;

  @Column()
  zip: string;

  @Column({ length: 255 })
  city: string;

  @Column({ length: 2 })
  state: string;

  constructor() {
    if (!this.id) {
      this.id = uuid4();
    }
  }
}
