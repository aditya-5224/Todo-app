import axios from 'axios';
import { useEffect, useState } from 'react';
import { MdOutlineDone } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import { MdOutlineEdit } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import { IoClipboardOutline } from 'react-icons/io5';



function App() {
  const [newtodo, setnewtodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editText, setEditText] = useState("");

  const addtodo = async (e) => {
    e.preventDefault();

    if (!newtodo.trim()) return;
    try {
      const response = await axios.post("http://localhost:5000/api/todos", { text: newtodo.trim() });
      setTodos([...todos, response.data]);
      setnewtodo("");

    } catch (error) {
      console.error("Error adding todo:", error);

    }
  }

  const fetchTodos = async () => {
    try {
      const response = await axios.get("/api/todos");
      console.log(response.data);
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  const startEditing = (todo) => {
    setEditingTodo(todo._id);
    setEditText(todo.text);
  }

  const saveEdit = async (id) => {
    try {
      const response = await axios.patch(`/api/todos/${id}`, { text: editText });
      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
      setEditingTodo(null);
      setEditText("");
    } catch (error) {
      console.error("Error updating todo:", error); 
  }
}

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }

  const toggleTodo = async (id) => {
    try {
      const todo = todos.find((todo) => todo._id === id);
      const response = await axios.patch(`/api/todos/${id}`, { completed: !todo.completed });
      setTodos(todos.map((t) => (t._id === id ? response.data : t)));
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Task Manager</h1>

        <form onSubmit={addtodo} className='flex items-center gap-2 shadow-md border border-gray-200 rounded-md overflow-hidden' style={{ boxShadow: '0 4px 6px rgba(215, 31, 31, 0.1)' }}>
          <input
            className='flex-1 outline-none px-3 py-2 text-gray-700 placeholder-gray-400'
            type="text" value={newtodo} onChange={(e) => setnewtodo(e.target.value)}
            placeholder='what needs to be done' />

          <button type="submit" className='bg-red-400 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium cursor-pointer'>Add Task</button>
        </form>

        <div className="mt-4">
          {todos.length === 0 ? (
            <div></div>
          ) : (
            <div className='flex flex-col gap-y-2'>
              {todos.map((todo) => (
                <div key={todo._id} className="flex items-center justify-between bg-gray-100 rounded-md p-3 mt-4">
                  {editingTodo === todo._id ? (
                    <div className="flex items-center gap-x-2">
                      <input
                      className='p-3 rounded-md border border-gray-300 outline-none flex-1 focus:border-red-400' 
                      type="text" 
                      value={editText} 
                      onChange={(e) => setEditText(e.target.value)} />
                      <div className="flex gap-x-2">
                        <button onClick={() => saveEdit(todo._id)} className='px-3 py-2 bg-green-300 text-white rounded-md hover:bg-green-600' >
                        <MdOutlineDone />
                      </button>
                      <button className='px-3 py-2 bg-gray-300 text-white rounded-md hover:bg-gray-600' onClick={() => setEditingTodo(null)}>
                        <IoClose />
                      </button>
                      </div>
                    </div>
                    

                  ) : (
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-x-2 overflow-hidden">
                        <div className="flex items-center gap-x-2 overflow-hidden flex-1 min-w-0"> 
                          <button 
                          className={`flex-shrink-0 p-2 rounded-lg border-2 ${todo.completed ? 'border-green-400 bg-green-100 text-green-600' : 'border-gray-300 text-gray-400 hover:border-gray-500'}`}
                          onClick={() => toggleTodo(todo._id)}>
                            {todo.completed && <MdOutlineDone />}
                          </button>
                          <span className='truncate text-gray-800 font-medium'>
                            {todo.text}
                          </span>
                        </div>
                        <div className="flex gap-x-2 flex-shrink-0">
                          <button className='p-2 text-blue-300 hover:text-blue-600 rounded-lg' onClick={() => startEditing(todo)}>
                          <MdOutlineEdit />
                        </button>
                        <button onClick={() => deleteTodo(todo._id)} className='p-2 text-red-300 hover:text-red-600 rounded-lg'>
                          <FaTrash />
                        </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default App
