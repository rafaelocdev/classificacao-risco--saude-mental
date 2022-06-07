import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
} from "typeorm";
import { v4 as uuid4 } from "uuid";

@Entity("query_mh_risk")
export default class QueryMhRisk {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ type: "enum", enum: [1, 2, 3], nullable: false })
  depression: number;

  @Column({ type: "boolean", name: "self_aggression", nullable: false })
  selfAggression: boolean;

  @Column({ type: "boolean", nullable: false })
  insomnia: boolean;

  @Column({ type: "boolean", nullable: false })
  drugs: boolean;

  @Column({ type: "boolean", nullable: false })
  mourning: boolean;

  @Column({ type: "boolean", name: "family_support", nullable: false })
  familySupport: boolean;

  @CreateDateColumn({ name: "evaluation_date" })
  evaluationDate?: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid4();
    }
  }
}
