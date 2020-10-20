import React, { useState } from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'

import productsReducer from './store/reducers/productsReducer'
import cartReducer from './store/reducers/cartReducers'
import orderReducer from './store/reducers/orderReducer'
import authReducer from './store/reducers/authReducer'

import ShopNavigator from './navigation/ShopNavigator'

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  order: orderReducer,
  auth: authReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false)

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true)
        }}
      />
    )
  }
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  )
}
