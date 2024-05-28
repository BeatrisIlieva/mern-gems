const supertest = require("supertest");
const { app, server } = require("../../src/index");
const request = supertest(app);
const { connectDB, disconnectDB } = require("../database");
const UserLoginInformation = require("../../src/models/UserLoginInformation");
const UserPersonalInformation = require("../../src/models/UserPersonalInformation");
const UserAddressInformation = require("../../src/models/UserAddressInformation");

describe("API test", () => {
  beforeAll(() => {
    connectDB();
  });

  afterAll(() => {
    disconnectDB();
    server.close();
  });

  describe("POST /api/test", () => {
    const userUUID = "user-id12";
    const email = "bsgthhgfhdggrghhhtsi@icloud.com";
    const password = "1234567Bb";
    const firstName = "Beatris";
    const lastName = "Ilieve";

    afterEach(async () => {
      await UserLoginInformation.findByIdAndDelete(userUUID);
      await UserPersonalInformation.findByIdAndDelete(userUUID);
      await UserAddressInformation.findByIdAndDelete(userUUID);
    });

    it("example request using a mocked database instance", async () => {
      const res = await request
        .post("/user-login-information/register")
        .set("user-uuid", userUUID)
        .send({ email, password, firstName, lastName });

      expect(res.status).toBe(201);
    });
  });
});

// const {MongoClient} = require('mongodb');
// const bcrypt = require("bcrypt");
// const { DEFAULT_SALT } = require("../../src/constants/password");

// describe('insert', () => {
//   let connection;
//   let db;

//   beforeAll(async () => {
//     connection = await MongoClient.connect(globalThis.__MONGO_URI__, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     db = await connection.db(globalThis.__MONGO_DB_NAME__);
//   });

//   afterAll(async () => {
//     await connection.close();
//   });

//   it('should insert a doc into collection', async () => {
//     const users = db.collection('UserLoginInformation');

//     const mockUser = {_id: 'user-id', email: "email@icloud.com", password: "123456Bb", firstName: "FirstName", lastName: "LastName"};

//     await users.create(mockUser);

//     const hash = await bcrypt.hash("123456Bb", DEFAULT_SALT);

//     console.log(hash)

//     const insertedUser = await users.findOne({_id: 'user-id', email: "email@icloud.com", password: hash});

//     expect(insertedUser).toEqual(mockUser);
//   });
// });
