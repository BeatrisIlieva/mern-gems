const router = require("express").Router();
const jewelryManager = require("../managers/jewelryManager");
const { getStoneTypesData } = require("../utils/getStoneTypesData");

// router.get("/by-category/:categoryId", async (req, res) => {
//   const serializedObject =
//     req.query.data !== "undefined" ? req.query.data : "undefined";
//   const selection =
//     req.query.data !== "undefined"
//       ? JSON.parse(decodeURIComponent(serializedObject))
//       : null;


//   let userId;

//   if (req.user) {
//     userId = req.user._id;
//   } else {
//     userId = req.headers["user-uuid"];
//   }

//   const categoryId = Number(req.params.categoryId);

//   let data;
//   let selectionQuery = [];

//   if (selection) {
//     selectionQuery = updateSelectionQuery(selection);
//     console.log(selectionQuery);
//     data = { userId, categoryId, selectionQuery };
//   } else {
//     data = { userId, categoryId, selectionQuery };
//   }

//   try {
//     let result = await jewelryManager.findAll(data);

//     const jewelries = result.data;

//     const jewelryIds = jewelries.map((jewelry) => jewelry._id);

//     const stoneTypesData = await getStoneTypesData(jewelryIds);

//     result = { ...result, stoneTypesData };

//     res.status(200).json(result);
//   } catch (err) {
//     console.log(err);
//     res.status(401).json({
//       message: err.message,
//     });
//   }
// });

router.get("/by-category/:categoryId", async (req, res) => {



  let userId;

  if (req.user) {
    userId = req.user._id;
  } else {
    userId = req.headers["user-uuid"];
  }

  const categoryId = Number(req.params.categoryId);

  data = { userId, categoryId};

  try {
    let result = await jewelryManager.findAll(data);

    const jewelries = result.data;

    const jewelryIds = jewelries.map((jewelry) => jewelry._id);

    const stoneTypesData = await getStoneTypesData(jewelryIds);

    result = { ...result, stoneTypesData };

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
