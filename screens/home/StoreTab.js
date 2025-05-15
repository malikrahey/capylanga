import { View, Image, Text, ScrollView, Alert } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { Card, CardHeader } from '../../components/ui/Card';
import capyImage from '../../assets/capyai.png';
import RaisedButton from '../../components/ui/RaisedButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StoreItem from '../../components/store/StoreItem';

const STORE_ITEMS_KEY = '@store_items';
const COINS_KEY = '@coins';
const FOOD_COUNT_KEY = '@food_count';

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
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [foodCount, setFoodCount] = useState(0);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      tabBarIcon: ({ color, size }) => (
        <FontAwesome name="shopping-bag" size={size} color={color} />
      )
    })
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [coinsData, purchasedData, foodCountData] = await Promise.all([
        AsyncStorage.getItem(COINS_KEY),
        AsyncStorage.getItem(STORE_ITEMS_KEY),
        AsyncStorage.getItem(FOOD_COUNT_KEY)
      ]);

      if (coinsData) {
        setCoins(JSON.parse(coinsData));
      } else {
        await AsyncStorage.setItem(COINS_KEY, JSON.stringify(0));
      }

      if (purchasedData) {
        setPurchasedItems(JSON.parse(purchasedData));
      } else {
        await AsyncStorage.setItem(STORE_ITEMS_KEY, JSON.stringify([]));
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
      const newPurchasedItems = [...purchasedItems, itemId];
      const newFoodCount = foodCount + 1;

      await Promise.all([
        AsyncStorage.setItem(COINS_KEY, JSON.stringify(newCoins)),
        AsyncStorage.setItem(STORE_ITEMS_KEY, JSON.stringify(newPurchasedItems)),
        AsyncStorage.setItem(FOOD_COUNT_KEY, String(newFoodCount))
      ]);

      setCoins(newCoins);
      setPurchasedItems(newPurchasedItems);
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
            isPurchased={purchasedItems.includes(item.id)}
          />
        ))}
      </ScrollView>
    </View>
  )
}

export default StoreTab