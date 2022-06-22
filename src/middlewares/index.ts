import validateToken from "./validateToken.middleware";
import validateSchema from "./validateSchema.middleware";
import validateIsAdmin from "./validateIsAdmin.middleware";
import verifyUserByIdOr404 from "./verifyUserByIdOr404.middleware";
import verifyAppointmentOr404 from "./verifyAppointmentOr404.middleware";

export {
  validateToken,
  validateSchema,
  validateIsAdmin,
  verifyUserByIdOr404,
  verifyAppointmentOr404,
};
