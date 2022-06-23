import AppDataSource from "../data-source";
import { DataSource } from "typeorm";

class Database {
  private connection: DataSource;

  createConnection = async () => {
    await AppDataSource.initialize()
      .then((res) => (this.connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    // await this.connection.runMigrations();
  };

  closeConnection = async () => await this.connection.dropDatabase();
}

export default new Database();
