const router = require("express").Router();
const userPersonalInformationManager = require("../managers/userPersonalInformationManager");

router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  console.log("controller")

  try {
    const result = await userPersonalInformationManager.find(userId);

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: err.message,
    });
  }
});

// router.post("/update", async (req, res) => {
//   const userUUID = req.headers["user-uuid"];

//   const { email, password, firstName, lastName } = req.body;

//   try {
//     const { token } = await userLoginInformationManager.register({
//       _id: userUUID,
//       email,
//       password,
//     });

//     await userPersonalInformationManager.create({
//       _id: userUUID,
//       firstName,
//       lastName,
//     });

//     await userAddressInformationManager.create({ _id: userUUID });

//     res.status(201).json({ token, userId: userUUID });
//   } catch (err) {
//     console.log(err);
//     res.status(401).json({
//       message: err.message,
//     });
//   }
// });

module.exports = router;
