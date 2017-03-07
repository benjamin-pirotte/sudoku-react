import SudokuGenerator from '../../Services/sudokuGenerator'

describe('sudoku generator', () => {
    const generator = new SudokuGenerator() 

    it('should create a 81 values table', () => {
        generator.create()
        let sudoku = generator.getComplete()
        expect(sudoku.length).toEqual(81)    
    }); 

    it('should have unique rows', () => { 
        generator.create()
        let sudoku = generator.getComplete()
        let rows = new Array(9)
        for(let i = 0; i < 9; i++){
            rows[i] = sudoku.slice(i * 9, i * 9 + 8)
        }
 
        rows.forEach(rowToTest => {
            let filter = rows.filter(row => {
                return row.toString() === rowToTest.toString()  
            })
            expect(filter.length).toEqual(1)
        })
    }); 

    it('should have uniques cols', () => { 
        generator.create()
        let sudoku = generator.getComplete()
        let cols = new Array(9)
        for(let i = 0; i < 9; i++){
            cols[i] = []
        } 

        for(let i = 0; i < 9; i++){
            for(let j = 0; j < 9; j++){
                cols[j].push(sudoku[i * 9 + j])
            }
        }
 
        cols.forEach(colToTest => {
            let filter = cols.filter(col => {
                return col.toString() === colToTest.toString()  
            })
            expect(filter.length).toEqual(1)
        })
    });

    it('should have unique subsquares', () => { 
        generator.create()
        let sudoku = generator.getComplete()
        let subsquares = new Array(9)
        for(let i = 0; i < 9; i++){
            subsquares[i] = []
        }

        for(let i = 0; i < 9; i++){
            for(let j = 0; j < 9; j++){
                subsquares[Math.floor((i) / 3) * 3 + Math.floor((j) / 3)].push(sudoku[i * 9 + j])
            }
        }

        subsquares.forEach(squareToTest => {
            let filter = subsquares.filter(square => {
                return square.toString() === squareToTest.toString()  
            })
            expect(filter.length).toEqual(1)
        })
    }); 

    it('should have 45 empty values to be completed (lvl1)', () => {
        generator.create()
        let sudoku = generator.get()
        let filter = sudoku.filter(value => {
            return value === 0
        })
        expect(filter.length).toEqual(45)
    })

    it('should have 45 empty values to be completed (lvl2)', () => {
        generator.create()
        generator.createMask(2)
        let sudoku = generator.get()
        let filter = sudoku.filter(value => {
            return value === 0
        })
        expect(filter.length).toBeGreaterThan(45)
    })

    it('should have 45 empty values to be completed (lvl1)', () => {
        generator.create()
        let sudoku = generator.get()
        let filter = sudoku.filter(value => {
            return value === 0
        })
        expect(filter.length).toEqual(45)
    })
});     