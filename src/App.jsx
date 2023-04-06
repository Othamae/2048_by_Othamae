import { useState } from 'react'
import './App.css'

export const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

function Board ({ updateBoard, board }) {
  return (
    board.map((square, index) => {
      return (
        <Square
          key={index}
          index={index}
          updateBoard={updateBoard}
        >
          {square}
        </Square>
      )
    })
  )
}

function App () {
  const [board, setBoard] = useState(Array(16).fill(null))

  const resetGame = () => {
    setBoard(Array(16).fill(null))
  }
  return (
    <>
      <main className='board'>
        <h1>2048</h1>
        <button onClick={resetGame}>Reset Game</button>
        <section className='game'>
          <Board board={board} />
        </section>

      </main>
    </>
  )
}

export default App
