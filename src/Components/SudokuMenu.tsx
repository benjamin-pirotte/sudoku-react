import * as React from 'react';
import {render} from 'react-dom';

// Interfaces
interface Arguments {
  difficulty: number
  reset: Function 
  changeDifficulty: Function
  giveHint:Function
}

// Const
const difficulties = ['easy', 'normal', 'hard', 'expert']

// Component
let sudokuMenu = ({difficulty, reset, changeDifficulty, giveHint}:Arguments) => {
    const difficultiesButton = difficulties.map((label, index) => {
      return (
        <input key={index} style={levelButtonStyle(index, difficulty)} type="submit" value={label} onClick={() => changeDifficulty(index + 1)} />
      )
    })

    return (
      <div style={{marginTop: 20}}>
        <input type="submit" value="New" onClick={() => reset()} /> - 
        <input type="submit" value="Hint" onClick={() => giveHint()} /> - 
        levels : {difficultiesButton}
      </div>
    )
}

// Export
export default sudokuMenu

// Style
const levelButtonStyle = (index:number, difficulty:number) => {
  let style = {
    background: '#ddd',
    color: '#fff',
    border: '1px solid #ddd'
  }

  if(difficulty - 1 === index){
    style.background = "#0ad2e1"
  }

  return style
}