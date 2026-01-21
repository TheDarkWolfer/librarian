import { useState } from 'react'

// Différentes routes
import Search from './Search.tsx'

import './App.css'

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
