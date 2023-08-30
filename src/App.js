import React, { StrictMode, useState } from "react";

export default function Board() {

  const [xIsNext, setXIsNext] = useState(true); // 紀錄下一步的狀態 (true / false 代表 O 或 X)
  const [squares, setSquares] = useState(Array(9).fill(null)); // Board & Square 父子元件間的共用狀態變數、紀錄每個方塊的狀態


  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function handleClick(i) {              // Square button 執行 onClick onSquareClick 觸發 Board's handleClick      
    if (squares[i] || calculateWinner(squares)) { return; }        
                                                           
    const nextSquares = squares.slice(); // handleClick 為 Closure/ inner function，其中 nextSquares 為 private 變數
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);             // nextSquares 變數具有不可變特性 (Immutability) ，透過 squares.slice() 每次執行都複製一份
    setXIsNext(!xIsNext);
  }

  let boards = [];
  boards.push(<div className="status">{status}</div>)

  for(let i=1;i<10;i++){
    if (i % 3 === 0) {                    //  onSquareClick={handleClick(i)} 會當成一般變數，改成箭頭函式 onSquareClick={() => handleClick(0)} 才會執行
      boards.push(
      <div className="board-row"> 
        <Square value={squares[i]} onSquareClick={() => handleClick(i)}/>   
      </div>)
    } else {
      boards.push(<Square value={squares[i]} onSquareClick={() => handleClick(i)}/>)
    }
  }
  
  return (
    <>
    {boards}
    </>
  );
}

// Square 為 Board 中使用的元素 <Square> 注意首字母大寫
// 回傳 JSX (邏輯與 UI render 綁在一起)
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}


function calculateWinner(squares) {
  const lines = [   // 表示8條線
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) { // 單一線條中三個方塊值都一樣
      return squares[a];   // 回傳贏家 (X 或 O)
    }
  }
  return null;
}