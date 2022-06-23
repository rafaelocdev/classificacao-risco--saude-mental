import * as yup from "yup";

const getAllEmployeesSchema = yup.array().of(
  yup.object().shape({
    id: yup.string().required(),
    name: yup.string().required(),
    register: yup.string().required(),
    job: yup.string().required(),
    specialty: yup.string().required(),
    isActive: yup.bool().optional(),
    data: yup.object().shape({
      id: yup.string().required(),
      cpf: yup.string().required(),
      birthday: yup.string().required(),
      gender: yup.string().required(),
      email: yup.string().email().required(),
      mobile: yup.string().required(),
      street: yup.string().required(),
      number: yup.string().required(),
      complement: yup.string().optional(),
      zip: yup.string().required(),
      city: yup.string().required(),
      state: yup.string().required(),
    }),
  })
);

export default getAllEmployeesSchema;
