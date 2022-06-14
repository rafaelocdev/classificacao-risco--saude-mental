import AppDataSource from "../data-source";
import { DataSource } from "typeorm";

class Database {
  connection: DataSource;

  createConnectionBeforeAll = () => {
    beforeAll(async () => {
      await AppDataSource.initialize()
        .then((res) => (this.connection = res))
        .catch((err) => {
          console.error("Error during Data Source initialization", err);
        });
    });
  };

  closeConnectionAfterAll = async () => {
    afterAll(async () => {
      await this.connection.dropDatabase();
    });
  };
}

export default Database;
