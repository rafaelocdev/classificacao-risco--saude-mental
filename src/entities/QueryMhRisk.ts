import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { v4 as uuid4 } from "uuid";
import Client from "./Client";
import ResultMhRisk from "./ResultMhRisk";

@Entity("query_mh_risk")
export default class QueryMhRisk {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ type: "enum", enum: [1, 2, 3] })
  depression: number;

  @Column({ type: "boolean", name: "self_aggression" })
  selfAggression: boolean;

  @Column({ type: "boolean" })
  insomnia: boolean;

  @Column({ type: "boolean" })
  drugs: boolean;

  @Column({ type: "boolean" })
  mourning: boolean;

  @Column({ type: "boolean", name: "family_support" })
  familySupport: boolean;

  @CreateDateColumn({ name: "evaluation_date" })
  evaluationDate?: Date;

  @ManyToOne(() => Client, (client) => client.queriesMhRisk)
  @JoinColumn({ name: "client_id" })
  client: Client;

  @ManyToOne(() => ResultMhRisk, (resultMhRisk) => resultMhRisk.queryMhRisk, {
    nullable: true,
    eager: true,
  })
  @JoinColumn({ name: "result_mh_risk_id", referencedColumnName: "risk" })
  resultMhRisk: ResultMhRisk;

  constructor() {
    if (!this.id) {
      this.id = uuid4();
    }
  }
}
