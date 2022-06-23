import supertest from "supertest";
import app from "../../app";
import { adminService } from "../../services";

describe("Get clients list | Integration test", () => {
  it("Return: Jwt not found. | Status code: 400 | when requesting without authentication", async () => {
    const response = await supertest(app).get("/admin/clients");

    expect(response.body.message).toStrictEqual("Jwt not found.");
    expect(response.status).toBe(400);
  });
});
