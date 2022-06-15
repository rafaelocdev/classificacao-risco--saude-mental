import * as yup from "yup";

const updateClientSchema = yup.object().shape({
  name: yup.string().optional(),
  subscription: yup.string().optional(),
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
              .test(
                "len",
                "O CPF deve ter exatamente 11 caracteres",
                (val) => val.toString().length === 11
              ),
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
                "Para 'gênero' somente são aceitos os valores: M ('Masculino'), F ('Feminino') ou O ('Outro')"
              ),
          }),
        email: yup.string().email().lowercase().optional(),
        mobile: yup.string().optional(),
        street: yup.string().optional(),
        number: yup.string().optional(),
        complement: yup.string().optional(),
        zip: yup.string().optional(),
        city: yup.string().optional(),
        state: yup
          .string()
          .optional()
          .when("state", {
            is: (value) => value?.length,
            then: yup
              .string()
              .test(
                "len",
                "O estado deve ter exatamente 2 caracteres",
                (val) => val.toString().length === 2
              ),
          }),
      },
      [
        ["state", "state"],
        ["gender", "gender"],
        ["cpf", "cpf"],
      ]
    )
    .default(undefined),
});

const serializedUpdatedClientSchema = yup.object().shape({
  id: yup.string().uuid().required(),
  name: yup.string().required(),
  subscription: yup.string().required(),
  data: yup.object().shape({
    cpf: yup.string().required(),
    birthday: yup.string().required(),
    gender: yup.string().required(),
    email: yup.string().email().lowercase().required(),
    mobile: yup.string().required(),
    street: yup.string().required(),
    number: yup.string().required(),
    complement: yup.string().required(),
    zip: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
  }),
});

export { updateClientSchema, serializedUpdatedClientSchema };
