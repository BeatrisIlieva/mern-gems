const ShoppingBag = require("../models/Bag");
const Inventory = require("../models/Inventory");
const { DEFAULT_MIN_QUANTITY } = require("../constants/shoppingBag");

exports.getOne = async ({ userId, jewelryId, sizeId }) => {
  const bagItem = await ShoppingBag.findOne({
    user: userId,
    jewelry: jewelryId,
    size: sizeId,
  });

  return bagItem;
};

exports.findAll = async (userId) => {
  const result = await ShoppingBag.aggregate([
    {
      $match: {
        user: userId,
      },
    },
    {
      $lookup: {
        as: "jewelries",
        from: "jewelries",
        foreignField: "_id",
        localField: "jewelry",
      },
    },
    {
      $unwind: "$jewelries",
    },
    {
      $lookup: {
        as: "inventories",
        from: "inventories",
        foreignField: "jewelry",
        localField: "jewelry",
      },
    },
    {
      $lookup: {
        as: "sizes",
        from: "sizes",
        foreignField: "_id",
        localField: "size",
      },
    },
    {
      $unwind: "$inventories",
    },
    {
      $unwind: "$sizes",
    },
    {
      $addFields: {
        totalPrice: {
          $multiply: ["$inventories.price", "$quantity"],
        },
        minQuantity: 0,
        maxQuantity: {
          $sum: ["$inventories.quantity", "$quantity"],
        },
      },
    },
    {
      $addFields: {
        jewelryId: "$jewelries._id",
      },
    },
    {
      $addFields: {
        sizeId: "$sizes._id",
      },
    },
    {
      $group: {
        _id: "$_id",
        jewelryId: {
          $first: "$jewelryId",
        },
        user: {
          $first: "$user",
        },
        jewelryTitle: {
          $first: "$jewelries.title",
        },
        firstImageUrl: {
          $first: "$jewelries.firstImageUrl",
        },
        size: {
          $first: "$sizes.measurement",
        },
        sizeId: {
          $first: "$sizeId",
        },
        quantity: {
          $first: "$quantity",
        },
        maxQuantity: {
          $first: "$maxQuantity",
        },
        minQuantity: {
          $first: "$minQuantity",
        },
        totalPrice: {
          $first: "$totalPrice",
        },
        createdAt: {
          $first: "$createdAt",
        },
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $project: {
        user: 1,
        jewelryId: 1,
        jewelryTitle: 1,
        firstImageUrl: 1,
        size: 1,
        sizeId: 1,
        sizeTitle: 1,
        quantity: 1,
        maxQuantity: 1,
        minQuantity: 1,
        totalPrice: 1,
      },
    },
    {
      $group: {
        _id: null,
        documents: {
          $push: "$$ROOT",
        },
        totalTotalPrice: {
          $sum: "$totalPrice",
        },
        totalQuantity: {
          $sum: "$quantity",
        },
      },
    },
    {
      $project: {
        documents: 1,
        totalTotalPrice: 1,
        totalQuantity: 1,
      },
    },
  ]);
  return result;
};

exports.create = async ({
  userId,
  jewelryId,
  sizeId,
  quantity: DEFAULT_ADD_QUANTITY,
}) => {
  bagItem = await ShoppingBag.create({
    user: userId,
    jewelry: jewelryId,
    size: sizeId,
    quantity: DEFAULT_ADD_QUANTITY,
  });

  await Inventory.findOneAndUpdate(
    { jewelry: jewelryId, size: sizeId },
    { $inc: { quantity: -1 } },
    { new: true }
  );
};

exports.decrease = async (bagId) => {
  let bagItem = await ShoppingBag.findById(bagId);

  const jewelryId = Number(bagItem.jewelry);

  const sizeId = Number(bagItem.size);

  const bagQuantity = bagItem.quantity;

  const newBagQuantity = bagQuantity - 1;

  await ShoppingBag.findByIdAndUpdate(bagId, { quantity: newBagQuantity });

  bagItem = await ShoppingBag.findById(bagId);

  if (bagItem.quantity === 0) {
    await ShoppingBag.findByIdAndDelete(bagId);
  }

  const inventoryItem = await Inventory.findOne({
    jewelry: jewelryId,
    size: sizeId,
  });

  const inventoryQuantity = inventoryItem.quantity || 0;
  const newInventoryQuantity = inventoryQuantity + 1;
  await Inventory.findOneAndUpdate(
    { jewelry: jewelryId, size: sizeId },
    { quantity: newInventoryQuantity },
    { new: true }
  );
};

exports.increase = async (bagId) => {
  let bagItem = await ShoppingBag.findById(bagId);

  const jewelryId = Number(bagItem.jewelry);

  const sizeId = Number(bagItem.size);

  const bagQuantity = bagItem.quantity;

  const newBagQuantity = bagQuantity + 1;

  await ShoppingBag.findByIdAndUpdate(bagId, { quantity: newBagQuantity });

  bagItem = await ShoppingBag.findById(bagId);

  const inventoryItem = await Inventory.findOne({
    jewelry: jewelryId,
    size: sizeId,
  });

  const inventoryQuantity = inventoryItem.quantity || 0;
  const newInventoryQuantity = inventoryQuantity - 1;
  await Inventory.findOneAndUpdate(
    { jewelry: jewelryId, size: sizeId },
    { quantity: newInventoryQuantity },
    { new: true }
  );
};

exports.update = async (bagItemId, updatedQuantity) => {
  const bagItem = await ShoppingBag.findById(bagItemId);

  const sizeId = Number(bagItem.size);

  const alreadyAddedQuantity = bagItem.quantity;

  const jewelryId = Number(bagItem.jewelry);

  const inventoryItem = await Inventory.findOne({
    jewelry: jewelryId,
    size: sizeId,
  });

  const quantity = inventoryItem.quantity || 0;

  const availableQuantity = quantity + alreadyAddedQuantity;

  if (updatedQuantity < DEFAULT_MIN_QUANTITY) {
    throw new Error("Quantity must be greater than zero");
  } else if (updatedQuantity > availableQuantity) {
    throw new Error(
      `Please choose quantity between ${DEFAULT_MIN_QUANTITY} and ${availableQuantity}`
    );
  } else {
    await bagItem.updateOne({ quantity: updatedQuantity });

    let newQuantity;

    if (alreadyAddedQuantity < updatedQuantity) {
      difference = updatedQuantity - alreadyAddedQuantity;
      newQuantity = quantity - difference;
    } else {
      difference = alreadyAddedQuantity - updatedQuantity;
      newQuantity = quantity + difference;
    }

    await Inventory.findOneAndUpdate(
      { jewelry: jewelryId, size: sizeId },
      { quantity: newQuantity },
      { new: true }
    );

    if (Number(updatedQuantity) === 0) {
      await bagItem.deleteOne();
    }
  }
};

exports.delete = async (bagItemId) => {
  const bagItem = await ShoppingBag.findById(bagItemId);

  const sizeId = Number(bagItem.size);

  const alreadyAddedQuantity = bagItem.quantity;

  const jewelryId = Number(bagItem.jewelry);

  const inventoryItem = await Inventory.findOne({
    jewelry: jewelryId,
    size: sizeId,
  });

  const quantity = inventoryItem.quantity || 0;

  const availableQuantity = quantity + alreadyAddedQuantity;

  await Inventory.findOneAndUpdate(
    { jewelry: jewelryId, size: sizeId },
    { quantity: availableQuantity },
    { new: true }
  );

  await bagItem.deleteOne();
};
