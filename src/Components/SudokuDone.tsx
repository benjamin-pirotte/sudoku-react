import * as React from 'react';
import {render} from 'react-dom';

// Interface
interface Arguments {
  reset: Function
}

// Component
let sudokuDone = ({reset}:Arguments) => {
    return (
      <div style={style}>
        Congratulation !  
        <input type="submit" value="Start a new sudoku" onClick={() => reset()} />
      </div>
    )
}

export default sudokuDone

let style = {
  background: "rgba(98, 255, 120, 0.5)",
  padding: '20px',
  margin: '20px 0'
}