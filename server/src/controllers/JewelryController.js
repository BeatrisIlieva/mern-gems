const router = require("express").Router();
const jewelryManager = require("../managers/jewelryManager");

router.get("/by-category/:categoryId", async (req, res) => {
  let userId;
  
  if (req.user) {
    userId = req.user._id;
  } else {
    userId = req.headers["user-uuid"];
  }

  const categoryId = Number(req.params.categoryId);

  const data = { userId, categoryId };

  try {
    const result = await jewelryManager.findAll(data);

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: err.message,
    });
  }
});

router.get("/by-jewelry/:jewelryId", async (req, res) => {
  try {
    const jewelryId = Number(req.params.jewelryId);

    const result = await jewelryManager.findOne(jewelryId);

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: err.message,
    });
  }
});

module.exports = router;
