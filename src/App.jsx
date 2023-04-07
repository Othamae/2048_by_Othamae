import { useState, useEffect } from 'react'
import './App.css'
import { Board } from './components/Board'
import { WinnerModal } from './components/WinnerModal'
import { checkGameOver, addNumbersToBoard } from './logic/board'
import { Controller } from './components/Controller'
import { getBoardFromStorage, getRecordFromStorage, getScoreFromStorage, resetGameStorage, saveRecordToStorage } from './logic/storage'

function App () {
  const [board, setBoard] = useState(() => {
    const emptyBoard = Array(16).fill(null)
    addNumbersToBoard(emptyBoard)
    return emptyBoard
  })
  const [score, setScore] = useState(0)
  const recordFromStorage = getRecordFromStorage()
  console.log({ recordFromStorage })
  const [record, setRecord] = useState(recordFromStorage || 0)

  useEffect(() => {
    const boardFromStorage = getBoardFromStorage()
    if (boardFromStorage) {
      setBoard(boardFromStorage)
    }
    const scoreFromStorage = getScoreFromStorage()
    if (scoreFromStorage) {
      setScore(scoreFromStorage)
    }
  }, [])

  const resetGame = () => {
    const emptyBoard = Array(16).fill(null)
    addNumbersToBoard(emptyBoard)
    setBoard(emptyBoard)
    setScore(0)
    resetGameStorage()
  }

  const handleScoreUpdate = (newScore) => {
    setScore(newScore)
    if (newScore > record) {
      setRecord(newScore)
      saveRecordToStorage(newScore)
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
            <div>Score</div>
            <div>{score}</div>
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
          score={score}
          handleScoreUpdate={handleScoreUpdate}
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
