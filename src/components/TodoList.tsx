import React, { useState, useMemo } from 'react';
import { Todo } from '../types';
import { useTodo } from '../context/TodoContext';
import { TodoItem } from './TodoItem';
import { Search, Filter, SlidersHorizontal, AlertTriangle } from 'lucide-react';

interface TodoListProps {
  onEdit: (todo: Todo) => void;
}

export function TodoList({ onEdit }: TodoListProps) {
  const { todos } = useTodo();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showHighPriority, setShowHighPriority] = useState(false);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(todos.map(todo => todo.category));
    return ['all', ...Array.from(uniqueCategories)];
  }, [todos]);

  const filteredTodos = useMemo(() => {
    return todos
      .filter(todo => {
        const matchesSearch = todo.title.toLowerCase().includes(search.toLowerCase()) ||
                            todo.description.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = filter === 'all' ? true :
                            filter === 'completed' ? todo.completed :
                            !todo.completed;
        const matchesCategory = categoryFilter === 'all' ? true :
                              todo.category === categoryFilter;
        const matchesPriority = showHighPriority ? todo.priority === 'high' : true;
        return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
      })
      .sort((a, b) => {
        // Sort by priority first (high priority first)
        if (a.priority === 'high' && b.priority !== 'high') return -1;
        if (a.priority !== 'high' && b.priority === 'high') return 1;
        // Then sort by due date
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
  }, [todos, search, filter, categoryFilter, showHighPriority]);

  const highPriorityCount = useMemo(() => {
    return todos.filter(todo => todo.priority === 'high').length;
  }, [todos]);

  return (
    <div>
      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search todos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 w-full rounded-lg border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-200"
            />
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowHighPriority(!showHighPriority)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                showHighPriority
                  ? 'bg-red-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-red-50'
              }`}
            >
              <AlertTriangle className={`w-5 h-5 ${showHighPriority ? 'animate-pulse' : ''}`} />
              <span>High Priority</span>
              {highPriorityCount > 0 && (
                <span className={`ml-2 px-2 py-0.5 text-sm rounded-full ${
                  showHighPriority
                    ? 'bg-white text-red-500'
                    : 'bg-red-100 text-red-600'
                }`}>
                  {highPriorityCount}
                </span>
              )}
            </button>
            <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg shadow-sm">
              <SlidersHorizontal className="w-5 h-5 text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as 'all' | 'active' | 'completed')}
                className="border-none bg-transparent focus:ring-0 text-gray-700"
              >
                <option value="all">All Tasks</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg shadow-sm">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="border-none bg-transparent focus:ring-0 text-gray-700"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {filteredTodos.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-50 rounded-lg p-8 inline-block">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No todos found</p>
              <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
            </div>
          </div>
        ) : (
          filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onEdit={onEdit}
            />
          ))
        )}
      </div>
    </div>
  );
}