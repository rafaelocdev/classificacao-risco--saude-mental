import { Request } from "express";
import clientRepository from "../repositories/client.repository";
import dataRepository from "../repositories/data.repository";

class AdminService {
  updateClient = async (id: string, { validated, decoded }: Request) => {
    const foundUser = {};
  };
}

export default new AdminService();
