import React from 'react'
import {
  FlatList,
  Button,
  Platform,
  Alert,
  View,
  Text,
  StyleSheet,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import BaseHeaderButton from '../../components/UI/BaseHeaderButton'
import ProductItem from '../../components/shop/ProductItem'

import Colors from '../../constants/Colors'

import * as productActions from '../../store/actions/productActions'

const UserProductsScreen = ({ navigation }) => {
  const userProducts = useSelector((state) => state.products.userProducts)
  const dispatch = useDispatch()

  const editProductHandler = (id) => {
    navigation.navigate('EditProduct', { productId: id })
  }

  const deleteHandler = (id) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(productActions.deleteProduct(id))
        },
      },
    ])
  }

  if (userProducts.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found. Maybe start creating some?</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          title={itemData.item.title}
          price={itemData.item.price}
          imageUrl={itemData.item.imageUrl}
          onSelect={() => {
            editProductHandler(itemData.item.id)
          }}
        >
          <Button
            color={Colors.primary}
            title='Edit'
            onPress={() => {
              editProductHandler(itemData.item.id)
            }}
          />
          <Button
            color={Colors.primary}
            title='Delete'
            onPress={() => {
              deleteHandler(itemData.item.id)
            }}
          />
        </ProductItem>
      )}
    />
  )
}

UserProductsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Your Products',
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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={BaseHeaderButton}>
        <Item
          title='Add'
          iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          onPress={() => {
            navData.navigation.navigate('EditProduct')
          }}
        />
      </HeaderButtons>
    ),
  }
}

export default UserProductsScreen

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
