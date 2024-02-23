import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { FontAwesome } from '@expo/vector-icons';
const StoreTab = ({navigation}) => {

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      tabBarIcon: ({ color, size }) => (
        <FontAwesome name="shopping-bag" size={size} color={color} />
      )
    })
  }, [])
  return (
    <View className='items-center h-full justify-center w-full'>
      <Text className='justify-center'>Coming Soon</Text>
    </View>
  )
}

export default StoreTab