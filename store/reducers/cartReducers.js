import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cartActions'
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
    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.payload]
      const currentQty = state.items[action.payload].quantity
      let updatedCartItems
      if (currentQty > 1) {
        // need to reduce it, not eares it
        updatedCartItems = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice
        )
        updatedCartItems = {
          ...state.items,
          [action.payload]: updatedCartItems,
        }
      } else {
        updatedCartItems = { ...state.items }
        delete updatedCartItems[action.payload]
      }

      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice,
      }
  }
  return state
}
