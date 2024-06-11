import styles from "./LoadMoreButton.module.css";

export const LoadMoreButton = ({ loadMoreHandler, loadMoreDisabled }) => {
  return (
    <button
      className={`${styles["load-more-button"]} ${
        loadMoreDisabled === true ? styles["load-more-button-disabled"] : ""
      }`.trim()}
      onClick={loadMoreHandler}
      disabled={loadMoreDisabled}
    >
      Load More
    </button>
  );
};
