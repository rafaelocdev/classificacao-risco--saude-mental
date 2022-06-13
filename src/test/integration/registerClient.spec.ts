import { Connection } from "..";

describe("Register Client | Integration Tests", () => {
  const dbConnection = new Connection();

  beforeAll(async () => {
    dbConnection.create();
  });

  afterAll(async () => {
    dbConnection.close();
  });

  afterEach(async () => {
    dbConnection.clear();
  });

  it("should register a new client", async () => {});
});
