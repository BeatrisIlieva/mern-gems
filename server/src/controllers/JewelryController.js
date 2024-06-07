const router = require("express").Router();
const jewelryManager = require("../managers/jewelryManager");

router.get("/:categoryId", async (req, res) => {
  try {
    const categoryId = Number(req.params.categoryId);

    const result = await jewelryManager.getAll(categoryId);

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: err.message,
    });
  }
});

module.exports = router;
