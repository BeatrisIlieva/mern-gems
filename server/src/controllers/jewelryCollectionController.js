const router = require("express").Router();
const jewelryCollectionManager = require("../managers/jewelryCollectionManager");
const{SKIP, LIMIT} = require("../constants/pagination");

router.get("/:jewelryCollectionId/:skip/:limit", async (req, res) => {
  const skip = Number(req.params.skip) ? Number(req.params.skip) : SKIP;
  const limit = Number(req.params.limit) ? Number(req.params.limit) : LIMIT;

  let userId;

  if (req.user) {
    userId = req.user._id;
    console.log(req.user);
  } else {
    userId = req.headers["user-uuid"];
  }

  const jewelryCollectionId = Number(req.params.jewelryCollectionId);

  const data = { userId, jewelryCollectionId, skip, limit };

  try {
    const result = await jewelryCollectionManager.findAll(data);

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: err.message,
    });
  }
});

module.exports = router;
