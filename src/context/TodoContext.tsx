import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Todo, TodoContextType } from '../types';

const TodoContext = createContext<TodoContextType | undefined>(undefined);

type TodoAction =
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'UPDATE_TODO'; payload: { id: string; todo: Partial<Todo> } }
  | { type: 'SET_TODOS'; payload: Todo[] };

function todoReducer(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload];
    case 'TOGGLE_TODO':
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    case 'DELETE_TODO':
      return state.filter((todo) => todo.id !== action.payload);
    case 'UPDATE_TODO':
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, ...action.payload.todo }
          : todo
      );
    case 'SET_TODOS':
      return action.payload;
    default:
      return state;
  }
}

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, dispatch] = useReducer(todoReducer, []);

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      dispatch({ type: 'SET_TODOS', payload: JSON.parse(savedTodos) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo: Omit<Todo, 'id' | 'createdAt'>) => {
    const newTodo: Todo = {
      ...todo,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_TODO', payload: newTodo });
  };

  const toggleTodo = (id: string) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const deleteTodo = (id: string) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  const updateTodo = (id: string, todo: Partial<Todo>) => {
    dispatch({ type: 'UPDATE_TODO', payload: { id, todo } });
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo, updateTodo }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
}