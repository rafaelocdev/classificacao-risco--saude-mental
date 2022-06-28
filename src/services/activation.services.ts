import { Request } from "express";
import { ErrorHandler } from "../errors/errors";
import { dataRepo } from "../repositories";

export class activationService {
  getActivation = async (req: Request) => {
    const { code } = req.params;

    const foundData = await dataRepo.findOneBy({ confirmationCode: code });

    if (!foundData) {
      throw new ErrorHandler(404, "Invalid confirmation code.");
    }

    await dataRepo.update(foundData.id, { confirmationStatus: true });

    return { message: "Email confirmation successful." };
  };
}

export default new activationService();
