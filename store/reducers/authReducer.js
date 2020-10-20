import { LOGIN, SIGNUP } from '../actions/authActions'

const initialState = {
  token: null,
  userId: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
      }
    case SIGNUP:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
      }
    default:
      return state
  }
}
