import SudokuGenerator from '../Services/sudokuGenerator'
import SudokuTester from '../Services/sudokuTester'
import SudokuHint from '../Services/sudokuHint'

export type State = {
  table: Array<number>
  initialTable: Array<number>
  errorTable: Array<boolean>
  difficulty: number,
  done: boolean
  hint: {
    value: number
    index: number
  }
}

const sudokuTester = new SudokuTester()
const sudokuHint = new SudokuHint()
const sudokuGenerator = new SudokuGenerator()

let defaultState:State = {
  table: new Array(81),
  initialTable: new Array(81),
  errorTable: new Array(81).fill(true),
  difficulty: 1,
  done:false,
  hint: {
    value: null,
    index: null
  }
}

sudokuGenerator.create(defaultState.difficulty)
defaultState.table = sudokuGenerator.get()
defaultState.initialTable = defaultState.table.slice()

let newState:State
let confirmation:boolean = true


export const sudokuReducer = (state = defaultState, action) => {
   function createNewSudoku(){
      sudokuGenerator.create(defaultState.difficulty)

      newState.table = sudokuGenerator.get()
      newState.initialTable = newState.table.slice()
      newState.hint = {
        value: null,
        index: null
      }
      newState.errorTable = new Array(81).fill(true)
  }

  switch (action.type) {
    case 'NEW_SUDOKU':
      newState = Object.assign({}, state)
      
      createNewSudoku()

      return newState
    case 'CHANGE_SUDOKU_DIFFICULTY':
      newState = Object.assign({}, state)

      newState.difficulty = action.difficulty

      createNewSudoku()

      return newState;
    case 'CHANGE_CELL_VALUE': 
      newState = Object.assign({}, state)

      newState.table[action.index] = action.value

      const isValid = sudokuTester.testUnique(newState.table, action.index)
      newState.errorTable[action.index] = isValid

      if(newState.table.indexOf(0) < 0 
      && newState.errorTable.indexOf(false) < 0){
        newState.done = true
      } else {
        newState.done = false
      }

      return newState;
    case 'GIVE_HINT':
      newState = Object.assign({}, state)
      
      function getHint(){
        sudokuHint.generateHints(state.initialTable)
        let hint = sudokuHint.getRandomHint()
        if(hint.value === newState.table[hint.index]) {
          getHint()
        } else {
          newState.hint = hint
        }
      }

      getHint()

      return newState
    default:
      return state
  }
}

