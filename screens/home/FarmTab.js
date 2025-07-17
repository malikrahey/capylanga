import React, { useEffect, useState } from 'react';
import { View, Image, Text, Alert } from 'react-native';
import capyai from '../../assets/capyai.png';
import RaisedButton from '../../components/ui/RaisedButton';
import ProgressBar from '../../components/ui/ProgressBar';

import { loadPetStatus, feedPet } from '../../utils/petStatus';

const DEFAULT_FOOD_COUNT = 5;

const FarmTab = () => {
  const [hunger, setHunger] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [foodCount, setFoodCount] = useState(DEFAULT_FOOD_COUNT);

  // Initial load & when component regains focus
  useEffect(() => {
    const init = async () => {
      try {
        const { hunger, energy, foodCount } = await loadPetStatus(DEFAULT_FOOD_COUNT);
        setHunger(hunger);
        setEnergy(energy);
        setFoodCount(foodCount);
      } catch (error) {
        console.error('Error loading pet status:', error);
        Alert.alert('Error', 'Failed to load pet status');
      }
    };

    init();
  }, []);

  const handleFeed = async () => {
    if (foodCount <= 0) {
      Alert.alert('No Food', 'You need to buy more food from the store!');
      return;
    }

    try {
      const { hunger: newHunger, energy: newEnergy, foodCount: newFoodCount } = await feedPet(foodCount);
      setHunger(newHunger);
      setEnergy(newEnergy);
      setFoodCount(newFoodCount);
    } catch (error) {
      console.error('Error feeding pet:', error);
      Alert.alert('Error', 'Failed to feed pet');
    }
  };

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
          onPress={handleFeed}
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