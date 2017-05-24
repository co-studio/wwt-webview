import * as types from '../actions/types'

const initialState = {
  mid: null,

  session: {
    days: 0,
    hours: 0
  },

  err: null,
  loading: false,
}

function user(state = initialState, action) {
  switch (action.type) {
    case types.INIT_USER:
      state.mid = action.mid
      state.err = action.err
      return { ...state }

    case types.SCHEDULE_SESSION:
      state.loading = true
      return { ...state }

    case types.SCHEDULE_SESSION_SUCCESS:
      state.session = initialState.session
      state.loading = false
      return { ...state }

    case types.SCHEDULE_SESSION_FAILURE:
      state.err = action.err
      state.loading = false
      return { ...state }

    default: return state
  }
}

export default user
