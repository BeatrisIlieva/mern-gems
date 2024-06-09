import styles from "./LoadMoreButton.module.css";

export const LoadMoreButton = ({ handleLoadMore, loadMoreDisabled }) => {
  return (
    <button
      className={`${styles["load-more-button"]} ${
        loadMoreDisabled === true ? styles["load-more-button-disabled"] : ""
      }`.trim()}
      onClick={handleLoadMore}
      disabled={loadMoreDisabled}
    >
      Load More
    </button>
  );
};
