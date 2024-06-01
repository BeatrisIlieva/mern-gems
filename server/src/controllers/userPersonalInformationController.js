const router = require("express").Router();
const userPersonalInformationManager = require("../managers/userPersonalInformationManager");

router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const result = await userPersonalInformationManager.find(userId);

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: err.message,
    });
  }
});

router.put("/:userId", async (req, res) => {
  const userId = req.params.userId;

  const data = { ...req.body };

  try {
    const result = await userPersonalInformationManager.update(userId, data);

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: err.message,
    });
  }
});

module.exports = router;
