import React from 'react'
import { StyleSheet, Text, View, Image, Button, ScrollView } from 'react-native'

import { useSelector } from 'react-redux'
import Colors from '../../constants/Colors'

const ProductDetailScreen = ({ navigation }) => {
  const productId = navigation.getParam('productId')

  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((product) => product.id === productId)
  )

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.button}>
        <Button color={Colors.primary} title='Add to Cart' onPress={() => {}} />
      </View>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  )
}

ProductDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam('productTitle'),
  }
}

export default ProductDetailScreen

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  button: {
    marginVertical: 10,
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
  },
})
