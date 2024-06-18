const router = require("express").Router();
const Order = require("../models/Order");

router.get("/:userId", async (req, res) => {
  const userId = req.user._id;
  try {
    orderItems = await Order.find({ user: userId });
    res.status(200).json(orderItems);
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: err.message,
    });
  }
});

module.exports = router;
