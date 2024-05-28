const supertest = require("supertest");
const { app, server } = require("../../src/index");
const request = supertest(app);
const { connectDB, disconnectDB } = require("../database");
const UserLoginInformation = require("../../src/models/UserLoginInformation");
const UserPersonalInformation = require("../../src/models/UserPersonalInformation");
const UserAddressInformation = require("../../src/models/UserAddressInformation");

describe("Test User Registration", () => {
  beforeAll(() => {
    connectDB();
  });

  afterAll(() => {
    disconnectDB();
    server.close();
  });

  afterEach(async () => {
    await UserLoginInformation.findByIdAndDelete(userUUID);
    await UserPersonalInformation.findByIdAndDelete(userUUID);
    await UserAddressInformation.findByIdAndDelete(userUUID);
  });

  const userUUID = "user-id2";
  const email = "test@email.com";
  const password = "123456Bb";
  const firstName = "TestName";
  const lastName = "TestName";

  test("It should populate user models", async () => {
    const res = await request
      .post("/user-login-information/register")
      .set("user-uuid", userUUID)
      .send({ email, password, firstName, lastName });

    expect(res.status).toBe(201);

    const createdUserLoginInformation = await UserLoginInformation.findById(
      userUUID
    );
    const createdUserPersonalInformation =
      await UserPersonalInformation.findById(userUUID);
    const createdUserAddressInformation = await UserAddressInformation.findById(
      userUUID
    );

    expect(createdUserLoginInformation).not.toBeNull();
    expect(createdUserLoginInformation.email).toBe(email);

    expect(createdUserPersonalInformation).not.toBeNull();
    expect(createdUserPersonalInformation.firstName).toBe(firstName);
    expect(createdUserPersonalInformation.lastName).toBe(lastName);

    expect(createdUserAddressInformation).not.toBeNull();
  });
});
