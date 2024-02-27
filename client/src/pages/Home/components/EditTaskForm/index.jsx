import React, { forwardRef } from 'react';
import  { createPortal } from 'react-dom';
import styles from "./style.module.css"

// Modal component
const EditTaskForm = forwardRef(({ isOpen, setClose, submit, task, setTask }, ref) => {
  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    const inputValue = type === 'checkbox' ? checked : value;
  
  
    setTask((task) => ({
      ...task,
      [name]: inputValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', task);
    submit(task.id, task)
  };

  return createPortal(
    <div className={styles.backdrop}>
    <div ref={ref} className={styles.modal}>
    <div className={styles.form}>
    <form onSubmit={handleSubmit}>
        <input className={styles.todos__input} placeholder='Task Title...' name="title" type="text" onChange={handleInputChange} value={task.title}/>
        <input className={styles.todos__input} placeholder='Task Title...' name="description" type="text" onChange={handleInputChange} value={task.description}/>
        <input
        type="checkbox"
        checked={task.done}
        name='done'
        onChange={handleInputChange}
      />
        <input
        type="checkbox"
        checked={task.completed}
        name='completed'
        onChange={handleInputChange}
      />
        <input
        type="checkbox"
        checked={task.archived}
        name='archived'
        onChange={handleInputChange}
      />
      <button type="submit">Submit</button>
      </form>
      </div>
      </div>
    </div>,
    document.getElementById('task-form')
  );
})

export default EditTaskForm;