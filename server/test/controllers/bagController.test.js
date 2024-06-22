const supertest = require("supertest");
const { app, server } = require("../../src/index");
const request = supertest(app);
const { connectDB, disconnectDB } = require("../database");
const UserLoginInformation = require("../../src/models/UserLoginInformation");
const UserPersonalInformation = require("../../src/models/UserPersonalInformation");
const UserAddressInformation = require("../../src/models/UserAddressInformation");
const Bag = require("../../src/models/Bag");
const {
  DEFAULT_ADD_QUANTITY,
  DEFAULT_MIN_QUANTITY,
  NOT_SELECTED_SIZE_ERROR_MESSAGE,
  SOLD_OUT_JEWELRY_ERROR_MESSAGE,
} = require("../../src/constants/bag");
const Jewelry = require("../../src/models/Jewelry");

describe("bagController", () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await disconnectDB();
    await new Promise((resolve) => setTimeout(() => resolve(), 1000));
  });

  beforeEach(async () => {
    jest.setTimeout(30000);
  });

  const userUUID = "user-id";
  const email = "test@email.com";
  const password = "123456Bb";
  const firstName = "TestName";
  const lastName = "TestName";
  const jewelryId = 1;
  const size = 1;

  afterEach(async () => {
    await UserLoginInformation.findByIdAndDelete(userUUID);
    await UserPersonalInformation.findByIdAndDelete(userUUID);
    await UserAddressInformation.findByIdAndDelete(userUUID);
    await Bag.findOneAndDelete({user: userUUID});

    await server.close();
  });

  test("Test add to shopping bag, not registered user; Expect success", async () => {
    await request
      .get("/")
      .set("user-uuid", userUUID)

    const res2 = await request
      .post(`/bag/create/${jewelryId}`)
      .set("user-uuid", userUUID)
      .send({
        size,
      });

    expect(res2.status).toBe(200);

    const bag = await Bag.find({ user: userUUID });

    expect(bag[0].quantity).toBe(DEFAULT_ADD_QUANTITY);
  });

  test("Test add to shopping bag, registered user; Expect success", async () => {
    const res1 = await request
      .post("/user-login-information/register")
      .set("user-uuid", userUUID)
      .send({ email, password, firstName, lastName });

    expect(res1.status).toBe(201);

    const res2 = await request
      .post(`/bag/create/${jewelryId}`)
      .set("user-uuid", userUUID)
      .send({
        size,
      });

    expect(res2.status).toBe(200);

    const bag = await Bag.find({ user: userUUID });

    expect(bag[0].quantity).toBe(DEFAULT_ADD_QUANTITY);
  });
});
