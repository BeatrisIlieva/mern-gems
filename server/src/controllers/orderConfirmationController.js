const router = require("express").Router();
const orderConfirmationManager = require("../managers/orderConfirmationManager");
const Bag = require("../models/Bag");

router.get("/display/:userId", async (req, res) => {
  const userId = req.user._id;

  try {
    const order = await orderConfirmationManager.getOne(userId);

    await Bag.deleteMany({ user: userId });

    res.status(200).json(order);
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: err.message,
    });
  }
});

module.exports = router;
