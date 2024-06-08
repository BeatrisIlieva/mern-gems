const mongoose = require("mongoose");
const Jewelry = require("./models/Jewelry");
const Category = require("./models/Category");
const jewelryCollection = require("./models/jewelryCollection");
const StoneType = require("./models/StoneType");
const StoneColor = require("./models/StoneColor");
const JewelryStones = require("./models/JewelryStones");
const Size = require("./models/Size");
const Inventory = require("./models/Inventory");

async function populateDb() {
  await mongoose.connect("mongodb://127.0.0.1:27017/react-gems");

  await Category.create({
    title: "Bracelet",
  });

  await Category.create({
    title: "Earring",
  });

  await Category.create({
    title: "Necklace",
  });

  await Category.create({
    title: "Ring",
  });

  await jewelryCollection.create({
    title: "Diamond Loop",
  });

  await jewelryCollection.create({
    title: "Sunflower",
  });

  await jewelryCollection.create({
    title: "Sparkling Cluster",
  });

  await jewelryCollection.create({
    title: "Forget-Me-Not",
  });

  await jewelryCollection.create({
    title: "Pirouette",
  });

  await StoneType.create({
    title: "Spinel",
  });

  await StoneType.create({
    title: "Diamond",
  });

  await StoneType.create({
    title: "Emerald",
  });

  await StoneType.create({
    title: "Ruby",
  });

  await StoneType.create({
    title: "Sapphire",
  });

  await StoneColor.create({
    title: "Aquamarine",
  });

  await StoneColor.create({
    title: "Black",
  });

  await StoneColor.create({
    title: "Blue",
  });

  await StoneColor.create({
    title: "Green",
  });

  await StoneColor.create({
    title: "Pink",
  });

  await StoneColor.create({
    title: "Red",
  });

  await StoneColor.create({
    title: "White",
  });

  await StoneColor.create({
    title: "Yellow",
  });

  await Size.create({
    measurement: "15.2 cm",
  });

  await Size.create({
    measurement: "17.8 cm",
  });

  await Size.create({
    measurement: "19.3 cm",
  });

  await Size.create({
    measurement: "2.05 cm",
  });

  await Size.create({
    measurement: "3.95 cm",
  });

  await Size.create({
    measurement: "5.86 cm",
  });

  await Size.create({
    measurement: "40.64 cm",
  });

  await Size.create({
    measurement: "43.18 cm",
  });

  await Size.create({
    measurement: "45.72 cm",
  });

  await Size.create({
    measurement: "4.7 cm",
  });

  await Size.create({
    measurement: "4.9 cm",
  });

  await Size.create({
    measurement: "5.05 cm",
  });

  const allCategories = await Category.find();
  const allJewelryCollections = await jewelryCollection.find();
  const allStoneTypes = await StoneType.find();
  const allStoneColors = await StoneColor.find();
  const allSizes = await Size.find();

  await Jewelry.create({
    title: "Diamond Loop Full Motif Diamond",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757558/ReactGems/jewelries/diamond-loop/rings/diamond_loop_ring_diamond_frdprp1ml4c_e-1_ptdbin.avif",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757556/ReactGems/jewelries/diamond-loop/rings/diamond_loop_ring_diamond_frdprp1ml4c_e-2_e6ch2a.avif",
    category: allCategories[3],
    jewelryCollection: allJewelryCollections[3],
    description:
      "4 pear-shaped and 29 round brilliant diamonds weighing a total of approximately 1.08 carats, set in platinum.",
  });







  const allJewelries = await Jewelry.find();

  await JewelryStones.insertMany([
    {
      jewelry: allJewelries[0],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[6],
    },
 
  ]);

  await Inventory.insertMany([
    {
      jewelry: allJewelries[0],
      size: allSizes[9],
      quantity: 1,
      price: 12000,
    },
    {
      jewelry: allJewelries[0],
      size: allSizes[10],
      quantity: 1,
      price: 12000,
    },
    {
      jewelry: allJewelries[0],
      size: allSizes[11],
      quantity: 1,
      price: 12000,
    },
    {
      jewelry: allJewelries[1],
      size: allSizes[9],
      quantity: 1,
      price: 12000,
    },
    {
      jewelry: allJewelries[1],
      size: allSizes[10],
      quantity: 1,
      price: 12000,
    },
    {
      jewelry: allJewelries[1],
      size: allSizes[11],
      quantity: 1,
      price: 12000,
    },
    {
      jewelry: allJewelries[2],
      size: allSizes[9],
      quantity: 1,
      price: 12000,
    },


  ]);
}
populateDb();
