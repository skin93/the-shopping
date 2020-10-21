import { AUTHENTICATE, LOGOUT } from '../actions/authActions'

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
    case LOGOUT:
      return initialState
    default:
      return state
  }
}
