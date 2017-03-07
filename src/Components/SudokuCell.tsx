import * as React from 'react';
import {render, findDOMNode} from 'react-dom';

// Interface
interface Arguments {
  value: number
  initialValue: number
  error: boolean
  hint: {
    index: number
    value: number
  }
  index: number
  onCellChange: (event:React.FormEvent<HTMLInputElement>, index) => void
  onCellFocus: (event:React.FocusEvent<HTMLInputElement>) => void
}

// Components
let sudokuCell = ({value, initialValue, error, hint, index, onCellChange, onCellFocus}:Arguments) => {
    const cell = () => {
      return <input disabled={initialValue > 0} style={inputStyle(index, value, initialValue, error, hint)} type="text" value={value ? value : ''} onFocus={(event) => onCellFocus(event)} onChange={(event) => onCellChange(event, index)} />
    }

    if(hint.index === index){
      setTimeout(() => {
        document.getElementsByTagName('input')[index].focus()
      })
    }

    return (
      <div style={cellStyle(index)}>
        {cell()}
      </div>
    )
}

export default sudokuCell

// Styles
const cellStyle = (index) => {
  let style = {
    display: 'block',
    height: 50,
    width: 50,
    lineHeight: '50px',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Arial, Helvetica, sans-serif',
    border: '1px solid #ddd',
  }

  if((Math.floor(index / 9)) % 3 === 0 && index > 8){
    style = Object.assign({}, style, {
      borderTopColor: '#000'
    })
  }

  if((Math.floor(index / 9) + 1) % 3 === 0 && Math.floor(index / 9) + 1 < 9){
    style = Object.assign({}, style, {
      borderBottomColor: '#000'
    })
  }

  if((index % 3) === 0 && (index % 9) !== 0){
    style = Object.assign({}, style, {
      borderLeftColor: '#000'
    })
  }

  if(((index + 1) % 3) === 0 && ((index + 1) % 9) !== 0){
    style = Object.assign({}, style, {
      borderRightColor: '#000'
    })
  }


  return style
}

const inputStyle = (index, value, initialValue, error, hint) => {
  let backgroundColor = '#fff'

  if (hint.index === index && !value) {
    backgroundColor = '#ccc'
  } else if(error || (hint.index === index && value !== hint.value)){
    backgroundColor = '#fd3c6e'
  } else if (initialValue){
    backgroundColor = '#eee'
  }

  let style = {
    display: 'block',
    height: '50px',
    width: '50px',
    textAlign: 'center',
    border: 0,
    backgroundColor: backgroundColor,
    padding: 0,
    fontSize: 18
  }

  return style
}