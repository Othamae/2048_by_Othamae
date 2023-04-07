import { Square } from './Square'

export function WinnerModal ({ checkGameOver, resetGame, continuePlaying }) {
  if (checkGameOver === null) return null

  const winnerText = checkGameOver === true ? 'GAME OVER' : '2048!!'

  const finishMessage = checkGameOver ? '😖' : '😎'
  return (
    <>
      {checkGameOver && (
        <section className='winner'>
          <div className='text'>
            <h1>{winnerText}</h1>
            <header className='win'>
              {checkGameOver && <Square>{finishMessage}</Square>}
            </header>
            <footer>
              {checkGameOver
                ? <button onClick={resetGame}>Start again</button>
                : <button onClick={continuePlaying}>Continue with the game</button>}
            </footer>
          </div>
        </section>
      )}
    </>
  )
}
