const { User } = require("../../../models/user");
const auth = require("../../../middleware/auth");
const { default: mongoose } = require("mongoose");

describe("auth middleware", () => {
  it("should populate req.user with payload of a valid JWT", () => {
    const user = { _id: mongoose.Types.ObjectId(), admin: true };
    const token = new User(user).generateAuthenToken();
    const req = {
      header: jest.fn().mockReturnValue(token),
    };
    const res = {};
    const next = jest.fn();
    auth(req, res, next);
    expect(req.user).toHaveProperty("admin", true);
  });
});
