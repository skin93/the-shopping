import AsyncStorage from '@react-native-community/async-storage'

// export const SIGNUP = 'SIGNUP'
// export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const AUTHENTICATE = 'AUTHENTICATE'

let timer

export const authenticate = (userId, token, expiryTime) => async (dispatch) => {
  dispatch(setLogoutTimer(expiryTime))
  dispatch({ type: AUTHENTICATE, payload: { userId, token } })
}

export const signup = (email, password) => async (dispatch) => {
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCgqW1SQ-eNkX6mGvQxeJJbJ8ECrWvrstk
    `,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    }
  )

  if (!res.ok) {
    const errorResponse = await res.json()
    const errorId = errorResponse.error.message
    let message = 'Something went wrong!'
    if (errorId === 'EMAIL_EXISTS') {
      message = 'This email exists already!'
    }
    throw new Error(message)
  }

  const data = await res.json()

  dispatch(
    authenticate(data.localId, data.idToken, parseInt(data.expiresIn) * 1000)
  )
  const expirationDate = new Date(
    new Date().getTime() + parseInt(data.expiresIn) * 1000
  )
  saveDataToStorage(data.idToken, data.localId, expirationDate)
}

export const login = (email, password) => async (dispatch) => {
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCgqW1SQ-eNkX6mGvQxeJJbJ8ECrWvrstk

      `,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    }
  )

  if (!res.ok) {
    const errorResponse = await res.json()
    const errorId = errorResponse.error.message
    let message = 'Something went wrong!'
    if (errorId === 'EMAIL_NOT_FOUND') {
      message = 'This email could not be found!'
    } else if (errorId === 'INVALID_PASSWORD') {
      message = 'This password is not valid!'
    }
    throw new Error(message)
  }

  const data = await res.json()

  dispatch(
    authenticate(data.localId, data.idToken, parseInt(data.expiresIn) * 1000)
  )
  const expirationDate = new Date(
    new Date().getTime() + parseInt(data.expiresIn) * 1000
  )

  saveDataToStorage(data.idToken, data.localId, expirationDate)
}

export const logout = () => async (dispatch) => {
  clearLogoutTimer()
  AsyncStorage.removeItem('userData')
  dispatch({ type: LOGOUT })
}

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer)
  }
}

const setLogoutTimer = (expirationTime) => async (dispatch) => {
  timer = setTimeout(() => {
    dispatch(logout())
  }, expirationTime)
}

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token,
      userId,
      expiryDate: expirationDate,
    })
  )
}
