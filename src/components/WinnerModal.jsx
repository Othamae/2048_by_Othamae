import { useState } from 'react'
import { Square } from './Square'

export function WinnerModal ({ isGameOver, resetGame }) {
  const [gameOver, setGameOver] = useState(isGameOver)
  if (gameOver === null) return null

  const winnerText = gameOver === true ? 'GAME OVER' : '2048!!'

  const finishMessage = gameOver ? '😖' : '😎'

  const continuePlaying = () => {
    setGameOver(null)
  }
  return (
    <>
      {gameOver && (
        <section className='winner'>
          <div className='text'>
            <h1>{winnerText}</h1>
            <header className='win'>
              {gameOver && <Square>{finishMessage}</Square>}
            </header>
            <footer>
              {gameOver
                ? <button onClick={resetGame}>Start again</button>
                : <button onClick={continuePlaying}>Continue with the game</button>}
            </footer>
          </div>
        </section>
      )}
    </>
  )
}
