import * as React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from './Stores/Store'

import Sudoku from './Components/Sudoku'

render(
  <Provider store={store}>
    <div>
      <Sudoku />
    </div>
  </Provider>,
  document.getElementById('root')
);