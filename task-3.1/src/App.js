import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoText, setEditTodoText] = useState('');

  useEffect(() => {
    axios.get(API_URL).then((response) => {
      setTodos(response.data);
    });
  }, []);

  const addTodo = () => {
    if (newTodo.trim() === '') return;

    axios.post(API_URL, { text: newTodo }).then((response) => {
      setTodos([...todos, response.data]);
      setNewTodo('');
    });
  };

  const startEditing = (todo) => {
    setEditTodoId(todo.id);
    setEditTodoText(todo.text);
  };

  const cancelEditing = () => {
    setEditTodoId(null);
    setEditTodoText('');
  };

  const saveTodo = (id) => {
    axios.put(`${API_URL}/${id}`, { text: editTodoText }).then((response) => {
      setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)));
      cancelEditing();
    });
  };

  const deleteTodo = (id) => {
    axios.delete(`${API_URL}/${id}`).then(() => {
      setTodos(todos.filter((todo) => todo.id !== id));
    });
  };

  return (
    <div className="container mx-auto p-4 bg-slate-800 h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center text-slate-300">Todo List</h1>
      <div className="flex flex-col md:flex-row mb-4 w-[550px] p-6 mx-auto">
        <input
          type="text"
          className="border rounded p-2 mb-2 md:mb-0 md:mr-2 flex-grow"
          placeholder="Add a new task"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white rounded p-2" onClick={addTodo}>
          Add Todo
        </button>
      </div>
      <ul className="space-y-2 w-[850px] mx-auto ">
        {todos.map((todo) => (
          <div className='border-2 rounded-md border-slate-500 p-3'>
            <li key={todo.id} className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2 border rounded-md border-black p-2 bg-slate-500">
              {editTodoId === todo.id ? (
                <>
                  <input
                    type="text"
                    className="border rounded p-2 flex-grow mr-2"
                    value={editTodoText}
                    onChange={(e) => setEditTodoText(e.target.value)}
                  />
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white rounded p-2"
                    onClick={() => saveTodo(todo.id)}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-500 hover:bg-gray-700 text-white rounded p-2"
                    onClick={cancelEditing}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                    {todo.text}
                  </span>
                  <button
                    className="bg-yellow-500 hover:bg-yellow-700 text-white rounded p-2"
                    onClick={() => startEditing(todo)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white rounded p-2"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
