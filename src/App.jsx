import { useState } from 'react'
import './App.css'
import { Board } from './components/Board'

const generateNumber = () => {
  const number = Math.random()
  return number > 0.7 ? 4 : 2
}

const addNumberToBoard = (board) => {
  let first = Math.floor(Math.random() * 16)
  while (board[first] !== null) {
    first = Math.floor(Math.random() * 16)
  }
  board[first] = generateNumber()
  let second = Math.floor(Math.random() * 16)
  while (board[second] !== null) {
    second = Math.floor(Math.random() * 16)
  }
  board[second] = generateNumber()
}

function App () {
  const [board, setBoard] = useState(Array(16).fill(null))

  const resetGame = () => {
    setBoard(Array(16).fill(null))
  }

  const handleClick = () => {
    addNumberToBoard(board)
    setBoard([...board])
  }
  return (
    <>
      <main className='board'>
        <h1>2048</h1>
        <button onClick={resetGame}>Reset Game</button>
        <section className='game'>
          <Board board={board} />
        </section>
        <section className='turn'>
          <button onClick={handleClick}>Move</button>

        </section>

      </main>
    </>
  )
}

export default App
