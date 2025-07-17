import { View, Text, Image, Alert } from 'react-native'
import React from 'react'
import { Card, CardHeader } from '../ui/Card'
import RaisedButton from '../ui/RaisedButton'

const StoreItem = ({
  name,
  price,
  image,
  coins,
  onPurchase,
}) => {
  const canAfford = coins >= price;
  const isDisabled = !canAfford;

  const handlePress = () => {
    if (!canAfford) {
      Alert.alert(
        "Insufficient Funds",
        `You need ${price - coins} more coins to purchase this item.`
      );
      return;
    }
    onPurchase(price);
  };

  return (
    <Card cardStyle="w-64 items-center justify-between space-y-4">
          <CardHeader styles="flex-col">
            <Text className='text-2xl font-bold'>{name}</Text>
            <Text className='text-md font-bold'>{price} Coins</Text>
          </CardHeader>

          <Image source={image} className='w-32 h-32' />
          <RaisedButton 
            buttonStyles={`w-16 h-8 ${isDisabled ? 'opacity-50' : ''}`} 
            variant={"buy"} 
            onPress={handlePress}
            disabled={isDisabled}
          >
            <Text className='text-lg font-bold'>
              {'Buy'}
            </Text>
          </RaisedButton>
    </Card>
  )
}

export default StoreItem