const router = require("express").Router();
const orderConfirmationManager = require("../managers/orderConfirmationManager");
const userAddressInformationManager = require("../managers/userAddressInformationManager");
const Bag = require("../models/Bag");

router.get("/display/:userId", async (req, res) => {
  const userId = req.user._id;

  try {
    const order = await orderConfirmationManager.getOne(userId);

    const address = await userAddressInformationManager.find(userId);

    await Bag.deleteMany({ user: userId });

    res.status(200).json({ order, address });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: err.message,
    });
  }
});

module.exports = router;
