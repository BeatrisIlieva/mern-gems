import styles from "./LoadMoreButton.module.css";

export const LoadMoreButton = ({ handleLoadMore }) => {
  return (
    <button className={styles["load-more-button"]} onClick={handleLoadMore}>
      Load More
    </button>
  );
};
