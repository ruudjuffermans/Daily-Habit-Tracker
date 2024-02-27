import React, {  useState } from 'react'
import Panel from "../../../../components/Panel"
import styles from "./style.module.css";
import CountdownTimer from './CountdownTimer';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

const color = '#eee';

const PomodoroPanel = () => {
    return (
        <Panel>
            <div className={styles.todos__header}>Pomodoro's</div>
            <CircularProgressbar
        value={100}
        styles={buildStyles({
        pathColor: color,
        tailColor:'rgba(255,255,255,.8)',
      })} />
    
            <CountdownTimer />

        
 
            <div className={styles.todos__footer}>
              
<button>start</button>
<button>next</button>
            </div>

        </Panel>
    )
}
export default PomodoroPanel;