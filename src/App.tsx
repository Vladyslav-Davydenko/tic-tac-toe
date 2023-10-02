import { useState } from 'react';
import './App.css';

interface SquareType {
  value: string,
  onSquareClick: React.MouseEventHandler<HTMLButtonElement>
}

interface BoardType {
  isXnext: boolean,
  onPlay: (x: string[]) => void,
  currentSquare: string[]
}

function calculateWiner(squares: string[]) {
  let winner = null
  const winOutcomes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  winOutcomes.forEach(winOutcome => {
    const [a, b, c] = winOutcome

    if(squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      winner = squares[a]
    }
  })
  return winner
}

function Square(props: SquareType) {
  const { value, onSquareClick } = props
  return (
    <button className='square' onClick={onSquareClick}>{value}</button>
  )
}

function Game() {
  const [history, setHistory] = useState<string[][]>([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState<number>(0)
  const isXnext = currentMove % 2 === 0;
  const currentSquare = history[currentMove]


  const handlePlay = (nextSquare: string[]) => { 
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquare]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  const jumpTo = (nextMove: number) => {
    setCurrentMove(nextMove)
  }

  const move = history.map((_, move) => {
    let description;
    if(move > 0) {
      description = `Go to move #${move}`
    }
    else{
      description = 'Go to game start'
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  })

  return (
    <div className="game">
      <div className="board">
          <Board isXnext={isXnext} onPlay={handlePlay} currentSquare={currentSquare}/>
      </div>
      <div className="history">
        <ol>
          {move}
        </ol>
      </div>
    </div>
  )
}

function Board(props: BoardType) {
  const {isXnext, onPlay, currentSquare} = props

  let status = ""
  const winner = calculateWiner(currentSquare)
  if(winner) status = `Winner is ${winner}`
  else status = `Next move for ${isXnext ? "X" : "O"}`


  const handleSquareClick = (i: number) => {
    if(currentSquare[i] || winner) return

    const newSquares = currentSquare.slice()

    if(isXnext) newSquares[i] = "X"
    else newSquares[i] = "O"

    onPlay(newSquares)
  }

  return (
    <>
      <h2>{status}</h2>
      <div className='row'>
      <Square value={currentSquare[0]} onSquareClick={() => handleSquareClick(0)}/>
      <Square value={currentSquare[1]} onSquareClick={() => handleSquareClick(1)}/>
      <Square value={currentSquare[2]} onSquareClick={() => handleSquareClick(2)}/>
      </div>
      <div className='row'>
      <Square value={currentSquare[3]} onSquareClick={() => handleSquareClick(3)}/>
      <Square value={currentSquare[4]} onSquareClick={() => handleSquareClick(4)}/>
      <Square value={currentSquare[5]} onSquareClick={() => handleSquareClick(5)}/>
      </div>
      <div className='row'> 
      <Square value={currentSquare[6]} onSquareClick={() => handleSquareClick(6)}/>
      <Square value={currentSquare[7]} onSquareClick={() => handleSquareClick(7)}/>
      <Square value={currentSquare[8]} onSquareClick={() => handleSquareClick(8)}/>
      </div>
      
    </>
  )
}

function App() {
  return (
    <div className="App">
      <h1>Tic-Tac-Toe Game</h1>
      <Game />
    </div>
  );
}

export default App;
