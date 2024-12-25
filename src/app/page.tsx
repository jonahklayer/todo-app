'use client'
import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase/client'

export default function Home() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')

  // When page first loads, get todos from database
  useEffect(() => {
    fetchTodos()
  }, [])

  // Function that gets todos from database
  const fetchTodos = async () => {
    const { data, error } = await supabase.from('todos').select('*')
    if (data) setTodos(data)
  }

  // Function that creates a new todo
  const createTodo = async () => {
    // Don't create empty todos
    if (newTodo.trim().length === 0) return
    
    // Add new todo to database
    const { data, error } = await supabase
      .from('todos')
      .insert([{
        task: newTodo
      }])
      .select()

    if (data) {
      setTodos([...todos, ...data])
      setNewTodo('')
    }
  }

  // Add new delete function
  const deleteTodo = async (id: number) => {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id)  // Delete where id matches

    if (!error) {
      setTodos(todos.filter(todo => todo.id !== id))  // Remove from list
    }
  }

  // Add new toggle function
  const toggleTodo = async (id: number, currentState: boolean) => {
    const { error } = await supabase
      .from('todos')
      .update({ is_complete: !currentState })
      .eq('id', id)

    if (!error) {
      setTodos(todos.map(todo => 
        todo.id === id 
          ? { ...todo, is_complete: !todo.is_complete }
          : todo
      ))
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">My Todos</h1>
      
      {/* Input section for new todos */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo"
          className="border p-2 rounded"
        />
        <button 
          onClick={createTodo}
          className="bg-green-500 text-white p-2 rounded"
        >
          Add Todo
        </button>
      </div>

      {/* List of todos */}
      <ul>
        {todos.map((todo: any) => (
          <li key={todo.id} className="mb-2 flex items-center gap-2">
            <input
              type="checkbox"
              checked={todo.is_complete}
              onChange={() => toggleTodo(todo.id, todo.is_complete)}
            />
            <span style={{ 
              textDecoration: todo.is_complete ? 'line-through' : 'none' 
            }}>
              {todo.task}
            </span>
            <button 
              onClick={() => deleteTodo(todo.id)}
              className="bg-red-500 text-white p-1 rounded text-sm"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Refresh button at bottom */}
      <button 
        onClick={fetchTodos}
        className="bg-blue-500 text-white p-2 rounded mt-4"
      >
        Refresh Todos
      </button>
    </div>
  )
} 