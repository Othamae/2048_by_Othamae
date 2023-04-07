export const saveBoardToStorage = (board) => {
  window.localStorage.setItem('board', JSON.stringify(board))
}

export const saveScoreToStorage = (score) => {
  window.localStorage.setItem('score', score.toString())
}

export const saveRecordToStorage = (record) => {
  window.localStorage.setItem('record', record.toString())
}

export const getBoardFromStorage = () => {
  const savedBoard = window.localStorage.getItem('board')
  return savedBoard ? JSON.parse(savedBoard) : null
}

export const getScoreFromStorage = () => {
  const savedScore = window.localStorage.getItem('score')
  return savedScore ? parseInt(savedScore) : null
}

export const getRecordFromStorage = () => {
  const savedRecord = window.localStorage.getItem('record')
  return savedRecord ? parseInt(savedRecord) : null
}
export const resetGameStorage = () => {
  window.localStorage.removeItem('board')
  window.localStorage.removeItem('score')
}
