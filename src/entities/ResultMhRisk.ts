import { PrimaryColumn, Column, Entity, OneToMany } from "typeorm";
import QueryMhRisk from "./QueryMhRisk";

@Entity("result_mh_risk")
export default class ResultMhRisk {
  @PrimaryColumn("varchar")
  risk: string;

  @Column()
  procedure: string;

  @OneToMany(() => QueryMhRisk, (queryMhRisk) => queryMhRisk.resultMhRisk)
  queryMhRisk: QueryMhRisk[];
}
