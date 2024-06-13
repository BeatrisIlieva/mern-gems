const Jewelry = require("../models/Jewelry");

exports.findAll = async (data) => {
  // console.log(data.selectionQuery)
  // const query = [
  //   // ...data.selectionQuery,
  //   {
  //     $lookup: {
  //       as: "inventories",
  //       from: "inventories",
  //       foreignField: "jewelry",
  //       localField: "_id",
  //     },
  //   },
  //   {
  //     $lookup: {
  //       as: "categories",
  //       from: "categories",
  //       foreignField: "_id",
  //       localField: "category",
  //     },
  //   },
  //   {
  //     $match: {
  //       category: data.categoryId,
  //     },
  //   },
  //   {
  //     $lookup: {
  //       as: "wishlists",
  //       from: "wishlists",
  //       foreignField: "jewelry",
  //       localField: "_id",
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "wishlists",
  //       let: { jewelryId: "$_id" },
  //       pipeline: [
  //         {
  //           $match: {
  //             $expr: {
  //               $and: [
  //                 { $eq: ["$jewelry", "$$jewelryId"] },
  //                 { $eq: ["$user", data.userId] },
  //               ],
  //             },
  //           },
  //         },
  //       ],
  //       as: "userWishlist",
  //     },
  //   },
  //   {
  //     $group: {
  //       _id: "$_id",
  //       price: { $first: { $arrayElemAt: ["$inventories.price", 0] } },
  //       firstImageUrl: { $addToSet: "$firstImageUrl" },
  //       jewelryIds: { $push: "$_id" },
  //       categoryTitle: { $addToSet: "$categories.title" },
  //       categoryId: { $addToSet: "$categories._id" },
  //       jewelryTitle: { $addToSet: "$title" },
  //       inventories: { $push: "$inventories" },
  //       isLikedByUser: { $first: { $gt: [{ $size: "$userWishlist" }, 0] } },
  //     },
  //   },
  //   {
  //     $addFields: {
  //       isSoldOut: {
  //         $reduce: {
  //           input: "$inventories",
  //           initialValue: true,
  //           in: {



  const query = [
    {
      $lookup: {
        as: "inventories",
        from: "inventories",
        foreignField: "jewelry",
        localField: "_id"
      }
    },
    {
      $lookup: {
        as: "categories",
        from: "categories",
        foreignField: "_id",
        localField: "category"
      }
    },
    {
      $match: {
        category: data.categoryId
      }
    },
    {
      $lookup: {
        as: "wishlists",
        from: "wishlists",
        foreignField: "jewelry",
        localField: "_id"
      }
    },
    {
      $lookup: {
        from: "wishlists",
        let: {
          jewelryId: "$_id"
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$jewelry", "$$jewelryId"]
                  },
                  {
                    $eq: ["$user", data.userId]
                  }
                ]
              }
            }
          }
        ],
        as: "userWishlist"
      }
    },
    {
      $lookup: {
        as: "jewelrystones",
        from: "jewelrystones",
        foreignField: "jewelry",
        localField: "_id"
      }
    },
    {
      $lookup: {
        as: "stonetypes",
        from: "stonetypes",
        foreignField: "_id",
        localField: "jewelrystones.stoneType"
      }
    },

    {
      $lookup: {
        as: "stonecolors",
        from: "stonecolors",
        foreignField: "_id",
        localField: "jewelrystones.stoneColor"
      }
    },
    {
      $group: {
        _id: "$_id",
        price: {
          $first: {
            $arrayElemAt: ["$inventories.price", 0]
          }
        },
        firstImageUrl: {
          $addToSet: "$firstImageUrl"
        },
        jewelryIds: {
          $push: "$_id"
        },
        categoryTitle: {
          $addToSet: "$categories.title"
        },
        categoryId: {
          $addToSet: "$categories._id"
        },
        jewelryTitle: {
          $addToSet: "$title"
        },
        stoneTypeIds: {
          $addToSet: "$stonetypes._id"
        },
        stoneColorIds: {
          $addToSet: "$stonecolors._id"
        },
        inventories: {
          $push: "$inventories"
        },
        isLikedByUser: {
          $first: {
            $gt: [
              {
                $size: "$userWishlist"
              },
              0
            ]
          }
        }
      }
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
                            $gt: [
                              "$$inv.quantity",
                              0
                            ]
                          }
                        }
                      }
                    },
                    0
                  ]
                }
              ]
            }
          }
        }
      }
    },
    {
      $project: {
        price: 1,
        firstImageUrl: 1,
        jewelryIds: 1,
        categoryTitle: 1,
        categoryId: 1,
        jewelryTitle: 1,
        stoneTypeIds: 1,
        stoneColorIds: 1,
        isSoldOut: 1,
        isLikedByUser: 1
      }
    },
    {
      $sort: {
        isSoldOut: 1,
        _id: 1
      }
    }
  ]

  const countQuery = [
    { $match: { category: data.categoryId } },
    { $count: "totalCount" },
  ];

  const result = await Jewelry.aggregate([
    {
      $facet: {
        data: query,
        count: countQuery,
      },
    },
  ]);

  return {
    data: result[0].data,
    totalCount: result[0].count[0] ? result[0].count[0].totalCount : 0,
  };
};

