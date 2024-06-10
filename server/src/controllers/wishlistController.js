const router = require("express").Router();
const wishlistManager = require("../managers/wishlistManager");
const { SKIP, LIMIT } = require("../constants/pagination");

router.get("/find-all/:skip/:limit", async (req, res) => {
  const skip = Number(req.params.skip) ? Number(req.params.skip) : SKIP;
  const limit = Number(req.params.limit) ? Number(req.params.limit) : LIMIT;

  let userId;

  if (req.user) {
    userId = req.user._id;
  } else {
    userId = req.headers["user-uuid"];
  }

  const data = { userId, skip, limit };

  try {
    const result = await wishlistManager.findAll(data);

    console.log(result)

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: err.message,
    });
  }
});

router.get("/find-count", async (req, res) => {
  let userId;

  if (req.user) {
    userId = req.user._id;
  } else {
    userId = req.headers["user-uuid"];
  }

  try {
    const result = await wishlistManager.findCount(userId);

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: err.message,
    });
  }
});

router.post("/create/:jewelryId", async (req, res) => {
  let userId;

  if (req.user) {
    userId = req.user._id;
  } else {
    userId = req.headers["user-uuid"];
  }

  const jewelryId = Number(req.params.jewelryId);

  const data = { user: userId, jewelry: jewelryId };

  try {
    const result = await wishlistManager.create(data);

    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: err.message,
    });
  }
});

router.delete("/delete/:jewelryId", async (req, res) => {
  let userId;

  if (req.user) {
    userId = req.user._id;
  } else {
    userId = req.headers["user-uuid"];
  }

  const jewelryId = Number(req.params.jewelryId);

  const data = { user: userId, jewelry: jewelryId };

  try {
    const result = await wishlistManager.delete(data);

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: err.message,
    });
  }
});

module.exports = router;
