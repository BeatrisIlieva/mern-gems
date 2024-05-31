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

exports.login = async (email, password) => {
  const user = await UserLoginInformation.findOne({ email });

  if (!user) {
    throw new Error(
      "We couldn't find an account matching the email and password you entered"
    );
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error(
      "We couldn't find an account matching the email and password you entered"
    );
  }

  const token = await generateToken(user);

  return { token, user };
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
