import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "dotenv";
import path from "path";

config();

const AppDataSourceDev = new DataSource({
  type: "postgres",
  host: "postgresDB",
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  logging: true,
  entities: [path.join(__dirname, "/entities/**/*.{ts,js}")],
  migrations: [path.join(__dirname, "/migrations/**/*.{ts,js}")],
});

const AppDataSourceProd = new DataSource({
  type: "postgres",
  host: "postgresDB",
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  ssl: { rejectUnauthorized: false },
  logging: true,
  entities: [path.join(__dirname, "/entities/**/*.{ts,js}")],
  migrations: [path.join(__dirname, "/migrations/**/*.{ts,js}")],
});

const AppDataSourceTest = new DataSource({
  type: "sqlite",
  database: ":memory:",
  synchronize: true,
  entities: [path.join(__dirname, "./entities/**/*.{js,ts}")],
  migrations: [path.join(__dirname, "./migrations/**/*.{js,ts}")],
});

export default process.env.NODE_ENV === "production"
  ? AppDataSourceProd
  : process.env.NODE_ENV === "test"
  ? AppDataSourceTest
  : AppDataSourceDev;
