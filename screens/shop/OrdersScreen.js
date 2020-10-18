import React from 'react'
import { FlatList, Platform, Text } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector } from 'react-redux'

import BaseHeaderButton from '../../components/UI/BaseHeaderButton'

const OrdersScreen = () => {
  const orders = useSelector((state) => state.order.orders)
  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => <Text>{itemData.item.totalAmount}</Text>}
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

// const styles = StyleSheet.create({})
