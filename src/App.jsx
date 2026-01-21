import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(tasks));
  }, [tasks]);
  
  const addTask = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTasks([{ id: Date.now(), text: input, completed: false }, ...tasks]);
    setInput('');
  };

  // ✅ Toggle Logic
  const toggleComplete = (id) => {
    const newTasks = tasks.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTasks(newTasks);
  };

  // ✅ Delete Logic
  const deleteTask = (id) => {
    const remainingTasks = tasks.filter(t => t.id !== id);
    setTasks(remainingTasks);
  };

  // ✅ Update/Edit Logic (Ab sahi jagah par hai)
  const updateTask = (id, newText) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, text: newText } : t));
  };

  const filteredTasks = tasks.filter(t => 
    t.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">

      <h1>Project Status: {import.meta.env.VITE_APP_STATUS}</h1>
      
      <div className="bg-white w-full max-w-md rounded-[2rem] shadow-xl p-8">
        <h1 className="text-3xl font-black text-indigo-600 text-center mb-8">Task Master Pro</h1>

        <form onSubmit={addTask} className="flex gap-2 mb-6">
          <input 
            type="text" 
            placeholder="Add a new task..." 
            className="flex-1 bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-500 outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="bg-indigo-600 text-white px-6 py-4 rounded-2xl font-bold hover:bg-indigo-700 active:scale-95 transition-all">
            Add
          </button>
        </form>

        <input 
          type="text" 
          placeholder="Search..." 
          className="w-full mb-6 p-3 bg-slate-50 rounded-xl border-none text-sm outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="space-y-1">
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <TodoItem 
                key={task.id} 
                task={task} 
                toggleComplete={toggleComplete} 
                deleteTask={deleteTask} 
                updateTask={updateTask} // ✅ Prop pass ho raha hai
              />
            ))
          ) : (
            <p className="text-center text-gray-400 py-10">No tasks found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;