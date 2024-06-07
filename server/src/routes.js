const router = require("express").Router();

const userLoginInformationController = require("./controllers/userLoginInformationController");
const userPersonalInformationController = require("./controllers/userPersonalInformationController");
const userAddressInformationController = require("./controllers/userAddressInformationController");
const jewelryController = require("./controllers/JewelryController");

router.use("/user-login-information", userLoginInformationController);
router.use("/user-personal-information", userPersonalInformationController);
router.use("/user-address-information", userAddressInformationController);
router.use("/jewelry", jewelryController);

module.exports = router;
