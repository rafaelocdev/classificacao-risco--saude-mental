import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from "typeorm";
import { v4 as uuid4 } from "uuid";
import QueryMhRisk from "./QueryMhRisk";

@Entity("clients")
export default class Client {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ length: 255 })
  name: string;

  @Column({ type: "int" })
  subscription: number;

  @OneToMany(() => QueryMhRisk, (queriesMhRisk) => queriesMhRisk.client)
  queriesMhRisk: QueryMhRisk[];

  constructor() {
    if (!this.id) {
      this.id = uuid4();
    }
  }
}
