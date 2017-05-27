import * as types from '../actions/types'

const initialState = {
  mid: null,

  schedule: {
    timePeriods: [
      // example:
      // { day: 2, start: 8, end: 16 },
    ],
    session: {
      days: 0,
      hours: 0
    },
  },

  err: null,
  loading: false,
}

function user(state = initialState, action) {
  switch (action.type) {
    case types.INIT_USER:
    case types.SCHEDULE_SESSION:
    case types.SCHEDULE_TIMEPERIOD:
    case types.REMOVE_TIMEPERIOD:
      state.loading = true
      return { ...state }

    case types.INIT_USER_SUCCESS:
      state.schedule = action.res.schedule
      state.mid = action.mid
      state.loading = false
      return { ...state }

    case types.SCHEDULE_SESSION_SUCCESS:
      state.schedule.session = initialState.schedule.session
      state.loading = false
      return { ...state }

    case types.SCHEDULE_TIMEPERIOD_SUCCESS:
      state.loading = false
      return  { ...state }

    case types.REMOVE_TIMEPERIOD_SUCCESS:
      state.schedule.timePeriods = state.schedule.timePeriods.filter(
        time => (time.day !== action.day ||
                 time.start !== action.start ||
                 time.end !== action.end)
      )
      state.loading = false
      return { ...state }

    case types.INIT_USER_FAILURE:
    case types.SCHEDULE_SESSION_FAILURE:
    case types.SCHEDULE_TIMEPERIOD_FAILURE:
    case types.REMOVE_TIMEPERIOD_FAILURE:
      state.err = action.err
      state.loading = false
      return { ...state }

    default: return state
  }
}

export default user
