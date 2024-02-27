import axios from 'axios';

const API_URL = 'http://localhost:8000/todo';

export const fetchTodos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // return todos
  } catch (error) {
    throw error; // rethrow the error to be handled by the caller
  }
};

export const addTodo = async (newTodo) => {
  try {
    const response = await axios.post(API_URL, { title: newTodo });
    return response.data; // return the added todo
  } catch (error) {
    throw error;
  }
};

export const editTodo = async (id, modification) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, modification);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTodo = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return id; // return the id of the deleted todo
  } catch (error) {
    throw error;
  }
};