import * as React from 'react';
import {render} from 'react-dom';

// Components
import SudokuCell from './SudokuCell'

// Interfaces
interface Arguments {
  table: Array<number>
  initialTable: Array<number>
  errorTable: Array<boolean>
  hint: {
    index: number
    value: number
  }
  onCellChange: (event:React.FormEvent<HTMLInputElement>, index) => void
  onCellFocus: (event:React.FocusEvent<HTMLInputElement>) => void
}

// Component
let sudokuTable = ({table, initialTable, errorTable, hint, onCellChange, onCellFocus}:Arguments) => {
    const rowsTable:Array<Array<number>> = [] 
    for(let i = 0; i < 9; i++){ 
      rowsTable.push(table.slice(i * 9, i * 9 + 9))
    }
 
    const rows = rowsTable.map((row, rowIndex)  => {
      return (
        <tr key={rowIndex}>
            {
              row.map((value, index) => {
                let cellIndex = rowIndex * 9 + index
                return <td key={index}>
                          <SudokuCell 
                            value={value} 
                            error={(!errorTable[cellIndex] && value > 0)}
                            initialValue={initialTable[cellIndex]}
                            hint={hint}
                            index={cellIndex}
                            onCellChange={onCellChange} 
                            onCellFocus={onCellFocus} 
                          />
                        </td>
              })
            }
          </tr >
        )
    })

    return (
      <table style={tableStyle} cellPadding="0" cellSpacing="0">
        <tbody>
          {rows}
        </tbody>
      </table>
    )
}

export default sudokuTable

// Styles
const tableStyle = {
  border: '1px solid #ccc'
}
