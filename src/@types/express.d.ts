import express from "express";
import { Client, Data, Employee, QueryMhRisk } from "../entities";
import { Appointment } from "../entities";

declare global {
  namespace Express {
    interface Request {
      decoded: Partial<Employee>;

      user: Partial<Client | Employee>;

      validated: Client | Data | Employee | QueryMhRisk;
    }
  }
}
