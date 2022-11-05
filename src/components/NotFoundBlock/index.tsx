import styles from "./Styles.module.scss";

const  NotFoundBlock: React.FC = () => {
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

export default NotFoundBlock;