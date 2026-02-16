import { expect } from "chai";
import request from "supertest";
import app from "../app.js";

describe("AUTH API TESTING", () => {

  const user = {
    firstName: "Test",
    lastName: "User",
    email: "testuser@gmail.com",
    password: "123456"
  };

  it("POST /api/auth/signup", async () => {
    const res = await request(app)
      .post("/api/auth/signup")
      .send(user);

    expect(res.status).to.equal(201);
  });

  it("POST /api/auth/login", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: user.email, password: user.password });

    expect(res.status).to.equal(200);
  });

});
