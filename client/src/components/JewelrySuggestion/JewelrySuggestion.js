import { useService } from "../../hooks/useService";
import { jewelrySuggestionServiceFactory } from "../../services/jewelrySuggestionService";
import { useState, useEffect } from "react";
import styles from "./JewelrySuggestion.module.css";

export const JewelrySuggestion = ({ jewelryId }) => {
  const jewelrySuggestionService = useService(jewelrySuggestionServiceFactory);
  const [jewelries, setJewelries] = useState([]);

  useEffect(() => {
    jewelrySuggestionService
      .findAll(jewelryId)
      .then(setJewelries)
      .catch((err) => {
        console.log(err.message);
      });
  }, [jewelryId]);

  console.log(jewelries)

  return (

  <section className={styles["suggestion-box"]}>
        {jewelries.map((j) => (
            <div key={j._id}>
                <img src={j.firstImageUrl} alt="" />
            </div>)
        )}
  </section>
  )
};
