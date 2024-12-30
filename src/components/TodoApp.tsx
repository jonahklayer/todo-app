'use client'
import React, { useState } from 'react'

export default function TodoApp() {
  const [tasks, setTasks] = useState<string[]>([])
  const [newTask, setNewTask] = useState('')

  const addTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTask.trim()) {
      setTasks([...tasks, newTask])
      setNewTask('')
    }
  }

  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index))
  }

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px'
    }}>
      <h1>Todo List 2</h1>
      
      <form onSubmit={addTask} style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '20px'
      }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
          required
          style={{
            flexGrow: 1,
            padding: '10px',
            fontSize: '16px'
          }}
        />
        <button 
          type="submit"
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Add Task
        </button>
      </form>

      <ul style={{
        listStyle: 'none',
        padding: 0
      }}>
        {tasks.map((task, index) => (
          <li 
            key={index} 
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px',
              borderBottom: '1px solid #ddd'
            }}
          >
            <span>{task}</span>
            <a 
              onClick={() => deleteTask(index)}
              style={{
                color: 'red',
                textDecoration: 'none',
                cursor: 'pointer'
              }}
            >
              Delete
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
} 