import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

// Différentes routes
import Search from './Search.tsx'

import './style.css'

function App() {

  return (
    <>
      <nav className="pages">
      <ul>
	<li><a href="/search">Search</a></li>
      </ul>
      </nav>

      <Routes>
	<Route path="/search" element={<Search />} />
      </Routes>
    </>
  )
}

export default App
