import supertest from "supertest";
import app from "../../app";

describe("Get appointment list | Integration test", () => {
  it("Return: Jwt not found. | Status code: 400 | when requesting without authentication", async () => {
    const response = await supertest(app).get("/appointments");

    expect(response.body.message).toStrictEqual("Jwt not found.");
    expect(response.status).toBe(400);
  });
});
