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
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <form onSubmit={addTask} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="Enter a new task"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Add
        </button>
      </form>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className="flex justify-between items-center p-2 border-b">
            <span>{task}</span>
            <button
              onClick={() => deleteTask(index)}
              className="text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
} 