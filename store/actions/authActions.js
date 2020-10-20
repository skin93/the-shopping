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
    throw new Error('Something went wrong!')
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
    throw new Error('Something went wrong!')
  }

  const data = await res.json()
  console.log(data)

  dispatch({ type: LOGIN })
}
