import styles from "./style.module.css";

const Pages = ({ children }) => {
  return (
    <div className={styles.page}>
      {children}
    </div>
  );
};

export default Pages;
