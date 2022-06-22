import supertest from "supertest";
import app from "../../app";

describe("Get appointment list | Integration test", () => {
  it("Return: list of appointements or empty array | Status code: 200", async () => {
    const response = await supertest(app).get("/appointments");

    expect(response.status).toBe(200);
  });
});
