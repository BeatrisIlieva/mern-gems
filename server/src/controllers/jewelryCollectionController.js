const router = require("express").Router();
const jewelryCollectionManager = require("../managers/jewelryCollectionManager");

router.get("/:jewelryCollectionId", async (req, res) => {
  const jewelryCollectionId = Number(req.params.jewelryCollectionId);

  try {
    const result = await jewelryCollectionManager.findAll(jewelryCollectionId);

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: err.message,
    });
  }
});