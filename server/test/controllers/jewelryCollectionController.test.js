const supertest = require("supertest");
const { app, server } = require("../../src/index");
const request = supertest(app);
const { connectDB, disconnectDB } = require("../database");

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
  const collectionId = 1;

  afterEach(async () => {
    await server.close();
  });

  test("Test find all jewelries by category; Expect success", async () => {
    await request.get("/").set("user-uuid", userUUID);

    const res = await request
      .get(`/collection/${collectionId}`)
      .set("user-uuid", userUUID);

    expect(res.status).toBe(200);

    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("stoneTypesData");
    expect(res.body).toHaveProperty("stoneColorsData");
  });
});
