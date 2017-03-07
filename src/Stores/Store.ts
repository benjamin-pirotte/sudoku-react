import { createStore, combineReducers, applyMiddleware  } from 'redux';

import * as sudoku from '../Reducers/Sudoku'

export interface IStoreState {
  sudoku: sudoku.State
}

let store =  createStore(
  combineReducers<IStoreState>({
    sudoku: sudoku.sudokuReducer
  }), applyMiddleware(
  )
);



export default store