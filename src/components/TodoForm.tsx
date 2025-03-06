import React, { useState } from 'react';
import { Todo } from '../types';
import { useTodo } from '../context/TodoContext';
import { Plus, X } from 'lucide-react';

interface TodoFormProps {
  editTodo?: Todo;
  onClose: () => void;
}

export function TodoForm({ editTodo, onClose }: TodoFormProps) {
  const { addTodo, updateTodo } = useTodo();
  const [formData, setFormData] = useState({
    title: editTodo?.title || '',
    description: editTodo?.description || '',
    priority: editTodo?.priority || 'medium',
    category: editTodo?.category || '',
    dueDate: editTodo?.dueDate ? new Date(editTodo.dueDate).toISOString().split('T')[0] : '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editTodo) {
      updateTodo(editTodo.id, formData);
    } else {
      addTodo({
        ...formData,
        completed: false,
      } as Omit<Todo, 'id' | 'createdAt'>);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 animate-fade">
      <div className="bg-white rounded-lg w-full max-w-md p-6 animate-scale">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {editTodo ? 'Edit Todo' : 'Add New Todo'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-all duration-300 transform hover:scale-110"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-300"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as Todo['priority'] })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-300"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-300"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Due Date</label>
            <input
              type="date"
              required
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-300"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105"
            >
              <Plus className="w-4 h-4 mr-2" />
              {editTodo ? 'Update' : 'Add'} Todo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}