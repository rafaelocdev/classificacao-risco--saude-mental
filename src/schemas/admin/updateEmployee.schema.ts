import * as yup from "yup";
import {
  validateCPF,
  validatePhone,
  validateCep,
  validateUF,
} from "validations-br";

const updateEmployeeSchema = yup.object().shape({
  name: yup.string().optional(),
  password: yup.string().min(6).optional(),
  register: yup.string().optional(),
  job: yup.string().optional(),
  specialty: yup.string().optional(),
  isActive: yup.bool().optional(),
  data: yup
    .object()
    .shape(
      {
        cpf: yup
          .string()
          .optional()
          .when("cpf", {
            is: (value) => value?.length,
            then: yup
              .string()
              .test("is-cpf", "CPF is not valid", (cpf) => validateCPF(cpf)),
          }),
        birthday: yup.string().optional(),
        gender: yup
          .string()
          .optional()
          .when("gender", {
            is: (value) => value?.length,
            then: yup
              .string()
              .oneOf(
                ["M", "F", "O"],
                "For 'gender' only the values M ('Male'), F ('Female') or O ('Other') are accepted."
              ),
          }),
        email: yup.string().email().lowercase().optional(),
        mobile: yup
          .string()
          .optional()
          .when("mobile", {
            is: (value) => value?.length,
            then: yup
              .string()
              .test("is-phone", "Phone number is not valid", (phone) =>
                validatePhone(phone)
              ),
          }),
        street: yup.string().optional(),
        number: yup.string().optional(),
        complement: yup.string().optional(),
        zip: yup
          .string()
          .optional()
          .when("zip", {
            is: (value) => value?.length,
            then: yup
              .string()
              .test("is-cep", "CEP is not valid", (cep) => validateCep(cep)),
          }),
        city: yup.string().optional(),
        state: yup
          .string()
          .optional()
          .when("state", {
            is: (value) => value?.length,
            then: yup
              .string()
              .test("is-uf", "UF is not valid", (uf) => validateUF(uf)),
          }),
      },
      [
        ["state", "state"],
        ["gender", "gender"],
        ["cpf", "cpf"],
        ["zip", "zip"],
        ["mobile", "mobile"],
      ]
    )
    .default(undefined),
});

const serializedUpdatedEmployeeSchema = yup.object().shape({
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
});

export { updateEmployeeSchema, serializedUpdatedEmployeeSchema };
