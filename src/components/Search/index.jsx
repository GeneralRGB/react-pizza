import React from "react";
import debounce from "lodash.debounce";

import styles from "./search.module.scss";

export default function Search({ searchValue, setSearchValue }) {
  const pizzaSearch = React.useRef();
  const [visibleSearchValue, setVisibleSearchValue] = React.useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sendFilterRequest = React.useCallback(
    debounce((text) => {
      setSearchValue(text);
    }, 300),
    []
  );

  const useSearch = (event) => {
    setVisibleSearchValue(event.target.value);
    sendFilterRequest(event.target.value);
  };

  const clearSearch = () => {
    setSearchValue("");
    setVisibleSearchValue("");
    pizzaSearch.current.focus();
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        enableBackground="new 0 0 32 32"
        id="Glyph"
        version="1.1"
        viewBox="0 0 32 32"
        xmlSpace="preserve"
      >
        <path d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z" />
      </svg>
      <input
        ref={pizzaSearch}
        value={visibleSearchValue}
        onChange={useSearch}
        className={styles.search}
        type="text"
        placeholder="Поиск пиццы"
      />
      {
        <svg
          className={styles.clear}
          onClick={clearSearch}
          height="48"
          viewBox="0 0 48 48"
          width="48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z" />
          <path d="M0 0h48v48H0z" fill="none" />
        </svg>
      }
    </div>
  );
}
