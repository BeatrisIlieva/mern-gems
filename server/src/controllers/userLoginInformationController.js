const router = require("express").Router();
const userLoginInformationManager = require("../managers/userLoginInformationManager");
const userPersonalInformationManager = require("../managers/userPersonalInformationManager");
const userAddressInformationManager = require("../managers/userAddressInformationManager");

router.post("/register", async (req, res) => {
  const userUUID = req.headers["user-uuid"];

  const { email, password, firstName, lastName } = req.body;

  try {
    const { token } = await userLoginInformationManager.register({
      _id: userUUID,
      email,
      password,
    });

    await userPersonalInformationManager.create({
      _id: userUUID,
      firstName,
      lastName,
    });

    await userAddressInformationManager.create({ _id: userUUID });

    res.status(201).json({ token, userId: userUUID });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: err.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {

    const { email, password } = {...req.body};
    const result = await userLoginInformationManager.login({email, password});

    res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
    res.status(401).json({
      message: err.message,
    });
  }
});

module.exports = router;
