import React, { useEffect, useRef, useState } from 'react'
import styles from "./style.module.css"
import TaskMoreMenu from '../TaskMoreMenu'
import useClickOutside from '../../../../hooks/useClickOutside';

const Task = ({task, handleDeleteTodo, handleEditTodo, handleOpenEditForm, setCloseTaskMenu, setOpenTaskMenu, isOpenTaskMenu}) => {


    const menuRef = useRef(false)
    const taskRef = useRef(false)

    console.log(task)
    useClickOutside(menuRef, () => {
        setCloseTaskMenu();
      });
      
      const refs = {
        menu: menuRef,
        task: taskRef,
      };


  return (
    <div className={styles.todos__task}>
        
    <button ref={taskRef} onClick={(e) => setOpenTaskMenu(e.target, task.id) } className={styles.task__more}>
        <span className="material-symbols-outlined">
            more_vert
        </span>
        <div className={styles.menu__wrapper}>


        </div>
    </button>
    <div className={`${styles.task__title} ${task.done && styles.completed}`}>{task.title}</div>
    <div className={styles.task__description}>{task.description}</div>
    <div style={{position: "relative"}}>

    <TaskMoreMenu task={task} ref={refs} handleEditTodo={handleEditTodo} handleOpenEditForm={handleOpenEditForm}  handleDeleteTodo={handleDeleteTodo} isOpen={isOpenTaskMenu} />
    </div>
</div>
  )
}

export default Task