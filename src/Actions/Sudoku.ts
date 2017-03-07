export const newSudoku = () => {
  return {
    type: 'NEW_SUDOKU'
  };
}

export const changeDifficulty = (difficulty:number) => {
  return {
    type: 'CHANGE_SUDOKU_DIFFICULTY',
    difficulty: difficulty
  };
}

export const changeCellValue = (index:number, value:number ) => {
  return {
    type: 'CHANGE_CELL_VALUE',
    value: value,
    index: index
  };
}

export const giveHint = () => {
  return {
    type: 'GIVE_HINT'
  };
}

