import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../errors/errors";
import { employeeRepo } from "../repositories";

const validateIsNurse = async ( req: Request, _: Response, next: NextFunction) =>{
    
    const employee = await employeeRepo.findOneBy({id: req.decoded.id})

    if(employee.specialty !== "Nurse"){
        throw new ErrorHandler(
            401, "Only nurses are allowed to access this route"
        );
    }
    return next();
};

export default validateIsNurse;