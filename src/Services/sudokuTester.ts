export default class sudokuTester {
  testUnique(table:Array<number>, index:number, value?:number){
    let row = Math.floor(index / 9)
    let col = index % 9

    let val = value ? value : table[index]    

    for(let i = 0; i < 9; i++){
      let rowIndex = (row * 9) + i
      let colIndex = (i * 9) + col
      let squareIndex = ((Math.floor(i / 3) + Math.floor(row / 3) * 3) * 9) + (i % 3) + Math.floor(col / 3) * 3

      if(rowIndex !== index && table[rowIndex] === val) {
        return false
      }
      if(colIndex !== index && table[colIndex] === val) {
        return false
      }
      if(squareIndex !== index && table[squareIndex] === val) {
        return false
      }
    }

    return true
  }

  test(table:Array<number>){
    let errors = table.map((value, index) => {
      return this.testUnique(table, index)
    })
    return errors
  }
}
