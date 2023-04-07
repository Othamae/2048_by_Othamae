import { useState, useEffect } from 'react'
import './App.css'
import { Board } from './components/Board'
import { WinnerModal } from './components/WinnerModal'
import { checkGameOver, addNumbersToBoard } from './logic/board'
import { Controller } from './components/Controller'

function App () {
  const [board, setBoard] = useState(() => {
    const emptyBoard = Array(16).fill(null)
    addNumbersToBoard(emptyBoard)
    return emptyBoard
  })
  const [points, setPoints] = useState(0)
  const [record, setRecord] = useState(parseInt(window.localStorage.getItem('record')) || 0)

  useEffect(() => {
    return () => {
      window.localStorage.setItem('record', record)
    }
  }, [record])

  const resetGame = () => {
    const emptyBoard = Array(16).fill(null)
    addNumbersToBoard(emptyBoard)
    setBoard(emptyBoard)
    setPoints(0)
  }

  const handlePointsUpdate = (newPoints) => {
    setPoints(newPoints)
    if (newPoints > record) {
      setRecord(newPoints)
      window.localStorage.setItem('record', newPoints)
    }
  }
  const isGameOver = checkGameOver(board)

  return (
    <>
      <main className='board'>
        <h1>2048</h1>
        <section className='contador'>
          <button className='reset' onClick={resetGame}>Reset Game</button>
          <div className='points'>
            <div>Points</div>
            <div>{points}</div>
          </div>
          <div className='record'>
            <div>Record</div>
            <div>{record}</div>
          </div>
        </section>
        <section className='game'>
          <Board board={board} />
        </section>
        <Controller
          board={board}
          setBoard={setBoard}
          points={points}
          handlePointsUpdate={handlePointsUpdate}
        />
        <div>
          {(isGameOver === true || (isGameOver && Math.max(...board) === 2048)) && (
            <WinnerModal isGameOver={isGameOver} resetGame={resetGame} />
          )}
        </div>
      </main>
    </>
  )
}

export default App
