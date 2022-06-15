import * as yup from "yup";

const registerClientSchema = yup.object().shape({
  name: yup.string().required(),
  subscription: yup.string().required(),
  data: yup.object().shape({
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
