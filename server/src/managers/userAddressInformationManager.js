const UserAddressInformation = require("../models/UserAddressInformation");

exports.create = async (data) => {
  await UserAddressInformation.create(data);
};
