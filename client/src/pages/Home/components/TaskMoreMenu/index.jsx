import React, { forwardRef } from 'react';
import styles from "./style.module.css"
import { deleteTodo, editTodo } from '../../../../service/todo';
import { createPortal } from 'react-dom';


const TaskMoreMenu = forwardRef(({ isOpen, handleDeleteTodo, handleOpenEditForm, handleEditTodo,  task }, ref) => {
  const taskRef = ref.task;
  const menuRef = ref.menu;
  if (!isOpen) return null;

  function getOffset() {
    try {
      
      const rect = taskRef.current.getBoundingClientRect();
      return {
        left: rect.right +5 + window.scrollX,
        top: rect.top - 30 + window.scrollY
      };
    } catch (error) {
      return {
        left:0,
        top: 0
      };
    }

  }

  return createPortal(
    <div ref={menuRef} className={styles.task__menu} style={{top:getOffset(ref.current).top, left:getOffset(ref.current).left}}>

        <div onClick={() => handleOpenEditForm(task)} className={styles.menu__item}>Edit Task</div>
        <div onClick={() => handleEditTodo(task.id, { archived: true })} className={styles.menu__item}>Move to Archived</div>
        <div onClick={() => handleEditTodo(task.id,  { archived: false })} className={styles.menu__item}>Restore from Archive</div>
        <div onClick={() => handleEditTodo(task.id, { completed: true })} className={styles.menu__item}>Move to Completed</div>
        <div onClick={() => handleEditTodo(task.id,  { completed: false })} className={styles.menu__item}>Move to Todo</div>
        <div onClick={() => handleDeleteTodo(task.id)} className={styles.menu__item}>Remove Item</div>
      </div>,

    document.getElementById('modal-root') // Target container
  );
})

export default TaskMoreMenu;