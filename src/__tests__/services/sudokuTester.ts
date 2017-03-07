import SudokuTester from '../../Services/sudokuTester'
import SudokuGenerator from '../../Services/sudokuGenerator'

describe('sudoku tester', () => {
    let sudokuGenerator = new SudokuGenerator()
    let sudokuTester = new SudokuTester()
    const sudoku = []
		for (let i = 0; i < 9; i++){
      	for (let j = 0; j < 9; j++){
        	sudoku[i * 9 + j] = (i * 3 + Math.floor(i/3) + j) % 9 + 1
        }
    }

    it('should test one value in the table', () => {
        let sudokuCopy = sudoku.slice()
        let error = sudokuTester.testUnique(sudokuCopy, 10)
        expect(error).toBeTruthy()    
    })

    it('should test one value in the table', () => {
        let sudokuCopy = sudoku.slice()
        sudokuCopy[80] = 2
        let error = sudokuTester.testUnique(sudokuCopy, 80)
        expect(error).toBeFalsy()  
    })

    it('should test the whole table', () => {
        let sudokuCopy = sudoku.slice()
        let errorsList = sudokuTester.test(sudokuCopy)
        let isValid = errorsList.indexOf(false) === -1
        expect(isValid).toBeTruthy()
    })

    it('should test the whole table', () => {
       let sudokuCopy = sudoku.slice()
        sudokuCopy[10] = 2
        let errorsList = sudokuTester.test(sudokuCopy)
        let isValid = errorsList.indexOf(false) === -1
        expect(isValid).toBeFalsy()  
    })
});     