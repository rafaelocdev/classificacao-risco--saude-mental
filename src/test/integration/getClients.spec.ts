import supertest from "supertest";
import app from "../../app";

describe("Get clients list | Integration test", () => {
  it("Return: list of clients or empty array | Status code: 200", async () => {
    const response = await supertest(app).get("/admin/clients");

    expect(response.status).toBe(200);
  });
});
