import * as yup from "yup";
import {
  validateCPF,
  validatePhone,
  validateCep,
  validateUF,
} from "validations-br";

const registerClientSchema = yup.object().shape({
  name: yup.string().required(),
  subscription: yup.string().required(),
  data: yup.object().shape({
    cpf: yup
      .string()
      .required()
      .test("is-cpf", "CPF is not valid", (cpf) => validateCPF(cpf)),
    birthday: yup.string().required(),
    gender: yup.string().required(),
    email: yup.string().email().required(),
    mobile: yup
      .string()
      .required()
      .test("is-phone", "Phone number is not valid", (phone) =>
        validatePhone(phone)
      ),
    street: yup.string().required(),
    number: yup.string().required(),
    complement: yup.string().optional(),
    zip: yup
      .string()
      .required()
      .test("is-cep", "CEP is not valid", (cep) => validateCep(cep)),
    city: yup.string().required(),
    state: yup
      .string()
      .required()
      .test("is-uf", "UF is not valid", (uf) => validateUF(uf)),
  }),
});

const serializedData = yup.object().shape({
  id: yup.string().required(),
  name: yup.string().required(),
  subscription: yup.number().required(),
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

export { registerClientSchema, serializedData };
