import { addNumbersToBoard } from '../logic/board'

export function Controller ({ board, setBoard, handlePointsUpdate, points }) {
  const handleRight = () => {
    const newBoard = board.slice()
    for (let i = 0; i < 16; i += 4) {
      const row = newBoard.slice(i, i + 4)
      const newRow = row.filter(a => a !== null)

      for (let j = newRow.length - 1; j > 0; j--) {
        if (newRow[j] === newRow[j - 1]) {
          newRow[j] *= 2
          const newPoints = points + newRow[j]
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
    }
    addNumbersToBoard(newBoard)
    setBoard([...newBoard])
  }

  return (
    <>

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

    </>
  )
}
