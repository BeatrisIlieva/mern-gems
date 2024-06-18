const router = require("express").Router();

const userLoginInformationController = require("./controllers/userLoginInformationController");
const userPersonalInformationController = require("./controllers/userPersonalInformationController");
const userAddressInformationController = require("./controllers/userAddressInformationController");
const jewelryController = require("./controllers/jewelryController");
const wishlistController = require("./controllers/wishlistController");
const jewelryCollectionController = require("./controllers/jewelryCollectionController");
const stoneController = require("./controllers/stoneController");
const searchController = require("./controllers/searchController");
const bagController = require("./controllers/bagController");
const checkoutController = require("./controllers/checkoutController");
const paymentController = require("./controllers/paymentController");
const orderConfirmationController = require("./controllers/orderConfirmationController");

router.use("/user-login-information", userLoginInformationController);
router.use("/user-personal-information", userPersonalInformationController);
router.use("/user-address-information", userAddressInformationController);
router.use("/jewelry", jewelryController);
router.use("/wishlist", wishlistController);
router.use("/collection", jewelryCollectionController);
router.use("/stone", stoneController);
router.use("/search", searchController);
router.use("/bag", bagController);
router.use("/checkout", checkoutController);
router.use("/payment", paymentController);
router.use("/order-confirmation", orderConfirmationController);

module.exports = router;
