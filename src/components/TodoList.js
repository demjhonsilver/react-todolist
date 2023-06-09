import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const TodoList = () => {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editText, setEditText] = useState('');

  // Add todo item
  const addTodo = (event) => {
    event.preventDefault();
    const todoText = event.target.todo.value;
    if (todoText) {
      const newTodo = {
        id: new Date().getTime(),
        text: todoText,
      };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      event.target.todo.value = '';
    }
  };

  // Remove todo item
  const removeTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  // Update todo item
  const updateTodo = (id, newText) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          text: newText,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setEditingTodoId(null);
  };

  // Save todos to local storage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleEditClick = (id, text) => {
    setEditingTodoId(id);
    setEditText(text);
  };

  const handleEditChange = (event) => {
    setEditText(event.target.value);
  };

  const handleEditSubmit = (event, id) => {
    event.preventDefault();
    updateTodo(id, editText);
  };

  const handleCancelEdit = () => {
    setEditingTodoId(null);
    setEditText('');
  };

  return (
    <div className="container">
      <h2 className="my-4">Todo List</h2>
      <form onSubmit={addTodo} className="mb-3">
        <div className="input-group">
          <input
            type="text"
            name="todo"
            className="form-control"
            placeholder="Enter a todo item"
          />
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </div>
      </form>
      <ul className="list-group">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {editingTodoId === todo.id ? (
              <form
                onSubmit={(event) => handleEditSubmit(event, todo.id)}
                className="d-flex align-items-center w-100"
              >
                <input
                  type="text"
                  value={editText}
                  onChange={handleEditChange}
                  className="form-control me-2"
                />
                <div className="btn-group">
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="d-flex align-items-center justify-content-between w-100">
                <span>{todo.text}</span>
                <div>
                  <button
                    onClick={() => handleEditClick(todo.id, todo.text)}
                    className="btn btn-primary mx-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => removeTodo(todo.id)}
                    className="btn btn-danger"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;