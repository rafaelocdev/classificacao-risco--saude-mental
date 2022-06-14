import express from "express";
import { Client, Data, Employee } from "../entities";

declare global {
  namespace Express {
    interface Request {
      decoded: Partial<Employee>;
      validated: Client | Data | Employee;
    }
  }
}
