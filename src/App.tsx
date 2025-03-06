import React, { useState } from 'react';
import { TodoProvider } from './context/TodoContext';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { Todo } from './types';
import { Plus, CheckCircle2, ListTodo, Calendar as CalendarIcon } from 'lucide-react';
import { StatsCard } from './components/StatsCard';
import { useTodo } from './context/TodoContext';

function TodoStats() {
  const { todos } = useTodo();
  const completed = todos.filter(todo => todo.completed).length;
  const pending = todos.filter(todo => !todo.completed).length;
  const highPriority = todos.filter(todo => todo.priority === 'high').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <StatsCard
        title="Total Tasks"
        value={todos.length}
        icon={<ListTodo className="w-6 h-6" />}
        color="bg-blue-500"
      />
      <StatsCard
        title="Completed"
        value={completed}
        icon={<CheckCircle2 className="w-6 h-6" />}
        color="bg-green-500"
      />
      <StatsCard
        title="High Priority"
        value={highPriority}
        icon={<CalendarIcon className="w-6 h-6" />}
        color="bg-red-500"
      />
    </div>
  );
}

function TodoApp() {
  const [showForm, setShowForm] = useState(false);
  const [editTodo, setEditTodo] = useState<Todo | undefined>();

  const handleEdit = (todo: Todo) => {
    setEditTodo(todo);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditTodo(undefined);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-400 via-purple-400 to-pink-400 animate-gradient-xy">
      <div className="max-w-6xl mx-auto p-4 pt-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="bg-white/90 p-2 rounded-lg shadow-lg backdrop-blur-sm">
              <CheckCircle2 className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white text-shadow">Task Master</h1>
              <p className="text-white/90">Organize your tasks efficiently</p>
            </div>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Todo
          </button>
        </div>

        <TodoStats />

        <div className="bg-white/80 rounded-2xl shadow-xl p-6 backdrop-blur-lg transition-all duration-300 hover:shadow-2xl">
          <TodoList onEdit={handleEdit} />
        </div>

        {showForm && (
          <TodoForm editTodo={editTodo} onClose={handleClose} />
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  );
}

export default App;