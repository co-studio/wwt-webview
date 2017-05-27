import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'

import rootReducer from '../reducers'
console.log(browserHistory)
export default (initialState) =>
  createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      thunk,
      logger,
      routerMiddleware(browserHistory)
    ),
  )
