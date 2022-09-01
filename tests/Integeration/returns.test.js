let server;
const mongoose = require("mongoose");
const { Rental } = require("../../models/rental");
const { User } = require("../../models/user");
const { Movie } = require("../../models/movie");
const request = require("supertest");
const moment = require("moment");
describe("/api/returns", () => {
  let rental;
  let token;
  let customerId;
  let movieId;
  let movie;

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
    movie = new Movie({
      _id: movieId,
      title: "1234",
      genre: { name: "genre1" },
      dailyRentalRate: 2,
      numberInStock: 10,
    });
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
    await movie.save();
    await rental.save();
  });

  afterEach(async () => {
    await Rental.remove({});
    await Movie.remove({});
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
  it("should return 200 if valid  request", async () => {
    const res = await exec();
    expect(res.status).toBe(200);
  });
  it("it should set the return date", async () => {
    const res = await exec();
    // expect(res.status).toBe(200);
    expect(res.body.dateReturned).not.toBeNull();
  });
  it("it should calculate the correct rental fee ", async () => {
    rental.dateOut = moment().add(-7, "days").toDate();
    await rental.save();
    const res = await exec();
    const rentalInDb = await Rental.findById(rental._id);
    console.log(rentalInDb);
    expect(rentalInDb.rentalFee).toBe(14);
  });
  it("it should increment the numberInStock of a movie", async () => {
    rental.dateOut = moment().add(-7, "days").toDate();
    await rental.save();
    const res = await exec();
    const movie = await Movie.findById(movieId);
    expect(movie.numberInStock).toBe(11);
  });
  it("it should return the rental in the body", async () => {
    const res = await exec();
    console.log(res.body);
    const rentalInDb = await Rental.findById(rental._id);
    expect(Object.keys(res.body)).toEqual(
      expect.arrayContaining([
        "customer",
        "movie",
        "dateOut",
        "dateReturned",
        "rentalFee",
      ])
    );
  });
});
