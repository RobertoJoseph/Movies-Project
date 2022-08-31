let server;
const mongoose = require("mongoose");
const { Rental } = require("../../models/rental");
const { User } = require("../../models/user");
const request = require("supertest");
describe("/api/returns", () => {
  let rental;
  let token;
  let customerId;
  let movieId;

  const exec = () => {
    return request(server)
      .post("/api/returns")
      .send({ customerId, movieId })
      .set("x-auth-token", token);
  };
  beforeEach(async () => {
    server = require("../../index.js");
    token = new User().generateAuthenToken();
    customerId = mongoose.Types.ObjectId();
    movieId = mongoose.Types.ObjectId();
    rental = new Rental({
      customer: {
        _id: customerId,
        name: "12345",
        phone: "123455",
      },
      movie: {
        _id: movieId,
        title: "7amadayel3b",
        dailyRentalRate: 2,
      },
    });
    await rental.save();
  });

  afterEach(async () => {
    await Rental.remove({});
    await server.close();
  });

  it("should return 401 if user not logged in", async () => {
    token = "";
    const res = await exec();
    expect(res.status).toBe(401);
  });
  it("should return 400 if customerId not provided", async () => {
    customerId = "";
    const res = await exec();
    expect(res.status).toBe(400);
  });
  it("should return 400 if movie not provided", async () => {
    movieId = "";
    const res = await exec();
    expect(res.status).toBe(400);
  });
  it("should return 404 if no rental found with given props", async () => {
    await Rental.remove({});
    const res = await exec();
    expect(res.status).toBe(404);
  });
  it("should return 400 if rental is already processed", async () => {
    rental.dateReturned = new Date();
    await rental.save();
    
    const res = await exec();
    expect(res.status).toBe(400);
  });
});
