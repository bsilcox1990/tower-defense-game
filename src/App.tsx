import { useState } from 'react'
import GameCanvas from './components/GameCanvas'
import './App.css'

function App() {
  

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "2rem",
      }}
    
    >
      <GameCanvas />
    </div>
  )
}

export default App
