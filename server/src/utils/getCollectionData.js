const JewelryCollection = require("../models/JewelryCollection");

exports.getJewelryCollectionData = async (jewelryIds) => {
  let matchCondition = jewelryIds.reduce((acc, curr) => {
    let jewelryId = curr;
    acc.push({ jewelry: jewelryId });
    return acc;
  }, []);

  let collectionData = await JewelryCollection.aggregate([
    {
      $lookup: {
        as: "jewelries",
        from: "jewelries",
        foreignField: "_id",
        localField: "jewelry",
      },
    },
    {
      $match: {
        $or: jewelryMatchCondition,
      },
    },
    {
      $lookup: {
        as: "metals",
        from: "metals",
        foreignField: "_id",
        localField: "metal",
      },
    },
    {
      $project: {
        "metals._id": 1,
        "metals.title": 1,
      },
    },
    {
      $group: {
        _id: "$metals._id",
        title: {
          $first: "$metals.title",
        },
        count: {
          $count: {},
        },
      },
    },
  ]);

  return metalsData;
};
