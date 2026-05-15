import { app } from "../routes/app.js";
import request from "supertest";
import { describe, it } from "@jest/globals";

let token;
beforeAll(async () => {
  await request(app).post("/auth/signUp").send({
    email: "test@user.com",
    password: `Test@user`,
    confirmPassword: `Test@user`,
    user_name: `Test User`,
  });
});

describe("AUTH routes", () => {
  const agent = request.agent(app);

  describe("POST /auth/signup", () => {
    it(`should return 400 status for Invalid Input`, async () => {
      const res = await request(app).post("/auth/signUp").send({
        email: "testuser.com",
        password: `Test@user`,
        confirmPassword: `Test@user`,
        user_name: `Test User`,
      });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty(`message`);
    });

    it(`should return 409 if user already exists ie duplicate entry with email`, async () => {
      const res = await request(app).post("/auth/signUp").send({
        email: "test@user.com",
        password: `Test@user`,
        confirmPassword: `Test@user`,
        user_name: `Test User`,
      });

      expect(res.statusCode).toBe(409);
      expect(res.body).toHaveProperty(`message`);
    });

    it(`Should return 201 for an valid signUp`, async () => {
      const res = await request(app)
        .post("/auth/signUp")
        .send({
          email: `test@${Date.now()}.com`,
          password: `Test@User`,
          confirmPassword: `Test@User`,
          user_name: `Test User`,
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty(`message`);
    });
  });

  describe("POST /auth/login", () => {
    it(`Should return 400 if Input validation fails`, async () => {
      const res = await request(app)
        .post("/auth/login")
        .send({ email: `test${Date.now()}.com`, password: `Test@user` });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty(`message`);
    });

    it(`Should return 404 if user dont have an Account yet!`, async () => {
      const res = await request(app)
        .post("/auth/login")
        .send({ email: `Test@${Date.now()}.com`, password: `TestUser#` });

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty(`message`);
    });

    it(`Should return 400 if user provides a wrong Password`, async () => {
      const res = await request(app)
        .post("/auth/login")
        .send({ email: `test@user.com`, password: `Test@User` });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty(`message`);
    });

    it(`Should return 200 for successfull login`, async () => {
      const res = await agent
        .post("/auth/login")
        .send({ email: `test@user.com`, password: `Test@user` });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty(`token`);
    });
  });

  describe("POST /auth/refresh", () => {
    it(`should return 401 if no refreshToken is recieved`, async () => {
      const res = await request(app).post("/auth/refresh");

      expect(res.statusCode).toBe(401);
    });

    it("should return 200 if the refreshToken is valid and issue a new access Token", async () => {
      const res = await agent.post("/auth/refresh");

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("token");
    });
  });
});
