import * as yup from "yup";

export const serializeOnDutySchema = yup.object().shape({
  id: yup.string().uuid().required(),
  onDuty: yup.bool().default(false).optional(),
  available: yup.bool().default(false).optional(),
  employee: yup
    .object()
    .shape({
      register: yup.string().required(),
      name: yup.string().required(),
      specialty: yup.string().required(),
    })
    .required(),
});
