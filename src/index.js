import React from 'react'
import ReactDom from 'react-dom'
import './styles.css'
import { useState } from 'react'

const Cell = function (props) {
  return (
    <div className="cell" onClick={props.onClick}>
      {props.text}
    </div>
  )
}

const ChessBoard = () => {
  const [n, setN] = useState(0)
  const [finished, setFinished] = useState(false)
  const [cells, setCells] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ])
  const checkEnd = (copy) => {
    console.log('"bingo":', 'bingo')
    for (let i = 0; i < 3; i++) {
      if (copy[i][0] === copy[i][1] && copy[i][1] === copy[i][2] && copy[i][0] !== null) {
        console.log(`${copy[i][0]}胜利`)
        setFinished(true)
        return
      }
    }
    for (let i = 0; i < 3; i++) {
      if (copy[0][i] === copy[1][i] && copy[1][i] === copy[2][i] && copy[0][i] !== null) {
        console.log(`${copy[0][i]}胜利`)
        setFinished(true)
        return
      }
    }
    if (copy[0][0] === copy[1][1] && copy[1][1] === copy[2][2] && copy[0][0] !== null) {
      console.log(`${copy[0][0]}胜利`)
      setFinished(true)
      return
    }
    if (copy[2][0] === copy[1][1] && copy[1][1] === copy[0][2] && copy[1][1] !== null) {
      console.log(`${copy[1][1]}胜利`)
      setFinished(true)
      return
    }
  }
  const clickEvents = (row, col) => {
    console.log('111:', 111)
    const copy = JSON.parse(JSON.stringify(cells))
    copy[row][col] = n % 2 === 0 ? 'x' : 'o'
    setN(n + 1)
    setCells(copy)
    checkEnd(copy)
  }
  return (
    <div>
      {cells.map((items, row) => (
        <div className="row" key={'' + Math.random() * row * 100}>
          {items.map((item, col) => (
            <div className="col" key={'' + Math.random() * col * 100}>
              <Cell text={item} onClick={() => clickEvents(row, col)} />
            </div>
          ))}
        </div>
      ))}
      <div>{finished && <h2 className="gameOver">游戏结束</h2>}</div>
    </div>
  )
}

ReactDom.render(
  <div>
    <ChessBoard />
  </div>,
  document.getElementById('root')
)
