const UserPersonalInformation = require("../models/UserPersonalInformation");

exports.create = async (data) => {
  const userUUID = data.userUUID;
  const firstName = data.firstName;
  const lastName = data.lastName;

  await UserPersonalInformation.create({
    userUUID,
    firstName,
    lastName,
  });
};

// exports.find = async (userUUID) => {
//   const result = await UserPersonalInformation.findOne({
//     _id: userUUID,
//   });

//   return result;
// };

// exports.update = async (userUUID, data) => {
//    const profile = await Profile.findOneAndUpdate(
//     { user: userId },
//     profileData,
//     { runValidators: true, new: true }
//   );
//   return profile;
// };
