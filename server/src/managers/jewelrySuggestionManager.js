const Jewelry = require("../models/Jewelry");
const getCategoryIds = require("../utils/getCategoryIds");

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
