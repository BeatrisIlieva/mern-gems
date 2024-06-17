const router = require("express").Router();
const userAddressInformationManager = require("../managers/userAddressInformationManager");

router.put("/update/:userId", async (req, res) => {
  const userId = req.user._id;

  profileData = req.body;

  try {
    const address = await userAddressInformationManager.update(
      userId,
      profileData
    );

    res.status(200).json(address);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

module.exports = router;
