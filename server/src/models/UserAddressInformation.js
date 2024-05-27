const mongoose = require("mongoose");
const { NAME_PATTERN, NAME_ERROR_MESSAGE } = require("../constants/name");
const { STREET_PATTERN, STREET_ERROR_MESSAGE } = require("../constants/street");
const {
  ZIP_CODE_PATTERN,
  ZIP_CODE_ERROR_MESSAGE,
} = require("../constants/zipCode");

const userAddressInformationSchema = new mongoose.Schema({
  _id: {
    type: String,
    ref: "UserLoginInformation",
    required: true,
  },
  phoneNumber: {
    type: String,
    match: [NAME_PATTERN, NAME_ERROR_MESSAGE],
  },
  country: {
    type: String,
    match: [NAME_PATTERN, NAME_ERROR_MESSAGE],
  },
  city: {
    type: String,
    match: [NAME_PATTERN, NAME_ERROR_MESSAGE],
  },
  street: {
    type: String,
    match: [STREET_PATTERN, STREET_ERROR_MESSAGE],
  },
  zipCode: {
    type: String,
    match: [ZIP_CODE_PATTERN, ZIP_CODE_ERROR_MESSAGE],
  },
});

userAddressInformationSchema.pre("save", async function () {
  this._id = this.userUUID;
});

const UserAddressInformation = mongoose.model(
  "UserAddressInformation",
  userAddressInformationSchema
);

module.exports = UserAddressInformation;
