const UserPersonalInformation = require("../models/UserPersonalInformation");

exports.create = async (data) => {
  await UserPersonalInformation.create(data);
};

exports.find = async (userId) => {
  const result = await UserPersonalInformation.findById(userId);

  return result;
}
