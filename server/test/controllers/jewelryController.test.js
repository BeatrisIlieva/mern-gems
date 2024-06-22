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
  const categoryId = 1;

  afterEach(async () => {
    await server.close();
  });

  test("Test find all jewelries by category; Expect success", async () => {
    await request.get("/").set("user-uuid", userUUID);

    const res = await request
      .get(`/jewelry/by-category/${categoryId}`)
      .set("user-uuid", userUUID);

    expect(res.status).toBe(200);

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("stoneTypesData");
    expect(res.body).toHaveProperty("stoneColorsData");
  });
});
