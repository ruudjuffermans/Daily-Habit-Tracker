import React, { useState } from 'react'
import styles from "./style.module.css";

const Panel = ({ children }) => {
    return (
        <div className={styles.panel}>
            {children}
        </div>
    )
}

export default Panel