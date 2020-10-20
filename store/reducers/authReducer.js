import { AUTHENTICATE } from '../actions/authActions'

const initialState = {
  token: null,
  userId: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
      }
    default:
      return state
  }
}
