import Container from "../../components/Container";
import Panel from "../../components/Panel";
import BinariePanel from "./components/BinariePanel";
import HistoryPanel from "./components/HistoryPanel";
import PomodoroPanel from "./components/PomodoroPanel";
import TodoPanel from "./components/TodoPanel";
import styles from "./style.module.css";

const Home = ({ children }) => {
  return (
    <div className={styles.home__wrapper}>
      <Container>
    <div className={styles.home__grid}>
      <div className={styles.home__slot1}><TodoPanel/></div>
      <div className={styles.home__slot2}><PomodoroPanel /></div>
      <div className={styles.home__slot3}><BinariePanel/></div>
      <div className={styles.home__slot4}><HistoryPanel/></div>
      {/* <div className={styles.home__slot6}><Panel/></div> */}
      {/* <div className={styles.home__slot7}><Panel/></div> */}
      {/* <div className={styles.home__slot8}><Panel/></div> */}
      {/* <div className={styles.home__slot9}><Panel/></div> */}
    </div>
      </Container>
    </div>
  );
};

export default Home;
