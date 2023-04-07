const generateNumber = () => {
  const number = Math.random()
  return number > 0.8 ? 4 : 2
}

export const addNumbersToBoard = (board) => {
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

export function checkGameOver (board) {
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
