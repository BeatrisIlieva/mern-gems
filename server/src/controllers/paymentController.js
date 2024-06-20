const router = require("express").Router();
const paymentManager = require("../managers/paymentManager");
const orderConfirmationManager = require("../managers/orderConfirmationManager");

router.post("/:userId", async (req, res) => {
  const userId = req.user._id;

  const {
    longCardNumber,
    cardHolder,
    cvvCode,
    expirationMonth,
    expirationYear,
  } = { ...req.body };

  try {
    await paymentManager.verifyCardDetails(
      longCardNumber,
      cardHolder,
      cvvCode,
      expirationMonth,
      expirationYear
    );

    const order = await orderConfirmationManager.create(userId);

    res.status(200).json({ order });
  } catch (err) {
    console.log(err.message);
    res.status(401).json({ message: err.message });
  }
});

module.exports = router;
