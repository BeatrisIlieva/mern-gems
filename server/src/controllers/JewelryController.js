const router = require("express").Router();
const jewelryManager = require("../managers/jewelryManager");

router.get("/:categoryId", async (req, res) => {
  try {
    let categoryId = req.params.categoryId;

    categoryId = Number(categoryId);

    let jewelries = await jewelryManager.getAll(categoryId);


    if (req.user) {
      const userId = req.user._id;


    jewelries = await setJewelriesLikedAuthUser(jewelries, userId);
    }

    else {
      jewelries = await jewelryManager.getAll(categoryId);
    }

    res.status(200).json(jewelries);
  } catch (err) {
    console.log(err.message);

    res.status(400).json({
      message: "Some error",
    });
  }
});

module.exports = router;