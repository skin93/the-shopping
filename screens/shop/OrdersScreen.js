import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux'

import BaseHeaderButton from '../../components/UI/BaseHeaderButton'

import OrderItem from '../../components/shop/OrderItem'

import * as orderActions from '../../store/actions/orderActions'
import Colors from '../../constants/Colors'

const OrdersScreen = () => {
  const [isLoading, setIsLoading] = useState(false)
  const orders = useSelector((state) => state.order.orders)
  const dispatch = useDispatch()

  useEffect(() => {
    setIsLoading(true)
    dispatch(orderActions.fetchOrders()).then(() => {
      setIsLoading(false)
    })
  }, [dispatch])

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    )
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  )
}

OrdersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Your Orders',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={BaseHeaderButton}>
        <Item
          title='Menu'
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer()
          }}
        />
      </HeaderButtons>
    ),
  }
}

export default OrdersScreen

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
