const supertest = require("supertest");
const { app, server } = require("../../src/index");
const request = supertest(app);
const { connectDB, disconnectDB } = require("../database");
const UserLoginInformation = require("../../src/models/UserLoginInformation");
const UserPersonalInformation = require("../../src/models/UserPersonalInformation");
const UserAddressInformation = require("../../src/models/UserAddressInformation");
const {
  EMAIL_ALREADY_EXISTS_ERROR_MESSAGE,
} = require("../../src/constants/email");

describe("userLoginInformationController", () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await disconnectDB();
    server.close();
  });

  const userUUID1 = "user-id1";
  const userUUID2 = "user-id2";
  const email = "test@email.com";
  const wrongEmail = "test2@email.com";
  const updatedEmail = "test3@email.com";
  const password = "123456Bb";
  const wrongPassword = "123456Bc";
  const firstName = "TestName";
  const lastName = "TestName";

  afterEach(async () => {
    await UserLoginInformation.findByIdAndDelete(userUUID1);
    await UserPersonalInformation.findByIdAndDelete(userUUID1);
    await UserAddressInformation.findByIdAndDelete(userUUID1);

    await UserLoginInformation.findByIdAndDelete(userUUID2);
    await UserPersonalInformation.findByIdAndDelete(userUUID2);
    await UserAddressInformation.findByIdAndDelete(userUUID2);
  });

  test("Test user registration; It should populate user models; Expect success", async () => {
    const res = await request
      .post("/user-login-information/register")
      .set("user-uuid", userUUID1)
      .send({ email, password, firstName, lastName });

    expect(res.status).toBe(201);

    const createdUserLoginInformation = await UserLoginInformation.findById(
      userUUID1
    );

    const createdUserPersonalInformation =
      await UserPersonalInformation.findById(userUUID1);

    const createdUserAddressInformation = await UserAddressInformation.findById(
      userUUID1
    );

    expect(createdUserLoginInformation).not.toBeNull();
    expect(createdUserLoginInformation.email).toBe(email);

    expect(createdUserPersonalInformation).not.toBeNull();
    expect(createdUserPersonalInformation.firstName).toBe(firstName);
    expect(createdUserPersonalInformation.lastName).toBe(lastName);

    expect(createdUserAddressInformation).not.toBeNull();
  });

  test("Test user registration; It should not populate user models with duplicate email; Expect error", async () => {
    const res1 = await request
      .post("/user-login-information/register")
      .set("user-uuid", userUUID1)
      .send({ email, password, firstName, lastName });

    expect(res1.status).toBe(201);

    const res2 = await request
      .post("/user-login-information/register")
      .set("user-uuid", userUUID2)
      .send({ email, password, firstName, lastName });

    expect(res2.status).toBe(401);
    expect(res2.body.message).toBe(EMAIL_ALREADY_EXISTS_ERROR_MESSAGE);

    const createdUserLoginInformation = await UserLoginInformation.findById(
      userUUID2
    );
    const createdUserPersonalInformation =
      await UserPersonalInformation.findById(userUUID2);
    const createdUserAddressInformation = await UserAddressInformation.findById(
      userUUID2
    );

    expect(createdUserLoginInformation).toBeNull();
    expect(createdUserPersonalInformation).toBeNull();
    expect(createdUserAddressInformation).toBeNull();
  });

  test("Test user login; It should login user; Expect success", async () => {
    await request
      .post("/user-login-information/register")
      .set("user-uuid", userUUID1)
      .send({ email, password, firstName, lastName });

    const res2 = await request
      .post("/user-login-information/login")
      .set("user-uuid", userUUID1)
      .send({ email, password });

    expect(res2.status).toBe(200);
  });

  test("Test user login with wrong password; It should not login user; Expect error", async () => {
    await request
      .post("/user-login-information/register")
      .set("user-uuid", userUUID1)
      .send({ email, password, firstName, lastName });

    const res2 = await request
      .post("/user-login-information/login")
      .set("user-uuid", userUUID1)
      .send({ email, wrongPassword });

    expect(res2.status).toBe(401);
  });

  test("Test user login with wrong email; It should not login user; Expect error", async () => {
    await request
      .post("/user-login-information/register")
      .set("user-uuid", userUUID1)
      .send({ email, password, firstName, lastName });

    const res2 = await request
      .post("/user-login-information/login")
      .set("user-uuid", userUUID1)
      .send({ wrongEmail, password });

    expect(res2.status).toBe(401);
  });

  test("Test delete user; Expect success", async () => {
    const res = await request
      .delete(`/user-login-information/${userUUID1}`)
      .set("user-uuid", userUUID1);

    expect(res.status).toBe(200);

    const deletedUserLoginInformation = await UserLoginInformation.findById(
      userUUID1
    );

    const deletedUserPersonalInformation =
      await UserPersonalInformation.findById(userUUID1);

    const deletedUserAddressInformation = await UserAddressInformation.findById(
      userUUID1
    );

    expect(deletedUserLoginInformation).toBeNull();
    expect(deletedUserPersonalInformation).toBeNull();
    expect(deletedUserAddressInformation).toBeNull();
  });

  test("Test update user email with valid password; Expect success", async () => {
    const res1 = await request
      .post("/user-login-information/register")
      .set("user-uuid", userUUID1)
      .send({ email, password, firstName, lastName });

    expect(res1.status).toBe(201);

    const res2 = await request
      .put(`/user-login-information/update-email/${userUUID1}`)
      .set("user-uuid", userUUID1)
      .send({ email: updatedEmail, password });

    expect(res2.status).toBe(200);

    const updatedUserLoginInformation = await UserLoginInformation.findById(
      userUUID1
    );

    expect(updatedUserLoginInformation.email).toBe(updatedEmail);
  });
});
