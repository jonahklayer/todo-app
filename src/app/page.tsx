'use client'
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// Disable SSR for this component
const TodoApp = dynamic(() => import('../components/TodoApp'), {
  ssr: false
})

export default function Home() {
  return <TodoApp />
} 