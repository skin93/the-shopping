export const ADD_ORDER = 'ADD_ORDER'

export const addOrder = (cartItems, totalAmount) => async (dispatch) => {
  try {
    const date = new Date()
    const res = await fetch(
      'https://the-shopping-6e1ce.firebaseio.com/orders/u1.json',
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
  } catch (error) {}
}
