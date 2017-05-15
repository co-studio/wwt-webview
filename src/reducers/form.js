import * as types from '../actions/types'

const initialState = {
  loading: true,
  incorporation: {
    companyName: '',
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  },
}

function form(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_FORM:
      const formFields = state[action.formName]
      formFields[action.key] = action.value
      state[action.formName] = { ...formFields }
      return { ...state }

    case types.GET_FORM:
      state.loading = true
      return { ...state }

    case types.GET_FORM_SUCCESS:
      const { formName } = action
      if (action.body) {
        state[formName] = action.body.fields
      }
      state.loading = false
      return { ...state }

    case types.GET_FORM_FAILURE:
      state.loading = false
      return { ...state }

    default: return state
  }
}

export default form
