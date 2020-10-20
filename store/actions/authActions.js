export const SIGNUP = 'SIGNUP'
export const LOGIN = 'LOGIN'

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
  console.log(data)

  dispatch({ type: SIGNUP })
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
  console.log(data)

  dispatch({ type: LOGIN })
}
