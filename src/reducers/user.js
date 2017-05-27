import * as types from '../actions/types'

const initialState = {
  mid: null,

  schedule: {
    timePeriods: [
      // example:
      { day: 2, start: 11, end: 20 },
      { day: 3, start: 8, end: 13 },
      { day: 4, start: 12, end: 24 },
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
      state.mid = action.mid
      state.err = action.err
      return { ...state }

    case types.SCHEDULE_SESSION:
    case types.SCHEDULE_TIMEPERIOD:
    case types.REMOVE_TIMEPERIOD:
      state.loading = true
      return { ...state }

    case types.SCHEDULE_SESSION_SUCCESS:
      state.schedule.session = initialState.schedule.session
      state.loading = false
      return { ...state }

    case types.SCHEDULE_TIMEPERIOD_SUCCESS:
      state.loading = false
      return  { ...state }

    case types.REMOVE_TIMEPERIOD_SUCCESS:
      console.log(action)
      state.schedule.timePeriods = state.schedule.timePeriods.filter(
        time => (time.day !== action.day ||
                 time.start !== action.start ||
                 time.end !== action.end)
      )
      state.loading = false
      return { ...state }

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
