import { Employee } from "../entities";

declare global {
  namespace Express {
    interface Request {
      decoded: Partial<Employee>;
    }
  }
}
