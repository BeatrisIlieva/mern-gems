const Jewelry = require("../models/Jewelry");
const Category = require("../models/Category");

// const getCategoryIds = async (categoryId) => {
//   try {
//     const allCategories = await Category.find({}, "_id").lean();
//     console.log(allCategories, "categories")
//     return allCategories.map((doc) => doc._id !== categoryId);
//   } catch (err) {
//     console.log(err.message);
//   }
// };

const getCategoryIds = async (excludeCategoryId) => {
  try {
    const allCategories = await Category.find({}, "_id").lean();

    const categoryIds = allCategories
      .map((doc) => doc._id)
      .filter((id) => id.toString() !== excludeCategoryId.toString());

    return categoryIds;
  } catch (err) {
    console.log(err.message);
  }
};

exports.findAll = async (jewelryId) => {
  const jewelry = await Jewelry.findById(jewelryId);

  const categoryId = jewelry.category;

  const collectionId = jewelry.jewelryCollection;

  const categoryIds = await getCategoryIds(categoryId);

  const result = await Jewelry.aggregate([
    {
      $lookup: {
        as: "categories",
        from: "categories",
        foreignField: "_id",
        localField: "category",
      },
    },
    {
      $match: {
        category: { $in: categoryIds },
      },
    },
    {
      $lookup: {
        as: "jewelrycollections",
        from: "jewelrycollections",
        foreignField: "_id",
        localField: "jewelryCollection",
      },
    },
    {
      $match: {
        jewelryCollection: collectionId,
      },
    },
    {
      $lookup: {
        as: "inventories",
        from: "inventories",
        foreignField: "jewelry",
        localField: "_id",
      },
    },
    {
      $match: {
        "inventories.quantity": {
          $gt: 0,
        },
      },
    },
    {
      $sort: {
        "categories._id": 1,
      },
    },
    {
      $project: {
        "categories.title": 1,
        title: 1,
        firstImageUrl: 1,
      },
    },
  ]);
  return result;
};
