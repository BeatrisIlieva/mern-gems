const mongoose = require("mongoose");
const Jewelry = require("./models/Jewelry");
const Category = require("./models/Category");
const JewelryCollection = require("./models/JewelryCollection");
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

  await JewelryCollection.create({
    title: "Diamond Loop",
  });

  await JewelryCollection.create({
    title: "Sunflower",
  });

  await JewelryCollection.create({
    title: "Sparkling Cluster",
  });

  await JewelryCollection.create({
    title: "Forget-Me-Not",
  });

  await JewelryCollection.create({
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
  const allJewelryCollections = await JewelryCollection.find();
  const allStoneTypes = await StoneType.find();
  const allStoneColors = await StoneColor.find();
  const allSizes = await Size.find();

  await Jewelry.create({
    title: "Diamond Loop Full Motif Diamond Bracelet",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757333/ReactGems/jewelries/diamond-loop/bracelets/diamond_loop_full_motif_diamond_bracelet_brdprp1ml4c_e-1_orqwyi.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757333/ReactGems/jewelries/diamond-loop/bracelets/diamond_loop_full_motif_diamond_bracelet_brdprp1ml4c_e-2_kpwgfn.avif",
    category: allCategories[0],
    jewelryCollection: allJewelryCollections[0],
    description:
      "Four pear-shaped and 81 round brilliant diamonds weighing a total of approximately 4.41 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Diamond Loop Full Motif Diamond Earrings",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757325/ReactGems/jewelries/diamond-loop/earrings/diamond_loop_earrings_full_motif_multi_color_stone_diamond_eamprpmel4c_e-1_xuxgnh.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757325/ReactGems/jewelries/diamond-loop/earrings/diamond_loop_earrings_full_motif_multi_color_stone_diamond_eamprpmel4c_e-2_u64icm.webp",
    category: allCategories[1],
    jewelryCollection: allJewelryCollections[0],
    description:
      "8 colored pear-shaped stones, aquamarines, yellow sapphires, black spinels and pink sapphires weighing a total of approximately 1.50 carats and 58 round brilliant diamonds weighing a total of approximately 2.66 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Diamond Loop Full Motif Diamond Pendant",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757331/ReactGems/jewelries/diamond-loop/necklaces/diamond_loop_pendant_full_motif_multi_color_stone_diamond_pemprpmel4c_e-2_zswuek.avif",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757329/ReactGems/jewelries/diamond-loop/necklaces/diamond_loop_pendant_full_motif_multi_color_stone_diamond_pemprpmel4c_e-3_smwpmf.webp",
    category: allCategories[2],
    jewelryCollection: allJewelryCollections[0],
    description:
      "4 colored pear-shaped stones, aquamarine, yellow sapphire, black spinel and pink sapphire weighing a total of approximately 0.75 carats and 29 round brilliant diamonds weighing a total of approximately 1.33 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Diamond Loop Full Motif Diamond Ring",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757558/ReactGems/jewelries/diamond-loop/rings/diamond_loop_ring_diamond_frdprp1ml4c_e-1_ptdbin.avif",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757556/ReactGems/jewelries/diamond-loop/rings/diamond_loop_ring_diamond_frdprp1ml4c_e-2_e6ch2a.avif",
    category: allCategories[3],
    jewelryCollection: allJewelryCollections[0],
    description:
      "4 pear-shaped and 29 round brilliant diamonds weighing a total of approximately 1.08 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Forget-Me-Not Sapphire and Diamond Bracelet",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757305/ReactGems/jewelries/forget-me-not/bracelets/forget_me_not_bracelet_diamond_and_pink_sapphire_brpsprfflrfmn_e_1_zh8jhb.avif",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757303/ReactGems/jewelries/forget-me-not/bracelets/forget_me_not_bracelet_diamond_and_pink_sapphire_brpsprfflrfmn_e_2_uqp5w1.avif",
    category: allCategories[0],
    jewelryCollection: allJewelryCollections[3],
    description:
      "45 pear-shaped and round brilliant pink sapphires weighing a total of approximately 4.36 carats and 33 pear-shaped, marquise and round brilliant diamonds weighing a total of approximately 4.24 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Forget-Me-Not Sapphire and Diamond Bracelet",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757304/ReactGems/jewelries/forget-me-not/bracelets/forget_me_not_bracelet_diamond_and_sapphire_brsprfflrfmn_e_1_vjmrko.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757305/ReactGems/jewelries/forget-me-not/bracelets/forget_me_not_bracelet_diamond_and_sapphire_brsprfflrfmn_e_2_itwcfq.avif",
    category: allCategories[0],
    jewelryCollection: allJewelryCollections[3],
    description:
      "45 pear-shaped and round brilliant sapphires weighing a total of approximately 4.17 carats and 33 pear-shaped, marquise and round brilliant diamonds weighing a total of approximately 4.24 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Forget-Me-Not Ruby and Diamond Bracelet",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757303/ReactGems/jewelries/forget-me-not/bracelets/forget-me-not_bracelet_ruby_and_diamond_brrprfflrfmn_e-1_ekaisx.avif",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757304/ReactGems/jewelries/forget-me-not/bracelets/forget-me-not_bracelet_ruby_and_diamond_brrprfflrfmn_e-2_nkhesf.avif",
    category: allCategories[0],
    jewelryCollection: allJewelryCollections[3],
    description:
      "45 pear-shaped and round rubies weighing a total of approximately 4.43 carats and 33 pear-shaped, marquise and round brilliant diamonds weighing a total of approximately 4.37 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Forget-Me-Not Sapphire and Diamond Drop Earrings",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757292/ReactGems/jewelries/forget-me-not/earrings/forget_me_not_drop_earrings_diamond_and_pink_sapphire_eapspdrflrfmn_ee-1_rhqwoa.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757295/ReactGems/jewelries/forget-me-not/earrings/forget_me_not_drop_earrings_diamond_and_pink_sapphire_eapspdrflrfmn_ee-2_bfxsxb.webp",
    category: allCategories[1],
    jewelryCollection: allJewelryCollections[3],
    description:
      "28 pear-shaped and round brilliant pink sapphires weighing a total of approximately 3.20 carats and 28 marquise and round brilliant diamonds weighing a total of approximately 1.98 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Forget-Me-Not Sapphire and Diamond Drop Earrings",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757293/ReactGems/jewelries/forget-me-not/earrings/forget_me_not_drop_earrings_diamond_and_sapphire_easpdrflrfmn_ee-1_tqztrs.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757294/ReactGems/jewelries/forget-me-not/earrings/forget_me_not_drop_earrings_diamond_and_sapphire_easpdrflrfmn_ee-2_u5lom5.webp",
    category: allCategories[1],
    jewelryCollection: allJewelryCollections[3],
    description:
      "28 pear-shaped and round brilliant sapphires weighing a total of approximately 3.00 carats and 28 marquise and round brilliant diamonds weighing a total of approximately 1.98 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Forget-Me-Not Diamond Drop Earrings",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757294/ReactGems/jewelries/forget-me-not/earrings/forget_me_not_diamond_drop_earrings_eadpdrflrfmn_ee-1_cfsvt2.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757293/ReactGems/jewelries/forget-me-not/earrings/forget_me_not_diamond_drop_earrings_eadpdrflrfmn_ee-2_wxd5vx.webp",
    category: allCategories[1],
    jewelryCollection: allJewelryCollections[3],
    description:
      "A medley of marquise, pear-shaped, and round brilliant diamonds, weighing a total of approximately 4.38 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Forget-Me-Not Sapphire and Diamond Necklace",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757296/ReactGems/jewelries/forget-me-not/necklaces/forget_me_not_lariat_necklace_diamond_and_pink_sapphire_nkpspltflrfmn_e_1_e1ixyz.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757298/ReactGems/jewelries/forget-me-not/necklaces/forget_me_not_lariat_necklace_diamond_and_pink_sapphire_nkpspltflrfmn_e_2_cxxk9w.webp",
    category: allCategories[2],
    jewelryCollection: allJewelryCollections[3],
    description:
      "78 pear-shaped and round brilliant pink sapphires weighing a total of approximately 8.61 carats and 99 marquise and round brilliant diamonds weighing a total of approximately 8.60 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Forget-Me-Not Sapphire and Diamond Necklace",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757300/ReactGems/jewelries/forget-me-not/necklaces/forget_me_not_lariat_necklace_diamond_and_sapphire_nkspltflrfmn_e_1_hy1jpe.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757300/ReactGems/jewelries/forget-me-not/necklaces/forget_me_not_lariat_necklace_diamond_and_sapphire_nkspltflrfmn_e_1_hy1jpe.webp",
    category: allCategories[2],
    jewelryCollection: allJewelryCollections[3],
    description:
      "78 pear-shaped and round brilliant sapphires weighing a total of approximately 8.61 carats and 99 marquise and round brilliant diamonds weighing a total of approximately 8.37 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Forget-Me-Not Sapphire and Ruby Necklace",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757299/ReactGems/jewelries/forget-me-not/necklaces/forget-me-not_lariat_necklace_ruby_and_diamond_nkrpltflrfmn_e-1_ccsqk6.avif",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757295/ReactGems/jewelries/forget-me-not/necklaces/forget-me-not_lariat_necklace_ruby_and_diamond_nkrpltflrfmn_e-2_mvtavy.avif",
    category: allCategories[2],
    jewelryCollection: allJewelryCollections[3],
    description:
      "78 pear-shaped and round rubies weighing a total of approximately 9.13 carats and 99 marquise and round brilliant diamonds weighing a total of approximately 8.51 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Forget-Me-Not Sapphire and Diamond Ring",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757301/ReactGems/jewelries/forget-me-not/rings/forget_me_not_ring_diamond_and_pink_sapphire_frpsprfflrfmn_e_1_h43mqe.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757302/ReactGems/jewelries/forget-me-not/rings/forget_me_not_ring_diamond_and_pink_sapphire_frpsprfflrfmn_e_2_zc3jcr.avif",
    category: allCategories[3],
    jewelryCollection: allJewelryCollections[3],
    description:
      "6 pear-shaped pink sapphires weighing a total of approximately 2.22 carats and 1 round brilliant diamond weighing approximately 0.05 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Forget-Me-Not Sapphire and Diamond Ring",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757302/ReactGems/jewelries/forget-me-not/rings/forget_me_not_ring_diamond_and_sapphire_frsprfflrfmn_e_1_kltu85.avif",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757300/ReactGems/jewelries/forget-me-not/rings/forget_me_not_ring_diamond_and_sapphire_frsprfflrfmn_e_2_tx7ff2.avif",
    category: allCategories[3],
    jewelryCollection: allJewelryCollections[3],
    description:
      "6 pear-shaped sapphires weighing a total of approximately 2.15 carats and 1 round brilliant diamond weighing approximately 0.05 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Forget-Me-Not Diamond Ring",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757301/ReactGems/jewelries/forget-me-not/rings/forget_me_not_diamond_ring_frdprfflrfmn_e-1h_sapewt.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757300/ReactGems/jewelries/forget-me-not/rings/forget_me_not_diamond_ring_frdprfflrfmn_e-2h_fr3ngx.webp",
    category: allCategories[3],
    jewelryCollection: allJewelryCollections[3],
    description:
      "6 pear-shaped and 1 round brilliant diamond, weighing a total of approximately 1.66 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Pirouette Diamond Bracelet",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757292/ReactGems/jewelries/pirouette/bracelets/bezel-set_diamond_bracelet_brdprfsfbz_e-1_hmwkwz.avif",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757290/ReactGems/jewelries/pirouette/bracelets/bezel-set_diamond_bracelet_brdprfsfbz_e-2_brmgsx.avif",
    category: allCategories[0],
    jewelryCollection: allJewelryCollections[4],
    description:
      "22 marquise, oval, pear-shaped, and round brilliant diamonds weighing a total of approximately 8.27 carats, bezel-set in platinum",
  });

  await Jewelry.create({
    title: "Pirouette Diamond Earrings",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757288/ReactGems/jewelries/pirouette/earrings/pirouette_earrings__diamond__eadprfprspir_e-1_pvpxfg.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757288/ReactGems/jewelries/pirouette/earrings/pirouette_earrings__diamond__eadprfprspir_e-2_suic3s.webp",
    category: allCategories[1],
    jewelryCollection: allJewelryCollections[4],
    description:
      "2 round brilliant and 16 marquise diamonds weighing a total of approximately 4.52 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Pirouette Diamond Pendant",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757289/ReactGems/jewelries/pirouette/necklaces/pirouette_pendant__diamond__pedprfprspir_e-1h_rxck0t.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757289/ReactGems/jewelries/pirouette/necklaces/pirouette_pendant__diamond__pedprfprspir_e-2h_ffauyh.webp",
    category: allCategories[2],
    jewelryCollection: allJewelryCollections[4],
    description:
      "1 round brilliant and 8 marquise diamonds weighing a total of approximately 3.49 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Pirouette Diamond Ring",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757291/ReactGems/jewelries/pirouette/rings/pirouette_ring_diamond_frdprfprspir_e-1_gdagk4.avif",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757290/ReactGems/jewelries/pirouette/rings/pirouette_ring_diamond_frdprfprspir_e-2_a7koae.webp",
    category: allCategories[3],
    jewelryCollection: allJewelryCollections[4],
    description:
      "1 round brilliant and 8 marquise diamonds weighing a total of approximately 2.80 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Sparkling Cluster Diamond Bracelet",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757312/ReactGems/jewelries/sparkling-cluster/bracelets/round_brilliant_diamond_tennis_bracelet_brdpsrp40te_e-1_ifob2j.avif",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757313/ReactGems/jewelries/sparkling-cluster/bracelets/round_brilliant_diamond_tennis_bracelet_brdpsrp40te_e-2_q4jxzk.avif",
    category: allCategories[0],
    jewelryCollection: allJewelryCollections[2],
    description:
      "55 round brilliant and 4 pear-shaped diamonds weighing a total of approximately 10.17 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Sparkling Cluster Sapphire and Diamond Earrings",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757306/ReactGems/jewelries/sparkling-cluster/earrings/sparkling_cluster_sap_aqua_and_diamond_earrings_easaqpclrfspc_e-1_d6viea.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757307/ReactGems/jewelries/sparkling-cluster/earrings/sparkling_cluster_sap_aqua_and_diamond_earrings_easaqpclrfspc_e-2_xcn9vw.webp",
    category: allCategories[1],
    jewelryCollection: allJewelryCollections[2],
    description:
      "2 round and 2 pear-shaped sapphires weighing a total of approximately 1.90 carats, 4 round aquamarines weighing a total of approximately 1.00 carat, and 12 round brilliant and pear-shaped diamonds weighing a total of approximately 1.79 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Sparkling Cluster Emerald and Diamond Earrings",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717759049/ReactGems/jewelries/sparkling-cluster/earrings/berry_cluster_earrings_emerald_and_diamond_eaepclrfber_568120_e-1_nj0ys6.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717759052/ReactGems/jewelries/sparkling-cluster/earrings/berry_cluster_earrings_emerald_and_diamond_eaepclrfber_568120_e-2_vnundp.webp",
    category: allCategories[1],
    jewelryCollection: allJewelryCollections[2],
    description:
      "10 pear-shaped diamonds weighing a total of approximately 3.35 carats with 6 round emeralds weighing a total of approximately 2.01 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Sparkling Cluster Diamond Earrings",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757306/ReactGems/jewelries/sparkling-cluster/earrings/sparkling_cluster_earrings_diamond_eadppsdrspc_e-1_ccnl2i.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757307/ReactGems/jewelries/sparkling-cluster/earrings/sparkling_cluster_earrings_diamond_eadppsdrspc_e-2_keemcf.webp",
    category: allCategories[1],
    jewelryCollection: allJewelryCollections[2],
    description:
      "16 round brilliant and 4 pear-shaped diamonds weighing a total of 4.27 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Sparkling Cluster Emerald and Diamond Pendant",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717759023/ReactGems/jewelries/sparkling-cluster/necklaces/berry_cluster_pendant_emerald_and_diamond_peepclrfber_e-1_sqg1sx.avif",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717759026/ReactGems/jewelries/sparkling-cluster/necklaces/berry_cluster_pendant_emerald_and_diamond_peepclrfber_e-2_acdoqe.avif",
    category: allCategories[2],
    jewelryCollection: allJewelryCollections[2],
    description:
      "5 pear-shaped diamonds weighing a total of approximately 2.01 carats with 3 round emeralds weighing a total of approximately 1.39 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Sparkling Cluster Sapphire and Diamond Necklace",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757308/ReactGems/jewelries/sparkling-cluster/necklaces/sparkling_cluster_sap_aqua_and_diamond_necklace_nksaqpclrfspc_e-1_sfpfaw.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757309/ReactGems/jewelries/sparkling-cluster/necklaces/sparkling_cluster_sap_aqua_and_diamond_necklace_nksaqpclrfspc_e-2_vea6um.webp",
    category: allCategories[2],
    jewelryCollection: allJewelryCollections[2],
    description:
      "25 round and pear-shaped sapphires weighing a total of approximately 4.45 carats, 23 round aquamarines weighing a total of approximately 2.80 carats, and 130 round brilliant and pear-shaped diamonds weighing a total of approximately 8.73 carats, set in platinum",
  });

  await Jewelry.create({
    title: "Sparkling Cluster Diamond Necklace",
    firstImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757308/ReactGems/jewelries/sparkling-cluster/necklaces/sparkling_cluster_necklace_diamond_nkdpclrfspc_e-1_ieghak.webp",
    secondImageUrl:
      "https://res.cloudinary.com/deztgvefu/image/upload/v1717757309/ReactGems/jewelries/sparkling-cluster/necklaces/sparkling_cluster_necklace_diamond_nkdpclrfspc_e-2_joo3t3.webp",
    category: allCategories[2],
    jewelryCollection: allJewelryCollections[2],
    description:
      "148 round brilliant and 3 pear-shaped diamonds weighing a total of approximately 15.18 carats, set in platinum",
  });

  const allJewelries = await Jewelry.find();

  await JewelryStones.insertMany([
    {
      jewelry: allJewelries[0],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[6],
    },
    {
      jewelry: allJewelries[1],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[6],
    },
    {
      jewelry: allJewelries[1],
      stoneType: allStoneTypes[0],
      stoneColor: allStoneColors[1],
    },
    {
      jewelry: allJewelries[1],
      stoneType: allStoneTypes[4],
      stoneColor: allStoneColors[7],
    },
    {
      jewelry: allJewelries[1],
      stoneType: allStoneTypes[4],
      stoneColor: allStoneColors[4],
    },
    {
      jewelry: allJewelries[1],
      stoneType: allStoneTypes[4],
      stoneColor: allStoneColors[0],
    },
    {
      jewelry: allJewelries[2],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[6],
    },
    {
      jewelry: allJewelries[2],
      stoneType: allStoneTypes[0],
      stoneColor: allStoneColors[1],
    },
    {
      jewelry: allJewelries[2],
      stoneType: allStoneTypes[4],
      stoneColor: allStoneColors[7],
    },
    {
      jewelry: allJewelries[2],
      stoneType: allStoneTypes[4],
      stoneColor: allStoneColors[4],
    },
    {
      jewelry: allJewelries[2],
      stoneType: allStoneTypes[4],
      stoneColor: allStoneColors[0],
    },
    {
      jewelry: allJewelries[3],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[6],
    },
    {
      jewelry: allJewelries[4],
      stoneType: allStoneTypes[4],
      stoneColor: allStoneColors[4],
    },
    {
      jewelry: allJewelries[4],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[6],
    },
    {
      jewelry: allJewelries[5],
      stoneType: allStoneTypes[4],
      stoneColor: allStoneColors[2],
    },
    {
      jewelry: allJewelries[5],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[6],
    },
    {
      jewelry: allJewelries[6],
      stoneType: allStoneTypes[3],
      stoneColor: allStoneColors[5],
    },
    {
      jewelry: allJewelries[6],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[6],
    },
    {
      jewelry: allJewelries[7],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[6],
    },
    {
      jewelry: allJewelries[7],
      stoneType: allStoneTypes[4],
      stoneColor: allStoneColors[4],
    },
    {
      jewelry: allJewelries[8],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[6],
    },
    {
      jewelry: allJewelries[8],
      stoneType: allStoneTypes[4],
      stoneColor: allStoneColors[2],
    },
    {
      jewelry: allJewelries[9],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[6],
    },
    {
      jewelry: allJewelries[10],
      stoneType: allStoneTypes[4],
      stoneColor: allStoneColors[4],
    },
    {
      jewelry: allJewelries[10],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[6],
    },
    {
      jewelry: allJewelries[11],
      stoneType: allStoneTypes[4],
      stoneColor: allStoneColors[2],
    },
    {
      jewelry: allJewelries[11],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[6],
    },
    {
      jewelry: allJewelries[12],
      stoneType: allStoneTypes[3],
      stoneColor: allStoneColors[5],
    },
    {
      jewelry: allJewelries[12],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[6],
    },
    {
      jewelry: allJewelries[13],
      stoneType: allStoneTypes[4],
      stoneColor: allStoneColors[4],
    },
    {
      jewelry: allJewelries[13],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[6],
    },
    {
      jewelry: allJewelries[14],
      stoneType: allStoneTypes[4],
      stoneColor: allStoneColors[2],
    },
    {
      jewelry: allJewelries[14],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[6],
    },
    {
      jewelry: allJewelries[15],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[6],
    },
    {
      jewelry: allJewelries[16],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[6],
    },
    {
      jewelry: allJewelries[17],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[6],
    },
    {
      jewelry: allJewelries[18],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[6],
    },
    {
      jewelry: allJewelries[19],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[6],
    },
    {
      jewelry: allJewelries[20],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[6],
    },
    {
      jewelry: allJewelries[21],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[6],
    },
    {
      jewelry: allJewelries[21],
      stoneType: allStoneTypes[4],
      stoneColor: allStoneColors[2],
    },
    {
      jewelry: allJewelries[21],
      stoneType: allStoneTypes[4],
      stoneColor: allStoneColors[4],
    },
    {
      jewelry: allJewelries[21],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[6],
    },
    {
      jewelry: allJewelries[22],
      stoneType: allStoneTypes[2],
      stoneColor: allStoneColors[3],
    },
    {
      jewelry: allJewelries[23],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[6],
    },
    {
      jewelry: allJewelries[24],
      stoneType: allStoneTypes[2],
      stoneColor: allStoneColors[3],
    },
    {
      jewelry: allJewelries[24],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[6],
    },
    {
      jewelry: allJewelries[25],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[6],
    },
    {
      jewelry: allJewelries[25],
      stoneType: allStoneTypes[4],
      stoneColor: allStoneColors[0],
    },
    {
      jewelry: allJewelries[25],
      stoneType: allStoneTypes[4],
      stoneColor: allStoneColors[2],
    },
    {
      jewelry: allJewelries[26],
      stoneType: allStoneTypes[1],
      stoneColor: allStoneColors[6],
    },
  ]);

  await Inventory.insertMany([
    {
      jewelry: allJewelries[0],
      size: allSizes[0],
      quantity: 1,
      price: 12000,
    },
    {
      jewelry: allJewelries[0],
      size: allSizes[1],
      quantity: 1,
      price: 32000,
    },
    {
      jewelry: allJewelries[0],
      size: allSizes[2],
      quantity: 1,
      price: 32000,
    },
    {
      jewelry: allJewelries[1],
      size: allSizes[4],
      quantity: 1,
      price: 23000,
    },
    {
      jewelry: allJewelries[2],
      size: allSizes[6],
      quantity: 1,
      price: 44000,
    },
    {
      jewelry: allJewelries[2],
      size: allSizes[7],
      quantity: 1,
      price: 44000,
    },
    {
      jewelry: allJewelries[2],
      size: allSizes[8],
      quantity: 1,
      price: 44000,
    },
    {
      jewelry: allJewelries[3],
      size: allSizes[9],
      quantity: 1,
      price: 17000,
    },
    {
      jewelry: allJewelries[3],
      size: allSizes[10],
      quantity: 1,
      price: 17000,
    },
    {
      jewelry: allJewelries[3],
      size: allSizes[11],
      quantity: 1,
      price: 17000,
    },
    {
      jewelry: allJewelries[4],
      size: allSizes[0],
      quantity: 1,
      price: 36000,
    },
    {
      jewelry: allJewelries[4],
      size: allSizes[1],
      quantity: 1,
      price: 36000,
    },
    {
      jewelry: allJewelries[4],
      size: allSizes[2],
      quantity: 1,
      price: 36000,
    },
    {
      jewelry: allJewelries[5],
      size: allSizes[0],
      quantity: 1,
      price: 36000,
    },
    {
      jewelry: allJewelries[5],
      size: allSizes[1],
      quantity: 1,
      price: 36000,
    },
    {
      jewelry: allJewelries[5],
      size: allSizes[2],
      quantity: 1,
      price: 36000,
    },
    {
      jewelry: allJewelries[6],
      size: allSizes[0],
      quantity: 1,
      price: 37000,
    },
    {
      jewelry: allJewelries[6],
      size: allSizes[1],
      quantity: 1,
      price: 37000,
    },
    {
      jewelry: allJewelries[6],
      size: allSizes[2],
      quantity: 1,
      price: 37000,
    },
    {
      jewelry: allJewelries[7],
      size: allSizes[5],
      quantity: 1,
      price: 29000,
    },
    {
      jewelry: allJewelries[8],
      size: allSizes[5],
      quantity: 1,
      price: 29000,
    },
    {
      jewelry: allJewelries[9],
      size: allSizes[5],
      quantity: 1,
      price: 29000,
    },
    {
      jewelry: allJewelries[10],
      size: allSizes[6],
      quantity: 1,
      price: 48000,
    },
    {
      jewelry: allJewelries[10],
      size: allSizes[7],
      quantity: 1,
      price: 48000,
    },
    {
      jewelry: allJewelries[10],
      size: allSizes[8],
      quantity: 1,
      price: 48000,
    },
    {
      jewelry: allJewelries[11],
      size: allSizes[6],
      quantity: 1,
      price: 48000,
    },
    {
      jewelry: allJewelries[11],
      size: allSizes[7],
      quantity: 1,
      price: 48000,
    },
    {
      jewelry: allJewelries[11],
      size: allSizes[8],
      quantity: 1,
      price: 48000,
    },
    {
      jewelry: allJewelries[12],
      size: allSizes[6],
      quantity: 1,
      price: 49000,
    },
    {
      jewelry: allJewelries[12],
      size: allSizes[7],
      quantity: 1,
      price: 49000,
    },
    {
      jewelry: allJewelries[12],
      size: allSizes[8],
      quantity: 1,
      price: 49000,
    },
    {
      jewelry: allJewelries[13],
      size: allSizes[9],
      quantity: 1,
      price: 19000,
    },
    {
      jewelry: allJewelries[13],
      size: allSizes[10],
      quantity: 1,
      price: 19000,
    },
    {
      jewelry: allJewelries[13],
      size: allSizes[11],
      quantity: 1,
      price: 19000,
    },
    {
      jewelry: allJewelries[14],
      size: allSizes[9],
      quantity: 1,
      price: 19000,
    },
    {
      jewelry: allJewelries[14],
      size: allSizes[10],
      quantity: 1,
      price: 19000,
    },
    {
      jewelry: allJewelries[14],
      size: allSizes[11],
      quantity: 1,
      price: 19000,
    },
    {
      jewelry: allJewelries[15],
      size: allSizes[9],
      quantity: 1,
      price: 18000,
    },
    {
      jewelry: allJewelries[15],
      size: allSizes[10],
      quantity: 1,
      price: 18000,
    },
    {
      jewelry: allJewelries[15],
      size: allSizes[11],
      quantity: 1,
      price: 18000,
    },
    {
      jewelry: allJewelries[16],
      size: allSizes[0],
      quantity: 1,
      price: 21000,
    },
    {
      jewelry: allJewelries[16],
      size: allSizes[1],
      quantity: 1,
      price: 21000,
    },
    {
      jewelry: allJewelries[16],
      size: allSizes[2],
      quantity: 1,
      price: 31000,
    },
    {
      jewelry: allJewelries[17],
      size: allSizes[4],
      quantity: 1,
      price: 24000,
    },
    {
      jewelry: allJewelries[18],
      size: allSizes[6],
      quantity: 1,
      price: 43000,
    },
    {
      jewelry: allJewelries[18],
      size: allSizes[7],
      quantity: 1,
      price: 43000,
    },
    {
      jewelry: allJewelries[18],
      size: allSizes[8],
      quantity: 1,
      price: 43000,
    },
    {
      jewelry: allJewelries[19],
      size: allSizes[9],
      quantity: 1,
      price: 14000,
    },
    {
      jewelry: allJewelries[19],
      size: allSizes[10],
      quantity: 1,
      price: 14000,
    },
    {
      jewelry: allJewelries[19],
      size: allSizes[11],
      quantity: 1,
      price: 14000,
    },
    {
      jewelry: allJewelries[20],
      size: allSizes[0],
      quantity: 1,
      price: 14000,
    },
    {
      jewelry: allJewelries[20],
      size: allSizes[1],
      quantity: 1,
      price: 37000,
    },
    {
      jewelry: allJewelries[20],
      size: allSizes[2],
      quantity: 1,
      price: 37000,
    },
    {
      jewelry: allJewelries[21],
      size: allSizes[5],
      quantity: 1,
      price: 38000,
    },
    {
      jewelry: allJewelries[22],
      size: allSizes[4],
      quantity: 1,
      price: 31000,
    },
    {
      jewelry: allJewelries[23],
      size: allSizes[4],
      quantity: 1,
      price: 31000,
    },
    {
      jewelry: allJewelries[24],
      size: allSizes[6],
      quantity: 1,
      price: 44000,
    },
    {
      jewelry: allJewelries[24],
      size: allSizes[7],
      quantity: 1,
      price: 44000,
    },
    {
      jewelry: allJewelries[24],
      size: allSizes[8],
      quantity: 1,
      price: 47000,
    },
    {
      jewelry: allJewelries[25],
      size: allSizes[6],
      quantity: 1,
      price: 47000,
    },
    {
      jewelry: allJewelries[25],
      size: allSizes[7],
      quantity: 1,
      price: 47000,
    },
    {
      jewelry: allJewelries[25],
      size: allSizes[8],
      quantity: 1,
      price: 47000,
    },
    {
      jewelry: allJewelries[26],
      size: allSizes[6],
      quantity: 1,
      price: 46000,
    },
    {
      jewelry: allJewelries[26],
      size: allSizes[7],
      quantity: 1,
      price: 46000,
    },
    {
      jewelry: allJewelries[26],
      size: allSizes[8],
      quantity: 1,
      price: 46000,
    },
  ]);
}
populateDb();
