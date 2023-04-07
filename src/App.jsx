import { useState, useEffect } from 'react'
import './App.css'
import { Board } from './components/Board'
import { WinnerModal } from './components/WinnerModal'

const generateNumber = () => {
  const number = Math.random()
  return number > 0.7 ? 4 : 2
}

// const addNumberToBoard = (board) => {
//   if (board.indexOf(null) === -1) {
//     return
//   }
//   let number = Math.floor(Math.random() * 16)
//   while (board[number] !== null) {
//     number = Math.floor(Math.random() * 16)
//   }
//   board[number] = generateNumber()
// }

const addNumbersToBoard = (board) => {
  if (board.indexOf(null) === -1) {
    return
  }
  let first = Math.floor(Math.random() * 16)
  while (board[first] !== null) {
    first = Math.floor(Math.random() * 16)
  }
  board[first] = generateNumber()
  if (board.indexOf(null) === -1) {
    return
  }
  let second = Math.floor(Math.random() * 16)
  while (board[second] !== null) {
    second = Math.floor(Math.random() * 16)
  }
  board[second] = generateNumber()
}

function checkGameOver (board) {
  // Checking if there are empty squares
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      return null
    }
  }
  // Checking if the maximum value is 2048
  if (Math.max(...board) === 2048) {
    return true
  }
  // Checking if there are squares with same value that could be merged
  for (let i = 0; i < board.length; i++) {
    // Checking to the left
    if (i % 4 !== 0 && board[i] === board[i - 1]) {
      return false
    }
    // Checking to the right
    if (i % 4 !== 3 && board[i] === board[i + 1]) {
      return false
    }
    // Checking up
    if (i >= 4 && board[i] === board[i - 4]) {
      return false
    }
    // Checking down
    if (i < 12 && board[i] === board[i + 4]) {
      return false
    }
  }
  return true
}

function continuePlaying () {

}

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
  const handleRight = () => {
    const newBoard = board.slice()
    for (let i = 0; i < 16; i += 4) {
      const row = newBoard.slice(i, i + 4)
      const newRow = row.filter(a => a !== null)

      for (let j = newRow.length - 1; j > 0; j--) {
        if (newRow[j] === newRow[j - 1]) {
          newRow[j] *= 2
          const newPoints = points + newRow[j]
          // setPoints(newPoints)
          handlePointsUpdate(newPoints)
          newRow[j - 1] = null
        }
      }
      const mergedRow = newRow.filter(a => a !== null)
      const empty = row.length - mergedRow.length
      mergedRow.unshift(...Array(empty).fill(null))
      newBoard.splice(i, 4, ...mergedRow)
    }
    addNumbersToBoard(newBoard)
    setBoard([...newBoard])
  }

  const handleLeft = () => {
    const newBoard = board.slice()
    for (let i = 0; i < 16; i += 4) {
      const row = newBoard.slice(i, i + 4)
      const newRow = row.filter(a => a !== null)

      for (let j = 0; j < newRow.length - 1; j++) {
        if (newRow[j] === newRow[j + 1]) {
          newRow[j] *= 2
          const newPoints = points + newRow[j]
          // setPoints(newPoints)
          handlePointsUpdate(newPoints)
          newRow[j + 1] = null
        }
      }
      const mergedRow = newRow.filter(a => a !== null)
      const empty = row.length - mergedRow.length
      mergedRow.push(...Array(empty).fill(null))
      newBoard.splice(i, 4, ...mergedRow)
    }
    addNumbersToBoard(newBoard)
    setBoard([...newBoard])
  }

  const handleUp = () => {
    const newBoard = board.slice()
    for (let i = 0; i < 4; i++) {
      const col = [newBoard[i], newBoard[i + 4], newBoard[i + 8], newBoard[i + 12]]
      const newCol = col.filter(a => a !== null)

      for (let j = 0; j < newCol.length - 1; j++) {
        if (newCol[j] === newCol[j + 1]) {
          newCol[j] *= 2
          const newPoints = points + newCol[j]
          // setPoints(newPoints)
          handlePointsUpdate(newPoints)
          newCol[j + 1] = null
        }
      }
      const mergedCol = newCol.filter(a => a !== null)
      const empty = col.length - mergedCol.length
      mergedCol.push(...Array(empty).fill(null))
      newBoard[i] = mergedCol[0]
      newBoard[i + 4] = mergedCol[1]
      newBoard[i + 8] = mergedCol[2]
      newBoard[i + 12] = mergedCol[3]
    }
    addNumbersToBoard(newBoard)
    setBoard([...newBoard])
  }

  const handleDown = () => {
    const newBoard = board.slice()
    for (let i = 0; i < 4; i++) {
      const col = [newBoard[i], newBoard[i + 4], newBoard[i + 8], newBoard[i + 12]]
      const newCol = col.filter(a => a !== null)
      console.log({ newCol })
      for (let j = newCol.length - 1; j > 0; j--) {
        if (newCol[j] === newCol[j - 1]) {
          newCol[j] *= 2
          const newPoints = points + newCol[j]
          // setPoints(newPoints)
          handlePointsUpdate(newPoints)
          newCol[j - 1] = null
        }
        console.log('Despues: ', { newCol })
      }
      const mergedCol = newCol.filter(a => a !== null)
      const empty = col.length - mergedCol.length
      mergedCol.unshift(...Array(empty).fill(null))
      newBoard[i] = mergedCol[0]
      newBoard[i + 4] = mergedCol[1]
      newBoard[i + 8] = mergedCol[2]
      newBoard[i + 12] = mergedCol[3]
      console.log('newBoard[i]: ', newBoard[i])
      console.log('newBoard[i+ 4]: ', newBoard[i + 4])
      console.log('newBoard[i+ 8]: ', newBoard[i + 8])
      console.log('newBoard[i+ 12]: ', newBoard[i + 12])
    }
    addNumbersToBoard(newBoard)
    setBoard([...newBoard])
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
        <div>
          <section className='turn'>
            <button onClick={handleUp}>UP</button>
          </section>
          <section className='turn'>
            <button onClick={handleLeft}>LEFT</button>
            <button onClick={handleRight}>RIGHT</button>
          </section>
          <section className='turn'>
            <button onClick={handleDown}>DOWN</button>
          </section>
        </div>
        <div>
          {(isGameOver === true || (isGameOver && Math.max(...board) === 2048)) && (
            <WinnerModal checkGameOver={isGameOver} resetGame={resetGame} continuePlaying={continuePlaying} />
          )}
        </div>
      </main>
    </>
  )
}

export default App
