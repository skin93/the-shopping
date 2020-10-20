import Product from '../../models/product'

export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const SET_PRODUCTS = 'SET_PRODUCTS'

export const deleteProduct = (productId) => {
  return { type: DELETE_PRODUCT, payload: productId }
}

export const fetchProducts = () => async (dispatch) => {
  const res = await fetch(
    'https://the-shopping-6e1ce.firebaseio.com/products.json'
  )

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

export const updateProduct = (id, title, description, imageUrl) => {
  return {
    type: UPDATE_PRODUCT,
    payload: {
      id,
      title,
      description,
      imageUrl,
    },
  }
}
