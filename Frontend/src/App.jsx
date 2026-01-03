import axios from 'axios';
import { useState } from 'react'

function App() {
  const {newtodo, setnewtodo} = useState("");
  const [todos, setTodos] = useState([]);

  const addtodo = async (e) => {
    e.preventDefault();
    if (!newtodo.trim()) return;
    try {
      const response = await axios.post("http://localhost:5000/api/todos", {text: newtodo.trim()});
      setTodos([...todos, response.data]);
      setnewtodo("");

    } catch (error) {
      console.error("Error adding todo:", error);
      
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Task Manager</h1>

      <form onSubmit={addtodo} className='flex items-center gap-2 shadow-md border border-gray-200 rounded-md overflow-hidden'>
        <input 
        className='flex-1 outline-none px-3 py-2 text-gray-700 placeholder-gray-400'
        type="text" value={newtodo} onChange={(e) => setnewtodo(e.target.value)} 
        placeholder='what needs to be done' />

        <button type="submit" className='bg-blue-400 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium cursor-pointer'>Add Task</button>
      </form>
      </div>
    </div>
  )
}
export default App
