const router = require("express").Router();

const userLoginInformationController = require("./controllers/userLoginInformationController");

router.use("/user-login-information", userLoginInformationController);

module.exports = router;
