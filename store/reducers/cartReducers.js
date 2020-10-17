import { ADD_TO_CART } from '../actions/cartActions'
import CartItem from '../../models/cart-item'

const initialState = {
  items: {},
  totalAmount: 0,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.payload
      const prodPrice = addedProduct.price
      const prodTitle = addedProduct.title

      let updatedOrNewCartItem

      if (state.items[addedProduct.id]) {
        //   already have the item in the cart
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.item[addedProduct].sum + prodPrice
        )
      } else {
        updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice)
      }

      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + prodPrice,
      }
  }
  return state
}
