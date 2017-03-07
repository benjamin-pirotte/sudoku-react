import * as React from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux'

// Redux
import {newSudoku, changeDifficulty, changeCellValue, giveHint} from '../Actions/Sudoku'
import Store from '../Stores/Store'

// Components
import SudokuTable from './SudokuTable'
import SudokuMenu from './SudokuMenu'
import SudokuDone from './SudokuDone'

// Interface
interface State {
  table: Array<number>
  initialTable: Array<number>
  errorTable: Array<boolean>
  difficulty: number,
  done: boolean
  hint: {
    index: number
    value: number
  }
}

// Component
class Sudoku extends React.Component<{}, State> {
  constructor(){
    super()

    const defaultState = Store.getState();

    this.state = defaultState.sudoku
  }

  componentWillMount() {
    Store.subscribe(() => {
      var state = Store.getState()
      this.setState(state.sudoku)
    })
  }

  // Cells action
  onCellChange = (event, index:number) => {
    let val = event.target.value
    if(val > 9 ) event.target.value = val.substring(val.length -1)
    if(isNaN(val) || val < 1 || !parseInt(event.target.value)) event.target.value = ''

    val = parseInt(val)

    Store.dispatch(changeCellValue(index, val))
  }

  onCellFocus = (event) => {
    event.target.value = ''
  }

  // Sudoku options
  reset = () => {
    Store.dispatch(newSudoku())
  }

  changeDifficulty = (difficulty:number) => {
    if(difficulty !== this.state.difficulty){
      Store.dispatch(changeDifficulty(difficulty))
    }
  }

  giveHint = () => {
    Store.dispatch(giveHint())
  } 

  render(){
    return (  
      <div style={style}>
        <div>
          <SudokuTable 
            table={this.state.table} 
            initialTable={this.state.initialTable} 
            errorTable={this.state.errorTable}
            hint={this.state.hint}
            onCellChange={this.onCellChange} 
            onCellFocus={this.onCellFocus} 
          />
          {this.state.done &&
            <SudokuDone reset={this.reset}/>
          }
        </div>
        <SudokuMenu reset={this.reset} changeDifficulty={this.changeDifficulty} giveHint={this.giveHint} difficulty={this.state.difficulty} />
      </div>
    )
  }
}

export default Sudoku

let style = {
  fontSize: 12,
  fontFamily: 'Arial, Helvetica, sans-serif',
}
