import { CATEGORIES_BY_ID_AND_TITLE } from "../../../constants/categories";
import { COLLECTIONS_BY_ID_AND_TITLE } from "../../../constants/collections";
import { HeroEarring } from "../HeroJewelryList/HeroEarring/HeroEarring";
import { HeroBracelet } from "../HeroJewelryList/HeroBracelet/HeroBracelet";
import { HeroRing } from "../HeroJewelryList/HeroRing/HeroRing";
import { HeroNecklace } from "../HeroJewelryList/HeroNecklace/HeroNecklace";
import { HeroForgetMeNot } from "./HeroForgetMeNot/HeroForgetMeNot";
import { HeroClassics } from "./HeroClassics/HeroClassics";
import { HeroPirouette } from "./HeroPirouette/HeroPirouette";
import { HeroDiamondLoop } from "./HeroDiamondLoop/HeroDiamondLoop";
import { HeroSunflower } from "./HeroSunflower/HeroSunflower";
import { HeroSparklingCluster } from "./HeroSparklingCluster/HeroSparklingCluster";

export const HeroJewelryList = ({ entityTitle }) => {
  return (
    <>
      {entityTitle === CATEGORIES_BY_ID_AND_TITLE["Earrings"][1] && (
        <HeroEarring entityTitle={entityTitle} />
      )}
      {entityTitle === CATEGORIES_BY_ID_AND_TITLE["Rings"][1] && (
        <HeroRing entityTitle={entityTitle} />
      )}
      {entityTitle === CATEGORIES_BY_ID_AND_TITLE["Necklaces"][1] && (
        <HeroNecklace entityTitle={entityTitle} />
      )}
      {entityTitle === CATEGORIES_BY_ID_AND_TITLE["Bracelets"][1] && (
        <HeroBracelet entityTitle={entityTitle} />
      )}
      {entityTitle === COLLECTIONS_BY_ID_AND_TITLE["Forget-Me-Not"][1] && (
        <HeroForgetMeNot entityTitle={entityTitle} />
      )}
      {/* {entityTitle === COLLECTIONS_BY_ID_AND_TITLE["Classics"][1] && (
        <HeroClassics entityTitle={entityTitle} />
      )} */}
      {/* {entityTitle === COLLECTIONS_BY_ID_AND_TITLE["Pirouette"][1] && (
        <HeroPirouette entityTitle={entityTitle} />
      )} */}
      {entityTitle === COLLECTIONS_BY_ID_AND_TITLE["Diamond Loop"][1] && (
        <HeroDiamondLoop entityTitle={entityTitle} />
      )}
      {/* {entityTitle === COLLECTIONS_BY_ID_AND_TITLE["Sunflower"][1] && (
        <HeroSunflower entityTitle={entityTitle} />
      )} */}
      {entityTitle === COLLECTIONS_BY_ID_AND_TITLE["Sparkling Cluster"][1] && (
        <HeroSparklingCluster entityTitle={entityTitle} />
      )}
    </>
  );
};
