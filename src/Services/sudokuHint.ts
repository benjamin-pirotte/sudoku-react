interface Hint {
    value: number
    index: number
}

export default class sudokuHint {
  table:Array<Number>
  emptyCells:Array<Hint>

  private check(cell:Hint){
      let row = Math.floor(cell.index / 9)
      let col = cell.index  % 9

      for (var i = 0; i < 9; i++) {
          let rowIndex = (row * 9) + i
          let colIndex = col + (i * 9)
          let squareIndex = ((Math.floor(i / 3) + Math.floor(row / 3) * 3) * 9) + (i % 3) + Math.floor(col / 3) * 3

          if (cell.value == this.table[rowIndex] ||
              cell.value == this.table[colIndex] ||
              cell.value == this.table[squareIndex])
              return false
      }

      return true
  }

  private solve() {
    for(let i = 0; i < this.emptyCells.length;) {
      let cell = this.emptyCells[i]

      let solved = false

      let val:number = cell.value ? cell.value + 1 : 1
      while(!solved && val <= 9) {
        cell.value = val
        if(this.check(cell)){
          solved = true
          this.emptyCells[i]['value'] = val
          this.table[cell.index] = cell.value
          i++
        } else {
          val++
        }
      }

     if(!solved){
          this.emptyCells[i]['value'] = 0
          this.table[cell.index] = 0
          i--
      }
      
      if(i < 0){
        return false
      } else if(i >= this.emptyCells.length) {
        return true
      }
    }
  }

  generateHints(table:Array<Number>){
    this.table = table.slice()
    this.emptyCells = []

    this.table.forEach((value, index) => {
      if(value === 0){
        this.emptyCells.push({
            value: null,
            index: index
        })
      }
    })

    this.solve()
  }

  getHints(){
    return this.emptyCells
  }

  getHint(){
   let hint = this.emptyCells.length ? this.emptyCells[0] : {value:null, index:null}
   this.emptyCells.splice(0,1)
   return hint
  }

  getRandomHint(){
    let randomIndex = Math.floor(Math.random() * this.emptyCells.length)
    let hint = this.emptyCells.length ? this.emptyCells[randomIndex] : {value:null, index:null}
    this.emptyCells.splice(randomIndex,1)
    return hint
  }
}
