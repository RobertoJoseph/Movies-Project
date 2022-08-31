const mongoose = require("mongoose");
const request = require("supertest");
const { Genre } = require("../../models/genre");
const { User } = require("../../models/user");
let server;

describe("/api/generes", () => {
  beforeEach(() => {
    server = require("../../index.js");
  });
  afterEach(async () => {
    await Genre.remove({});
    await server.close();
  });

  describe("GET /", () => {
    it("get all genres", async () => {
      await Genre.collection.insertMany([{ name: "7amada" }, { name: "yel3" }]);
      const res = await request(server).get("/api/genres");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((g) => g.name === "7amada")).toBeTruthy();
    });
  });
  describe("GET /:id", () => {
    it("should return genre with id if valid", async () => {
      const genre = new Genre({ name: "genre3" });
      await genre.save();
      const res = await request(server).get(`/api/genres/${genre._id}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", "genre3");
    });
    it("should return 404 with id if is not valid", async () => {
      const res = await request(server).get("/api/genres/1}");
      expect(res.status).toBe(404);
    });
  });

  describe("POST", () => {
    let token = "";
    const exec = async () => {
      return await request(server)
        .post("/api/genres")
        .send({ name: "genr1e" })
        .set("x-auth-token", token);
    };

    beforeEach(() => {
      token = new User().generateAuthenToken();
    });

    it("should return 401 if user is not logged in", async () => {
      token = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it("should return 200 if its valid ", async () => {
      // const name = new Array(52).join("a");
      await exec();
      const genre = await Genre.find({ name: "genre1" });
      expect(genre).not.toBeNull();
    });
    it("should return the genre if its valid ", async () => {
      // const name = new Array(52).join("a");
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", "genr1e");
    });
  });

  describe("/PUT", () => {
    let id;
    it("should return 404 if ID not found", async () => {
      id = 1;
      const res = await request(server).put("/api/genres/" + id);
      expect(res.status).toBe(404);
    });
  });
});
