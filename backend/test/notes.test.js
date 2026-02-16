import { expect } from "chai";
import request from "supertest";
import app from "../app.js";

describe("NOTES API TESTING", () => {
  let token;

  before(async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "testuser@gmail.com", password: "123456" });

    token = res.body.token;
  });

  it("POST /api/notes", async () => {
    const res = await request(app)
      .post("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test", content: "Note content" });

    expect(res.status).to.equal(201);
  });
});
