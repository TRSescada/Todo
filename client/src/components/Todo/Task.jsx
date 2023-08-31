import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { v4 as uuidv4 } from "uuid";

export const Task = ({ tasks }) => {
  const [todos, setTodos] = useState(tasks || []);
  const [addValue, setAddValue] = useState('');
  const [editValue, setEditValue] = useState('');

  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
  }

  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo._id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
    // Set the editValue for the specific todo being edited
    setEditValue(todos.find(todo => todo.id === id).title);
  }

  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (addValue) {
      addTodo(addValue);
      setAddValue('');
    }
  }

  const handleEditSubmit = (e, id) => {
    e.preventDefault();
    if (editValue) {
      editTask(editValue, id);
      setEditValue('');
    }
  }

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done !</h1>
      <form onSubmit={handleAddSubmit} className="TodoForm">
        <input type="text" value={addValue} onChange={(e) => setAddValue(e.target.value)} className="todo-input" placeholder='What is the task today?' />
        <button type="submit" className='todo-btn'>Add Task</button>
      </form>
      {todos.map((todo) =>
        todo.isEditing ? (
          <form key={todo._id} onSubmit={(e) => handleEditSubmit(e, todo._id)} className="TodoForm">
            <input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} className="todo-input" placeholder='Update task' />
            <button type="submit" className='todo-btn'>Update Task</button>
          </form>
        ) : (
          <div key={todo._id} className="Todo">
            <p className={`${todo.completed ? 'completed' : ""}`} onClick={() => toggleComplete(todo._id)}>{todo.title}</p>
            <div>
              <FontAwesomeIcon icon={faPenToSquare} onClick={() => editTodo(todo._id)} />
              <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(todo._id)} />
            </div>
          </div>
        )
      )}
    </div>
  );
};
