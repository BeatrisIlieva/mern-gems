import { HEROES_BY_TITLE } from "../../../constants/heroes";
import styles from "./HeroJewelryList.module.css";
import { HorizontalLine } from "../../HorizontalLine/HorizontalLine";

export const HeroJewelryList = ({ entityTitle }) => {
  return (
    <div className={styles["hero-top-container"]}>
      <div className={styles["hero-img-container"]}>
        <img
          className={styles["hero-img"]}
          src={HEROES_BY_TITLE[entityTitle][0]}
          alt={"Img"}
        />
      </div>
      <div className={styles["info-container"]}>
        <h2 className={styles["box-title"]}>{entityTitle}</h2>
        <HorizontalLine />
        <div className={styles["paragraph-container"]}>
          <p className={styles["box-paragraph"]}>
            {HEROES_BY_TITLE[entityTitle][1]}
          </p>
        </div>
      </div>
    </div>
  );
};

// export const HeroJewelryList = ({ entityTitle }) => {
//   return (
//     <>
//       {entityTitle === CATEGORIES_BY_ID_AND_TITLE["Earrings"][1] && (
//         <HeroEarring entityTitle={entityTitle} />
//       )}
//       {entityTitle === CATEGORIES_BY_ID_AND_TITLE["Rings"][1] && (
//         <HeroRing entityTitle={entityTitle} />
//       )}
//       {entityTitle === CATEGORIES_BY_ID_AND_TITLE["Necklaces"][1] && (
//         <HeroNecklace entityTitle={entityTitle} />
//       )}
//       {entityTitle === CATEGORIES_BY_ID_AND_TITLE["Bracelets"][1] && (
//         <HeroBracelet entityTitle={entityTitle} />
//       )}
//       {entityTitle === COLLECTIONS_BY_ID_AND_TITLE["Forget-Me-Not"][1] && (
//         <HeroForgetMeNot entityTitle={entityTitle} />
//       )}
//       {/* {entityTitle === COLLECTIONS_BY_ID_AND_TITLE["Classics"][1] && (
//         <HeroClassics entityTitle={entityTitle} />
//       )} */}
//       {/* {entityTitle === COLLECTIONS_BY_ID_AND_TITLE["Pirouette"][1] && (
//         <HeroPirouette entityTitle={entityTitle} />
//       )} */}
//       {entityTitle === COLLECTIONS_BY_ID_AND_TITLE["Diamond Loop"][1] && (
//         <HeroDiamondLoop entityTitle={entityTitle} />
//       )}
//       {/* {entityTitle === COLLECTIONS_BY_ID_AND_TITLE["Sunflower"][1] && (
//         <HeroSunflower entityTitle={entityTitle} />
//       )} */}
//       {entityTitle === COLLECTIONS_BY_ID_AND_TITLE["Sparkling Cluster"][1] && (
//         <HeroSparklingCluster entityTitle={entityTitle} />
//       )}
//     </>
//   );
// };
