import React, { useState } from 'react';

function TodoItem({ task, toggleComplete, deleteTask, updateTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleUpdate = () => {
    updateTask(task.id, newText);
    setIsEditing(false);
  };

  return (
    <div className={`flex items-center justify-between p-4 mb-3 rounded-2xl bg-gray-50 border border-transparent transition-all ${task.completed ? 'opacity-50' : 'hover:border-indigo-100 shadow-sm'}`}>
      <div className="flex items-center gap-4 flex-1">
        <input 
          type="checkbox" 
          className="w-5 h-5 cursor-pointer accent-indigo-600"
          checked={task.completed} 
          onChange={() => toggleComplete(task.id)} 
        />
        
        {isEditing ? (
          <input 
            className="flex-1 border-b-2 border-indigo-500 outline-none bg-transparent text-lg"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            autoFocus
          />
        ) : (
          <span className={`text-lg ${task.completed ? 'line-through text-gray-400' : 'text-gray-700 font-medium'}`}>
            {task.text}
          </span>
        )}
      </div>
      
      <div className="flex gap-2">
        {isEditing ? (
          <button onClick={handleUpdate} className="text-green-600 font-bold px-2">Save</button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="text-indigo-400 hover:text-indigo-600">
            {/* Edit Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        )}

        <button onClick={() => deleteTask(task.id)} className="text-red-400 hover:text-red-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default TodoItem;