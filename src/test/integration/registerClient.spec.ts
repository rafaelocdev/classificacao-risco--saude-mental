import { Connection } from "..";

describe("Register Client | Integration Tests", () => {
  const dbConnection = new Connection();

  beforeAll(async () => {
    await dbConnection.create();
  });

  afterAll(async () => {
    await dbConnection.clear();
    await dbConnection.close();
  });

  afterEach(async () => {
    await dbConnection.clear();
  });

  it("should register a new client", async () => {
    expect(true).toBe(true);
  });
});
