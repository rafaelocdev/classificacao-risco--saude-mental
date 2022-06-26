import { faker } from "@faker-js/faker";
import { hashSync } from "bcrypt";
import { generate } from "gerador-validador-cpf";

export const adminUserInfo = {
  name: "Admin",
  password: hashSync(process.env.ADMIN_PWD, 10),
  register: Math.floor(Math.random() * 1000000),
  job: "Administrador(a)",
  specialty: "Admin",
  cpf: generate({ format: true }),
  email: process.env.ADMIN_EMAIL,
  birthday: faker.date.birthdate(),
  gender: ["M", "F", "O"][Math.floor(Math.random() * 3)],
  mobile: faker.phone.phoneNumber("(##) 9####-####"),
  street: faker.address.street(),
  number: Math.floor(Math.random() * 1000),
  complement: "-",
  zip: faker.address.zipCodeByState("SP"),
  city: faker.address.cityName(),
  state: "SP",
};
