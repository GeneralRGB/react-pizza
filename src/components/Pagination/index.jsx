import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./pagination.module.scss";

export default function Pagination({ onPageChange, pagesAmount }) {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onPageChange(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={pagesAmount}
      renderOnZeroPageCount={null}
    />
  );
}
