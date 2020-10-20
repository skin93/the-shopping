import Order from '../../models/order'

export const ADD_ORDER = 'ADD_ORDER'
export const SET_ORDERS = 'SET_ORDERS'

export const fetchOrders = () => async (dispatch) => {
  const res = await fetch(
    'https://the-shopping-6e1ce.firebaseio.com/orders/u1.json'
  )

  if (!res.ok) {
    throw new Error('Something went wrong!')
  }

  const data = await res.json()
  const loadedOrders = []

  for (const key in data) {
    loadedOrders.push(
      new Order(
        key,
        data[key].cartItems,
        data[key].totalAmount,
        new Date(data[key].date)
      )
    )
  }

  dispatch({
    type: SET_ORDERS,
    payload: loadedOrders,
  })
}

export const addOrder = (cartItems, totalAmount) => async (
  dispatch,
  getState
) => {
  const token = getState().auth.token
  const date = new Date()
  const res = await fetch(
    `https://the-shopping-6e1ce.firebaseio.com/orders/u1.json?auth=${token}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cartItems,
        totalAmount,
        date: new Date().toISOString(),
      }),
    }
  )

  if (!res.ok) {
    throw new Error('Something went wrong')
  }

  const data = await res.json()

  dispatch({
    type: ADD_ORDER,
    payload: { id: data.name, items: cartItems, amount: totalAmount, date },
  })
}
