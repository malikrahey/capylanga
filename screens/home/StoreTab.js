import { View, Image, Text, ScrollView, Alert } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { Card, CardHeader } from '../../components/ui/Card';
import capyImage from '../../assets/capyai.png';
import RaisedButton from '../../components/ui/RaisedButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StoreItem from '../../components/store/StoreItem';
import { useFocusEffect } from '@react-navigation/native';
import { STORAGE_KEYS } from '../../utils/constants';

const {COINS, FOOD_COUNT} = STORAGE_KEYS;

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
  const [foodCount, setFoodCount] = useState(0);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      tabBarIcon: ({ color, size }) => (
        <FontAwesome name="shopping-bag" size={size} color={color} />
      )
    })
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = async () => {
    try {
      const [coinsData, foodCountData] = await Promise.all([
        AsyncStorage.getItem(COINS),
        AsyncStorage.getItem(FOOD_COUNT)
      ]);

      if (coinsData) {
        setCoins(JSON.parse(coinsData));
      } else {
        await AsyncStorage.setItem(COINS, JSON.stringify(0));
      }

      if (foodCountData) {
        setFoodCount(Number(foodCountData));
      }
    } catch (error) {
      console.error('Error loading store data:', error);
      Alert.alert('Error', 'Failed to load store data');
    }
  };

  const handlePurchase = async (itemId, price) => {
    try {
      if (coins < price) {
        Alert.alert('Insufficient Funds', 'You do not have enough coins for this purchase.');
        return;
      }

      const newCoins = coins - price;
      const newFoodCount = foodCount + 1;

      await Promise.all([
        AsyncStorage.setItem(COINS, JSON.stringify(newCoins)),
        AsyncStorage.setItem(FOOD_COUNT, String(newFoodCount))
      ]);

      setCoins(newCoins);
      setFoodCount(newFoodCount);
      
      Alert.alert('Success', 'Food purchased successfully!');
    } catch (error) {
      console.error('Error processing purchase:', error);
      Alert.alert('Error', 'Failed to process purchase');
    }
  };

  return (
    <View className='items-center h-full justify-center w-full p-4'>
      <View className='w-full items-end py-8'>
        <Card cardStyle="">
          <Text className="text-lg font-bold">Coins: {coins}</Text>
          <Text className="text-lg font-bold">Food Items: {foodCount}</Text>
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
          <StoreItem 
            key={item.id} 
            {...item} 
            coins={coins}
            onPurchase={(price) => handlePurchase(item.id, price)}
          />
        ))}
      </ScrollView>
    </View>
  )
}

export default StoreTab