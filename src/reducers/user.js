import * as types from '../actions/types'

const initialState = {
  mid: null,
  err: null
}

function user(state = initialState, action) {
  switch (action.type) {
    case types.INIT_USER:
      return { mid: action.mid, err: action.err }

    default: return state
  }
}

export default user
