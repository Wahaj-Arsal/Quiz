import styles from "./Header.module.css";

function SiteHeader() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>QuizLab</h1>
    </div>
  );
}

export default SiteHeader;
