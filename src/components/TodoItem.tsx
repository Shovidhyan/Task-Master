import React from 'react';
import { Todo } from '../types';
import { useTodo } from '../context/TodoContext';
import { Trash2, Edit, Calendar, CheckCircle, Circle } from 'lucide-react';

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
}

export function TodoItem({ todo, onEdit }: TodoItemProps) {
  const { toggleTodo, deleteTodo } = useTodo();

  const priorityColors = {
    low: 'bg-blue-100 text-blue-800 border-blue-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    high: 'bg-red-100 text-red-800 border-red-200',
  };

  return (
    <div 
      className={`bg-white rounded-xl shadow-sm p-4 border-l-4 transform transition-all duration-300 hover:-translate-x-1 hover:shadow-md animate-slide-in ${
        todo.completed ? 'border-green-500 bg-opacity-75' : 'border-indigo-500'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          <button
            onClick={() => toggleTodo(todo.id)}
            className="text-gray-500 hover:text-indigo-600 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-full"
          >
            {todo.completed ? (
              <CheckCircle className="w-6 h-6 text-green-500" />
            ) : (
              <Circle className="w-6 h-6" />
            )}
          </button>
          <div className="flex-1">
            <h3 className={`text-lg font-medium transition-all duration-300 ${
              todo.completed ? 'line-through text-gray-500' : 'text-gray-900'
            }`}>
              {todo.title}
            </h3>
            <p className="text-gray-600 text-sm mt-1">{todo.description}</p>
            <div className="flex items-center space-x-2 mt-2">
              <span className={`text-xs px-2 py-1 rounded-full border ${priorityColors[todo.priority]} transition-all duration-300 hover:scale-105`}>
                {todo.priority}
              </span>
              <span className="text-xs text-gray-500 flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {new Date(todo.dueDate).toLocaleDateString()}
              </span>
              {todo.category && (
                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800 border border-gray-200 transition-all duration-300 hover:scale-105">
                  {todo.category}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(todo)}
            className="p-1 hover:bg-gray-100 rounded-full transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Edit className="w-5 h-5 text-gray-500" />
          </button>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="p-1 hover:bg-red-100 rounded-full transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <Trash2 className="w-5 h-5 text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
}