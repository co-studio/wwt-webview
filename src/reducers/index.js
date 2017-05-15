import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import user from './user'
import form from './form'

const rootReducer = combineReducers({
  user,
  form,
  routing: routerReducer
})

export default rootReducer
