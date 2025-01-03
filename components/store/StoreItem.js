import { View, Text, Image } from 'react-native'
import React from 'react'
import { Card, CardHeader } from '../ui/Card'
import RaisedButton from '../ui/RaisedButton'

const StoreItem = ({
  name,
  price,
  image,
}) => {
  return (
    <Card cardStyle="w-64 items-center justify-between space-y-4">
          <CardHeader styles="flex-col">
            <Text className='text-2xl font-bold'>{name}</Text>
            <Text className='text-md font-bold'>{price} Coins</Text>
          </CardHeader>

          <Image source={image} className='w-32 h-32' />
          <RaisedButton buttonStyles={"w-16 h-8"} variant="buy" onPress={() => {}}>
            <Text className='text-lg font-bold'>Buy</Text>
          </RaisedButton>
    </Card>
  )
}

export default StoreItem