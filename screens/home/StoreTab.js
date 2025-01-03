import { View, Image, Text, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { Card, CardHeader } from '../../components/ui/Card';
import capyImage from '../../assets/capyai.png';
import RaisedButton from '../../components/ui/RaisedButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StoreItem from '../../components/store/StoreItem';

const storeItems = [
  {
    id: 1,
    name: 'Food',
    price: 5,
    image: capyImage,
  },
]

const StoreTab = ({navigation}) => {

  const [coins, setCoins] = useState(0);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      tabBarIcon: ({ color, size }) => (
        <FontAwesome name="shopping-bag" size={size} color={color} />
      )
    })
  }, []);

  useEffect(() => {
    const getAsyncData = async () => {
      try {
        const coins = await AsyncStorage.getItem('coins');
        if (!coins) {
          await AsyncStorage.setItem('coins', JSON.stringify(0));
        } else {
          setCoins(JSON.parse(coins));
        }
      } catch (error) {
        console.error(error);
      }
    };
    getAsyncData();
  }, [])


  return (
    <View className='items-center h-full justify-center w-full p-4'>

    <View className='w-full items-end py-8'>
      <Card cardStyle="">
        <Text>Coins: {coins}</Text>
      </Card>
    </View>
      

      <ScrollView
        className='space-y-4 flex flex-col p-4 gap-4'
        contentContainerStyle={{
          gap: 16,
          paddingBottom: 200
        }}
      >

        {storeItems.map(item => (
          <StoreItem key={item.id} {...item} />
        ))}
      </ScrollView>
    </View>
  )
}

export default StoreTab