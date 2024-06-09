const JewelryCollection = require("../models/JewelryCollection");

exports.findAll = async (jewelryCollectionId) => {
  const query = [
    {
      $lookup: {
        as: "inventories",
        from: "inventories",
        foreignField: "jewelry",
        localField: "_id",
      },
    },
    {
      $lookup: {
        as: "categories",
        from: "categories",
        foreignField: "_id",
        localField: "category",
      },
    },
    {
      jewelryCollection: jewelryCollectionId,
    },
    {
      $lookup: {
        as: "wishlists",
        from: "wishlists",
        foreignField: "jewelry",
        localField: "_id",
      },
    },
    {
      $lookup: {
        from: "wishlists",
        let: { jewelryId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$jewelry", "$$jewelryId"],
                  },
                  {
                    $eq: ["$user", data.userId],
                  },
                ],
              },
            },
          },
        ],
        as: "userWishlist",
      },
    },
    {
      $group: {
        _id: "$_id",
        price: {
          $first: {
            $arrayElemAt: ["$inventories.price", 0],
          },
        },
        firstImageUrl: {
          $addToSet: "$firstImageUrl",
        },
        jewelryIds: {
          $push: "$_id",
        },
        categoryTitle: {
          $addToSet: "$categories.title",
        },
        categoryId: {
          $addToSet: "$categories._id",
        },
        jewelryTitle: {
          $addToSet: "$title",
        },
        inventories: {
          $push: "$inventories",
        },
        isLikedByUser: {
          $first: {
            $gt: [{ $size: "$userWishlist" }, 0],
          },
        },
      },
    },
    {
      $addFields: {
        isSoldOut: {
          $reduce: {
            input: "$inventories",
            initialValue: true,
            in: {
              $and: [
                "$$value",
                {
                  $eq: [
                    {
                      $size: {
                        $filter: {
                          input: "$$this",
                          as: "inv",
                          cond: {
                            $gt: ["$$inv.quantity", 0],
                          },
                        },
                      },
                    },
                    0,
                  ],
                },
              ],
            },
          },
        },
      },
    },
    {
      $project: {
        price: 1,
        firstImageUrl: 1,
        jewelryIds: 1,
        categoryTitle: 1,
        categoryId: 1,
        jewelryTitle: 1,
        isSoldOut: 1,
        isLikedByUser: 1,
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ];
  const result = await JewelryCollection.aggregate(query);

  return result;
};
