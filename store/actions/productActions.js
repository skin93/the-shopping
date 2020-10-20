import Product from '../../models/product'

export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const SET_PRODUCTS = 'SET_PRODUCTS'

export const fetchProducts = () => async (dispatch, getState) => {
  const userId = getState().auth.userId
  const res = await fetch(
    'https://the-shopping-6e1ce.firebaseio.com/products.json'
  )

  if (!res.ok) {
    throw new Error('Something went wrong!')
  }

  const data = await res.json()
  const loadedProducts = []

  for (const key in data) {
    loadedProducts.push(
      new Product(
        key,
        data[key].ownerId,
        data[key].title,
        data[key].imageUrl,
        data[key].description,
        data[key].price
      )
    )
  }

  dispatch({
    type: SET_PRODUCTS,
    payload: {
      loadedProducts,
      userProducts: loadedProducts.filter((prod) => prod.ownerId === userId),
    },
  })
}

export const createProduct = (title, description, imageUrl, price) => async (
  dispatch,
  getState
) => {
  const token = getState().auth.token
  const userId = getState().auth.userId
  const res = await fetch(
    `https://the-shopping-6e1ce.firebaseio.com/products.json?auth=${token}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        price,
        ownerId: userId,
      }),
    }
  )

  const data = await res.json()

  console.log(data)
  dispatch({
    type: CREATE_PRODUCT,
    payload: {
      id: data.name,
      title,
      description,
      imageUrl,
      price,
      ownerId: userId,
    },
  })
}

export const updateProduct = (id, title, description, imageUrl) => async (
  dispatch,
  getState
) => {
  const token = getState().auth.token
  const res = await fetch(
    `https://the-shopping-6e1ce.firebaseio.com/products/${id}.json?auth=${token}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
      }),
    }
  )

  if (!res.ok) {
    throw new Error('Something went wrong')
  }

  dispatch({
    type: UPDATE_PRODUCT,
    payload: {
      id,
      title,
      description,
      imageUrl,
    },
  })
}

export const deleteProduct = (productId) => async (dispatch, getState) => {
  try {
    const token = getState().auth.token
    const res = await fetch(
      `https://the-shopping-6e1ce.firebaseio.com/products/${productId}.json?auth=${token}`,
      {
        method: 'DELETE',
      }
    )

    if (!res.ok) {
      throw new Error('Something went wrong')
    }

    dispatch({ type: DELETE_PRODUCT, payload: productId })
  } catch (error) {
    throw error
  }
}
