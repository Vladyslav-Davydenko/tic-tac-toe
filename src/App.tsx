import { useState } from 'react';
import './App.css';

interface SquareType {
  value: string
  onSquareClick: React.MouseEventHandler<HTMLButtonElement>
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

function Board() {
  const [squares, setSquares] = useState<string[]>(Array(9).fill(null))
  const [isXnext, setIsXnext] = useState(true)

  let status = ""
  const winner = calculateWiner(squares)
  if(winner) status = `Winner is ${winner}`
  else status = `Next move for ${isXnext ? "X" : "O"}`


  const handleSquareClick = (i: number) => {
    if(squares[i] || winner) return

    const newSquares = squares.slice()

    if(isXnext) newSquares[i] = "X"
    else newSquares[i] = "O"

    setSquares(newSquares)
    setIsXnext(!isXnext)
  }

  return (
    <>
      <h2>{status}</h2>
      <div className='row'>
      <Square value={squares[0]} onSquareClick={() => handleSquareClick(0)}/>
      <Square value={squares[1]} onSquareClick={() => handleSquareClick(1)}/>
      <Square value={squares[2]} onSquareClick={() => handleSquareClick(2)}/>
      </div>
      <div className='row'>
      <Square value={squares[3]} onSquareClick={() => handleSquareClick(3)}/>
      <Square value={squares[4]} onSquareClick={() => handleSquareClick(4)}/>
      <Square value={squares[5]} onSquareClick={() => handleSquareClick(5)}/>
      </div>
      <div className='row'> 
      <Square value={squares[6]} onSquareClick={() => handleSquareClick(6)}/>
      <Square value={squares[7]} onSquareClick={() => handleSquareClick(7)}/>
      <Square value={squares[8]} onSquareClick={() => handleSquareClick(8)}/>
      </div>
      
    </>
  )
}

function App() {
  return (
    <div className="App">
      <h1>Tic-Tac-Toe Game</h1>
      <Board />
    </div>
  );
}

export default App;
