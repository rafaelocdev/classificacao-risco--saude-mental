import express from "express";
import { Client, Employee } from "../entities";

declare global {
  namespace Express {
    interface Request {
      decoded: Partial<Employee>;
      validated: Client;
      user: Partial<Client|Employee>
    }
  }
}
