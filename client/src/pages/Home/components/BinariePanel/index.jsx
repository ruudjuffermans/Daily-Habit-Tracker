import React, { useEffect, useRef, useState } from 'react'
import Panel from "../../../../components/Panel"
import styles from "./style.module.css";
import addSymbolCircle from "../../../../assets/svg/add-symbol-circle.svg"
import { fetchBinaries, toggleBinarie } from '../../../../service/binaries';

const BinariePanel = () => {
  const [binaries, setBinaries] = useState([])

  useEffect(() => {
    (async () => {
        setBinaries(await fetchBinaries());
      })();
  }, []);

  const handleToggleBinarie = async (selectedId) => {
    const newBinarie = await toggleBinarie(selectedId)
    setBinaries([...binaries.filter(({ id }) => id != selectedId), newBinarie])
  };

    return (
        <Panel>
            <div className={styles.todos__header}>Today</div>


            <div className={styles.todos__body}>
                {binaries.sort((a, b) => a.id - b.id).filter(({ day }) => new Date().toISOString().slice(0,10) == day).map((binarie, i) => (
           
                <button className={styles.binaries__row} key={i} onClick={() => handleToggleBinarie(binarie.id)}>
                    <div className={styles.box__empty}>
                        {binarie.active &&
                        <div className={styles.box__check}></div>
                        }
                    </div>
                <span>{binarie.title}</span>
                </button>
        
                ))}
            <ul>

            </ul>

            </div>
 
            <div className={styles.todos__footer}>
            </div>

        </Panel>
    )
}
export default BinariePanel;