const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({
  _id: {
    type: Number,
    default: 0,
  },
  title: {
    type: String,
    required: true,
  },
});

collectionSchema.pre("save", async function () {
  const currentId = await setID();

  this._id = currentId;
});

const collection = mongoose.model("Collection", collectionSchema);

module.exports = collection;

const setID = async () => {
  try {
    let lastObj = await collection.findOne().sort({ _id: -1 });

    lastId = lastObj._id;

    nextId = lastId + 1;

    return nextId;
  } catch (err) {
    return 1;
  }
};
