import styles from "./Footer.module.css";

function SiteFooter() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.footer}>
        <ul className={styles.footer_ul}>
          <li>About</li>
          <li>Contact</li>
          <li>T&C</li>
        </ul>
      </div>
    </div>
  );
}

export default SiteFooter;
