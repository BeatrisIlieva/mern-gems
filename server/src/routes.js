const router = require("express").Router();

const userLoginInformationController = require("./controllers/userLoginInformationController");
const userPersonalInformationController = require("./controllers/userPersonalInformationController");

router.use("/user-login-information", userLoginInformationController);
router.use("/user-personal-information", userPersonalInformationController);

module.exports = router;
