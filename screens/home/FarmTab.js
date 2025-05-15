import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, Alert } from 'react-native';
import capyai from '../../assets/capyai.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RaisedButton from '../../components/ui/RaisedButton';
import ProgressBar from '../../components/ui/ProgressBar';

const FOOD_COUNT_KEY = '@food_count';
const DEFAULT_FOOD_COUNT = 5;

const FarmTab = () => {
  const [hunger, setHunger] = useState(100);
  const [food, setFood] = useState(100);
  const [energy, setEnergy] = useState(100);
  const [foodCount, setFoodCount] = useState(DEFAULT_FOOD_COUNT);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [
          storedHunger,
          storedFood,
          storedEnergy,
          storedFoodCount
        ] = await AsyncStorage.multiGet(['hunger', 'food', 'energy', FOOD_COUNT_KEY]);
        
        if (storedHunger[1] && storedFood[1] && storedEnergy[1]) {
          setHunger(Number(storedHunger[1]));
          setFood(Number(storedFood[1]));
          setEnergy(Number(storedEnergy[1]));
        } else {
          await AsyncStorage.multiSet([
            ['hunger', "100"],
            ['food', "100"],
            ['energy', "100"]
          ]);
        }

        if (storedFoodCount[1]) {
          setFoodCount(Number(storedFoodCount[1]));
        } else {
          await AsyncStorage.setItem(FOOD_COUNT_KEY, String(DEFAULT_FOOD_COUNT));
        }
      } catch (error) {
        console.error('Error loading farm data:', error);
        Alert.alert('Error', 'Failed to load farm data');
      }
    };

    loadData();
  }, []);

  const handlefeed = async () => {
    if (foodCount <= 0) {
      Alert.alert('No Food', 'You need to buy more food from the store!');
      return;
    }

    try {
      const newFoodCount = foodCount - 1;
      const newHunger = Math.max(0, hunger - 10);
      const newFood = Math.max(0, food - 10);

      await AsyncStorage.multiSet([
        [FOOD_COUNT_KEY, String(newFoodCount)],
        ['hunger', String(newHunger)],
        ['food', String(newFood)]
      ]);

      setFoodCount(newFoodCount);
      setHunger(newHunger);
      setFood(newFood);
    } catch (error) {
      console.error('Error updating farm data:', error);
      Alert.alert('Error', 'Failed to update farm data');
    }
  };

  const handleBuyFood = () => {
    setFood(food + 10);
  }

  return (
    <View className='items-center h-full w-full'>
      <View className='flex w-full justify-end items-end p-4'>
        <ProgressBar 
          value={hunger} 
          label="Hunger" 
          color="#FF6B6B"
          width={200}
        />
        <ProgressBar 
          value={food} 
          label="Food" 
          color="#4CAF50"
          width={200}
        />
        <ProgressBar 
          value={energy} 
          label="Energy" 
          color="#2196F3"
          width={200}
        />
        <Text className="text-lg font-bold mt-2">Food Items: {foodCount}</Text>
      </View>

      <Image source={capyai} className='w-64 h-64' />

      <View className='flex flex-row w-full justify-evenly p-4'>
        <RaisedButton 
          variant="buy" 
          onPress={handlefeed} 
          buttonStyles={`w-24 h-8 items-center ${foodCount <= 0 ? 'opacity-50' : ''}`}
          disabled={foodCount <= 0}
        >
          <Text className="text-lg font-bold">Feed</Text>
        </RaisedButton>
      </View>
    </View>
  );
};

export default FarmTab;