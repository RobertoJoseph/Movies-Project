const { default: mongoose } = require("mongoose");
const request = require("supertest");
const { Genre } = require("../../models/genre");
let server;

describe("/api/generes", () => {
  beforeEach(() => {
    server = require("../../index.js");
  });
  afterEach(async () => {
    server.close();
    await Genre.remove({});
  });

  describe("GET /", () => {
    it("get all genres", async () => {
      await Genre.collection.insertMany([{ name: "7amada" }, { name: "yel3" }]);
      const res = await request(server).get("/api/genres");
      console.log(res.body);
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
});
