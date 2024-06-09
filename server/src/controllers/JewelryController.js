const router = require("express").Router();
const jewelryManager = require("../managers/jewelryManager");
const { SKIP, LIMIT } = require("../constants/pagination");

router.get("/by-category/:categoryId/:skip/:limit", async (req, res) => {
  const skip = Number(req.params.skip) ? Number(req.params.skip) : SKIP;
  const limit = Number(req.params.limit) ? Number(req.params.limit) : LIMIT;

  let userId;
  if (req.user) {
    userId = req.user._id;
    console.log(req.user);
  } else {
    userId = req.headers["user-uuid"];
  }

  const categoryId = Number(req.params.categoryId);

  const data = { userId, categoryId, skip, limit };

  try {
    const result = await jewelryManager.findAll(data);
    console.log("*************")
    console.log(result)

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
