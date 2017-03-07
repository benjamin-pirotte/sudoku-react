import SudokuHint from '../../Services/sudokuHint'
import SudokuTester from '../../Services/sudokuTester'
import SudokuGenerator from '../../Services/sudokuGenerator'



describe('sudoku tester', () => {
    let sudokuHint = new SudokuHint()
    let sudokuTester = new SudokuTester()
    let sudokuGenerator = new SudokuGenerator()

    it('should return a table with all solution', () => {
        sudokuGenerator.create()
        let sudoku = sudokuGenerator.get()

        let sudokuComplete =  sudokuGenerator.getComplete()
       
        sudokuHint.generateHints(sudoku)
        let solutionsArray = sudokuHint.getHints()
        
        expect(solutionsArray.length === 45).toBeTruthy()
    })

    it('should return a complete table', () => {
        sudokuGenerator.create()
        let sudoku = sudokuGenerator.get()

        let sudokuComplete =  sudokuGenerator.getComplete()
       
        sudokuHint.generateHints(sudoku)

        while(sudoku.indexOf(0) > -1){
          let hint = sudokuHint.getHint()
          if(hint.value) {
            expect(hint.value).toBeTruthy()  
            expect(sudoku[hint.index]).toEqual(0)  
            sudoku[hint.index] = hint.value
            expect(sudokuTester.testUnique(sudoku, hint.index)).toBeTruthy()
          } else {
            break
          }
        }
        expect(sudokuTester.test(sudoku).indexOf(false) === -1).toBeTruthy()
    })

    it('should return a complete table with random hint', () => {
        sudokuGenerator.create()
        let sudoku = sudokuGenerator.get()

        let sudokuComplete =  sudokuGenerator.getComplete()
       
        sudokuHint.generateHints(sudoku)

        while(sudoku.indexOf(0) > -1){
          let hint = sudokuHint.getRandomHint()
          if(hint.value) {
            expect(hint.value).toBeTruthy()  
            expect(sudoku[hint.index]).toEqual(0)  
            sudoku[hint.index] = hint.value
            expect(sudokuTester.testUnique(sudoku, hint.index)).toBeTruthy()
          } else {
            break
          }
        }
        expect(sudokuTester.test(sudoku).indexOf(false) === -1).toBeTruthy()
    })
});     


