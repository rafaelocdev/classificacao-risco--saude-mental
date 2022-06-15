import * as yup from "yup";

const registerClientSchema = yup.object().shape({
  name: yup.string().required(),
  subscription: yup.number().required(),
  data: yup.object().shape({
    cpf: yup.number().required(),
    birthday: yup.string().required(),
    gender: yup.string().required(),
    email: yup.string().email().required(),
    mobile: yup.number().required(),
    street: yup.string().required(),
    number: yup.string().required(),
    complement: yup.string().optional(),
    zip: yup.number().required(),
    city: yup.string().required(),
    state: yup.string().required(),
  }),
});

const serializedData = yup.object().shape({
  id: yup.string().uuid().required(),
  name: yup.string().required(),
  subscription: yup.number().required(),
  data: yup.object().shape({
    cpf: yup.number().required(),
    birthday: yup.string().required(),
    gender: yup.string().required(),
    email: yup.string().email().required(),
    mobile: yup.number().required(),
    street: yup.string().required(),
    number: yup.string().required(),
    complement: yup.string().optional(),
    zip: yup.number().required(),
    city: yup.string().required(),
    state: yup.string().required(),
  }),
});

export { registerClientSchema, serializedData };
