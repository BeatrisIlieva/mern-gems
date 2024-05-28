const UserPersonalInformation = require("../models/UserPersonalInformation");

exports.create = async (data) => {
  await UserPersonalInformation.create(data);
};
