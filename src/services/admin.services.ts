import { employeeRepo } from "../repositories"
import { getAllEmployeesSchema } from "../schemas/admin";

export class AdminService {

    getAllEmployees = async () =>{
        const employees = await employeeRepo.find();

        return await getAllEmployeesSchema.validate(employees, {stripUnknown: true});
    };
}

export default new AdminService();
