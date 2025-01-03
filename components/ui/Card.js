import { View, Text } from 'react-native'
import React from 'react'

export const Card = ({cardStyle, children}) => {
  return (
    <View className={`bg-white p-4 rounded-lg shadow-md ${cardStyle}`}>
      {children}
    </View>
  )
}

export const CardHeader = ({styles, children}) => {
  return (
    <View className={`flex flex-row items-center p-2 text-xl font-bold ${styles}`}>
      {children}
    </View>
  );
}
