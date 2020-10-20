import Product from '../../models/product'

export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const SET_PRODUCTS = 'SET_PRODUCTS'

export const fetchProducts = () => async (dispatch) => {
  try {
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
          'u1',
          data[key].title,
          data[key].imageUrl,
          data[key].description,
          data[key].price
        )
      )
    }

    dispatch({
      type: SET_PRODUCTS,
      payload: loadedProducts,
    })
  } catch (error) {
    throw error
  }
}

export const createProduct = (title, description, imageUrl, price) => async (
  dispatch
) => {
  const res = await fetch(
    'https://the-shopping-6e1ce.firebaseio.com/products.json',
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
    },
  })
}

export const updateProduct = (id, title, description, imageUrl) => async (
  dispatch
) => {
  try {
    await fetch(
      `https://the-shopping-6e1ce.firebaseio.com/products/${id}.json`,
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

    dispatch({
      type: UPDATE_PRODUCT,
      payload: {
        id,
        title,
        description,
        imageUrl,
      },
    })
  } catch (error) {
    throw error
  }
}

export const deleteProduct = (productId) => async (dispatch) => {
  try {
    await fetch(
      `https://the-shopping-6e1ce.firebaseio.com/products/${productId}.json`,
      {
        method: 'DELETE',
      }
    )
    dispatch({ type: DELETE_PRODUCT, payload: productId })
  } catch (error) {
    throw error
  }
}
