import React from "react";

import styles from "./Styles.module.scss";

export default function NotFoundBlock() {
  return (
    <div className={styles.root}>
      <h2>
        <span>😥</span>
        <br />
        404 Not Found
      </h2>
      <p className={styles.description}>
        К сожалению, запрашиваемая страница не найдена
      </p>
    </div>
  );
}
