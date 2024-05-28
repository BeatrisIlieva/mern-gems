const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
let mongod = null;

const connectDB = async () => {
  try {
    let dbUrl = "mongodb://127.0.0.1:27017/react-gems";
    if (process.env.NODE_ENV === "test") {
      mongod = await MongoMemoryServer.create();
      dbUrl = mongod.getUri();
    }

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
    if (mongod) {
      await mongod.stop();
    }
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = { connectDB, disconnectDB };