exports.findOne = async (jewelryId) => {
  const jewelry = await Jewelry.aggregate([
    {
      $lookup: {
        as: "categories",
        from: "categories",
        foreignField: "_id",
        localField: "category",
      },
    },
    {
      $lookup: {
        as: "jewelrymetals",
        from: "jewelrymetals",
        foreignField: "jewelry",
        localField: "_id",
      },
    },
    {
      $lookup: {
        as: "metals",
        from: "metals",
        foreignField: "_id",
        localField: "jewelrymetals.metal",
      },
    },
    {
      $addFields: {
        metalInfo: {
          $map: {
            input: "$jewelrymetals",
            as: "jm",
            in: {
              metal: {
                $arrayElemAt: [
                  "$metals",
                  {
                    $indexOfArray: ["$metals._id", "$$jm.metal"],
                  },
                ],
              },
              caratWeight: "$$jm.caratWeight",
            },
          },
        },
      },
    },
    {
      $lookup: {
        as: "jewelrystones",
        from: "jewelrystones",
        foreignField: "jewelry",
        localField: "_id",
      },
    },
    {
      $lookup: {
        as: "stonetypes",
        from: "stonetypes",
        foreignField: "_id",
        localField: "jewelrystones.stoneType",
      },
    },
    {
      $lookup: {
        as: "stonecolors",
        from: "stonecolors",
        foreignField: "_id",
        localField: "jewelrystones.stoneColor",
      },
    },
    {
      $addFields: {
        stoneInfo: {
          $map: {
            input: "$jewelrystones",
            as: "js",
            in: {
              stoneType: {
                $arrayElemAt: [
                  "$stonetypes.title",
                  {
                    $indexOfArray: ["$stonetypes._id", "$$js.stoneType"],
                  },
                ],
              },
              stoneColor: {
                $arrayElemAt: [
                  "$stonecolors.title",
                  {
                    $indexOfArray: ["$stonecolors._id", "$$js.stoneColor"],
                  },
                ],
              },
              caratWeight: "$$js.caratWeight",
            },
          },
        },
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
      $lookup: {
        as: "sizes",
        from: "sizes",
        foreignField: "_id",
        localField: "inventories.size",
      },
    },
    {
      $addFields: {
        price: {
          $arrayElemAt: ["$inventories.price", 0],
        },
      },
    },

    {
      $addFields: {
        categoryTitle: "$categories.title",
      },
    },
    {
      $addFields: {
        metalTitle: "$metalInfo.metal.title",
      },
    },
    {
      $addFields: {
        metalCaratWeight: "$metalInfo.caratWeight",
      },
    },
    {
      $addFields: {
        stoneType: "$stoneInfo.stoneType",
      },
    },
    {
      $addFields: {
        stoneColor: "$stoneInfo.stoneColor",
      },
    },
    {
      $addFields: {
        stoneCaratWeight: "$stoneInfo.caratWeight",
      },
    },
    {
      $addFields: {
        sizes: {
          $map: {
            input: "$sizes",
            as: "size",
            in: {
              _id: "$$size._id",
              measurement: "$$size.measurement",
              title: "$$size.title",
              available: {
                $gt: [
                  {
                    $size: {
                      $filter: {
                        input: "$inventories",
                        as: "inventory",
                        cond: {
                          $and: [
                            {
                              $eq: ["$$inventory.size", "$$size._id"],
                            },
                            {
                              $gt: ["$$inventory.quantity", 0],
                            },
                          ],
                        },
                      },
                    },
                  },
                  0,
                ],
              },
            },
          },
        },
      },
    },
    {
      $project: {
        title: 1,
        price: 1,
        firstImageUrl: 1,
        secondImageUrl: 1,
        categoryTitle: 1,
        "metalInfo.metal.title": 1,
        "metalInfo.caratWeight": 1,
        "stoneInfo.stoneType": 1,
        "stoneInfo.stoneColor": 1,
        "stoneInfo.caratWeight": 1,
        sizes: 1,
      },
    },
    {
      $match: {
        _id: jewelryId,
      },
    },
  ]);
  return jewelry;
};
