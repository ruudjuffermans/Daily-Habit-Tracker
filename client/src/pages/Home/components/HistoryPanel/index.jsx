// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend,
//   } from 'chart.js';
//   import { Line } from 'react-chartjs-2';
import Panel from '../../../../components/Panel';
import styles from "./style.module.css"
  
//   ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend
//   );

const HistoryPanel = () => {
  return (
    <Panel>
                    <div className={styles.todos__header}>Graph</div>
    </Panel>
  )
}

export default HistoryPanel