import React, { useEffect, useRef, useState } from 'react'
import Panel from "../../../../components/Panel"
import styles from "./style.module.css";

import Task from '../Task';
import EditTaskForm from '../EditTaskForm';
import { addTodo, deleteTodo, editTodo, fetchTodos } from '../../../../service/todo';
import useClickOutside from '../../../../hooks/useClickOutside';
import addSymbolCircle from "../../../../assets/svg/add-symbol-circle.svg"

const TodoPanel = () => {
    const [todos, setTodos] = useState([]);
    const [formTask, setFormTask] = useState({title: "", description: "", done: false, completed: false, archived: false});
    const [taskMenuOpenId, setTaskMenuOpenId] = useState(null);
    const [editTaskFormOpen, setEditTaskFormOpen] = useState(false);
    const [newTodo, setNewTodo] = useState('');
    const [activeTab, setActiveTab] = useState('todo')

    const ref = useRef(null)
    useClickOutside(ref, () => {
        setEditTaskFormOpen(false);
      });

    useEffect(() => {
        (async () => {
            setTodos(await fetchTodos());
          })();
      }, []);

      const setOpenTaskMenu = (target, id) => {
        setTaskMenuOpenId(id)
      }

      const setCloseTaskMenu = () => {
        setTaskMenuOpenId(null)
      }

      const handleInputChange = (e) => {
        setNewTodo(e.target.value);
      };

      const handleAddTodo = async (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const createdTodo = await addTodo(newTodo);
          setTodos([...todos, createdTodo])
          setNewTodo("")
        }
      };

      const handleDeleteTodo = async (selectedId) => {
        deleteTodo(selectedId)
        setTodos([...todos.filter(({ id }) => id != selectedId)])
      };

      const handleEditTodo = async (selectedId, changingAttributes) => {
        const newTodo = await editTodo(selectedId, changingAttributes)
        setTodos([...todos.filter(({ id }) => id != selectedId), newTodo])
        setEditTaskFormOpen(false)
      };

      const handleOpenEditForm = (task) => {
        setFormTask(task)
        setTaskMenuOpenId(null)
        setEditTaskFormOpen(true)
      };
    


    return (
        <Panel>
            <div id="modal-root"></div>
            <div className={styles.todos__header}>Todos</div>
            <div className={styles.todos__nav}>
                <span onClick={() => setActiveTab('todo')} className={`${styles.todos__tab} ${activeTab == 'todo' && styles.active}`}>Todo</span>
                <span onClick={() => setActiveTab('completed')} className={`${styles.todos__tab} ${activeTab == 'completed' && styles.active}`}>Completed</span>
                <span onClick={() => setActiveTab('archived')} className={`${styles.todos__tab} ${activeTab == 'archived' && styles.active}`}>Archived</span>
            </div>

            <div className={styles.todos__body}>

                {activeTab == 'archived' ?
                    todos.filter(({ archived }) => archived).map((todo, i) => (
                        <Task key={i} task={todo} handleDeleteTodo={handleDeleteTodo} handleOpenEditForm={handleOpenEditForm} handleEditTodo={handleEditTodo} setCloseTaskMenu={setCloseTaskMenu}  setOpenTaskMenu={setOpenTaskMenu} isOpenTaskMenu={taskMenuOpenId == todo.id} />
                    ))
                    : activeTab == 'completed' ?
                    todos.filter(({ archived }) => !archived).filter(({ completed }) => completed).map((todo,i) => (
                        <Task key={i} task={todo} handleDeleteTodo={handleDeleteTodo} handleOpenEditForm={handleOpenEditForm}  handleEditTodo={handleEditTodo} setCloseTaskMenu={setCloseTaskMenu}  setOpenTaskMenu={setOpenTaskMenu} isOpenTaskMenu={taskMenuOpenId == todo.id} />
                    ))
                    : activeTab == 'todo' &&
                        todos.filter(({ archived }) => !archived).filter(({ completed }) => !completed).map((todo,i) => (
                            <Task key={i} task={todo} handleDeleteTodo={handleDeleteTodo} handleOpenEditForm={handleOpenEditForm}  handleEditTodo={handleEditTodo} setCloseTaskMenu={setCloseTaskMenu} setOpenTaskMenu={setOpenTaskMenu} isOpenTaskMenu={taskMenuOpenId == todo.id} />
                        ))


                }


            </div>
            {/* <div className={styles.todos__placeholder}>
                        there are no todos.
                    </div> */}
            <div className={styles.todos__footer}>
                <input className={styles.todos__input} placeholder='Quick New Task...' type="text" onKeyDown={handleAddTodo} onChange={handleInputChange} value={newTodo}/>
                <button className={styles.add__btn}>
                    <img src={addSymbolCircle} alt="" />
                </button>
            </div>
       <EditTaskForm setClose={() => setEditTaskFormOpen(false)} task={formTask} submit={handleEditTodo} setTask={setFormTask} ref={ref} isOpen={editTaskFormOpen} />



        </Panel>
    )
}
export default TodoPanel;