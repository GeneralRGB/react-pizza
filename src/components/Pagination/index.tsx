import React from "react";
import ReactPaginate from "react-paginate";
import { useSelector, useDispatch } from "react-redux";

import { setCurrentPage } from "../../redux/slices/filterSlice";
import styles from "./pagination.module.scss";

export default function Pagination() {
  const dispatch = useDispatch();

  const { pagesAmount } = useSelector((state: any) => state.pizzaSlice);

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => dispatch(setCurrentPage(event.selected + 1))}
      pageRangeDisplayed={4}
      pageCount={pagesAmount}
    />
  );
}
