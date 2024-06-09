const router = require("express").Router();
const jewelryManager = require("../managers/jewelryManager");
const { SKIP, LIMIT } = require("../constants/pagination");

router.get("/by-category/:categoryId", async (req, res) => {
  const skip = req.query.skip ? parseInt(req.query.skip, 10) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 6;

  let userId;
  if (req.user) {
    userId = req.user._id;
    console.log(req.user);
  } else {
    userId = req.headers["user-uuid"];
  }

  const categoryId = Number(req.params.categoryId);

  const data = { userId, categoryId, skipInt, limitInt };
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
