const router = require("express").Router();
const userLoginInformationManager = require("../managers/userLoginInformationManager");
const userPersonalInformationManager = require("../managers/userPersonalInformationManager");
const userAddressInformationManager = require("../managers/userAddressInformationManager");

router.post("/register", async (req, res) => {
  const userUUID = req.headers["user-uuid"];

  const { email, password, firstName, lastName } = req.body;

  try {
    const { token } = await userLoginInformationManager.register({
      userUUID,
      email,
      password,
    });

    await userPersonalInformationManager.create({
      userUUID,
      firstName,
      lastName,
    });

    await userAddressInformationManager.create(userUUID);

    res.status(200).json({ token, userId: userUUID });
  } catch (err) {
    console.log(err.message);
    res.status(401).json({
      message: err.message,
    });
  }
});

module.exports = router;
