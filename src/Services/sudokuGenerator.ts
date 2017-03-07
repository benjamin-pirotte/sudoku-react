

export default class sudokuGenerator { 
  matrix:Array<number> = new Array(81);
  mask:Array<number>

  level: 0

  private shuffleNumbers() {
		for(let i = 0; i < 41; i++) {
			let n1:number = Math.ceil(Math.random() * 9)
			let n2:number

      do {
        n2 = Math.ceil(Math.random() * 9)
      } while(n1 === n2)

      this.matrix.map((value, index) => {
        if (value === n1) {
          this.matrix[index] = n2
        } else if (value === n2) {
          this.matrix[index] = n1
        }
      })
		}
  }

  private swapCorrespondingColumns() {
    for(let i = 0; i < 42; i++) {
			let c1:number = Math.floor(Math.random() * 3)
			let c2:number

      do {
        c2 = Math.floor(Math.random() * 3) 
      } while(c1 === c2)
			
      for(var row = 0; row < 9; row++) {
				var tmp = this.matrix[row * 9 + (c1 * 3 + i % 3)];
				this.matrix[row * 9 + (c1 * 3 + i % 3)] = this.matrix[row * 9 + (c2 * 3 + i % 3)];
				this.matrix[row * 9 + (c2 * 3 + i % 3)] = tmp;
			}
    }
  }

  private swapSubsquaresColumns() {
    for(let i = 0; i < 42; i++) {
			let c1:number = Math.floor(Math.random() * 3)
			let c2:number

      do {
        c2 = Math.floor(Math.random() * 3) 
      } while(c1 === c2)
			
      for(var row = 0; row < 9; row++) {
        var tmp = this.matrix[row * 9 + (i % 3 * 3 + c1)];
        this.matrix[row * 9 + (i % 3 * 3 + c1)] = this.matrix[row * 9 + (i % 3 * 3 + c2)];
        this.matrix[row * 9 + (i % 3 * 3 + c2)] = tmp;
      }
    }
  }

  private swapSubsquaresRows(){
    for(let i = 0; i < 42; i++) {
			let r1:number = Math.floor(Math.random() * 3)
			let r2:number

      do {
        r2 = Math.floor(Math.random() * 3) 
      } while(r1 === r2)
			
			for(var col = 0; col < 9; col++)
			{
				var tmp = this.matrix[(i % 3 * 3 + r1) * 9 + col];
				this.matrix[(i % 3 * 3 + r1) * 9 + col] = this.matrix[(i % 3 * 3 + r2) * 9 + col];
				this.matrix[(i % 3 * 3 + r2) * 9 + col] = tmp;
			}
    }
  }

  createMask(level:number) {
    this.mask = this.matrix.slice()
    let hidden = 0

    for(let i = 0; i < 9; i++){
      for(let j = 0; j < 5; j++){
        let n
        let index 

        do {
          n = Math.floor(Math.random() * 9)
          index = (Math.floor(i / 3) * 3 + Math.floor(n / 3)) * 9 + (n % 3) + (i % 3) * 3 
        } while(this.mask[index] === 0)

        this.mask[index] = 0
        hidden++
      }
    }

    if(level > 1){
      let numberToHide = 36 - Math.ceil(36 * (1 - (level * 1.2) / 10))

      for (let i = 1; i <= numberToHide; i++) { 
        let index

        do {
          index = Math.floor(Math.random() * 81)
        } while(this.mask[index] === 0)

        this.mask[index] = 0
        
        hidden++
        if(hidden < 25) break
      }
    }
  }

  create(level:number = 1){
    // Create original sudoku model
		for (let i = 0; i < 9; i++){
      	for (let j = 0; j < 9; j++){
        	this.matrix[i * 9 + j] = (i * 3 + Math.floor(i/3) + j) % 9 + 1
        }
    }
    
    this.shuffleNumbers()
    this.swapCorrespondingColumns()
    this.swapSubsquaresColumns()
    this.swapSubsquaresRows()

    this.createMask(level)
  }

  getComplete(){
    return this.matrix
  }


  get(){
    return this.mask
  }

}