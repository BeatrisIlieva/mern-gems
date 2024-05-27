const UserAddressInformation = require("../models/UserAddressInformation");

exports.create = async (userUUId) => {
  await UserAddressInformation.create({
    _id: userUUId,
  });
};

// exports.getOne = async (userId) => {
//   const address = await AddressBook.findOne({
//     user: userId,
//   });

//   return address;
// };

// exports.update = async (userId, addressData) => {
//    const address = await AddressBook.findOneAndUpdate(
//     { user: userId },
//     addressData,
//     { runValidators: true, new: true }
//   );
//   return address;
// };
