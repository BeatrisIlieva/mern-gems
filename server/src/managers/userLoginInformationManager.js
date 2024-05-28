const UserLoginInformation = require("../models/UserLoginInformation");
const { EMAIL_ALREADY_EXISTS_ERROR_MESSAGE } = require("../constants/email");
const jwt = require("../lib/jwt");
const { SECRET } = require("../config/config");

exports.register = async (data) => {
  const user = await UserLoginInformation.findOne({ email: data.email });

  if (user) {
    throw new Error(EMAIL_ALREADY_EXISTS_ERROR_MESSAGE);
  }

  const createdUser = await UserLoginInformation.create(data);

  const token = await generateToken(createdUser);

  return { token };
};

async function generateToken(user) {
  const payload = {
    _id: user._id,
  };

  const token = await jwt.sign(payload, SECRET, { expiresIn: "1d" });

  const result = {
    _id: user._id,
    accessToken: token,
  };

  return result;
}
