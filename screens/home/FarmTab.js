import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import capyai from '../../assets/capyai.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RaisedButton from '../../components/ui/RaisedButton';

const FarmTab = () => {

  const [hunger, setHunger] = useState(100);
  const [food, setFood] = useState(100);
  const [energy, setEnergy] = useState(100);

  useEffect(() => {

    const getHealthLevels = async () => {
      const [
        storedHunger,
        storedFood,
        storedEnergy
      ] = await AsyncStorage.multiGet(['hunger', 'food', 'energy']);
      
      if (storedHunger[1] && storedFood[1] && storedEnergy[1]) {
        setHunger(Number(storedHunger[1]));
        setFood(Number(storedFood[1]));
        setEnergy(Number(storedEnergy[1]));
      } else {
        await AsyncStorage.multiSet([
          ['hunger', "100"],
          ['food', "100"],
          ['energy', "100"]
        ])
      }
    }

    getHealthLevels();

  }, []);

  const handlefeed = () => {
    setHunger(hunger - 10);
    setFood(food - 10);
  }

  const handleBuyFood = () => {
    setFood(food + 10);
  }


  return (
    <View className='items-center h-full w-full'>

        <View className='flex w-full justify-end items-end p-4'>
          <Text>Hunger: {hunger}%</Text>
          <Text>Food: {food}%</Text>
          <Text>Energy: {energy}%</Text>
        </View>
      

      <Image source={capyai} className='w-64 h-64' />

      <View className='flex flex-row w-full justify-evenly p-4'>

        <RaisedButton variant="buy" onPress={handlefeed} buttonStyles="w-24 h-8 items-center">
          <Text className="text-lg font-bold">Feed</Text>
        </RaisedButton>

       
      </View>
    </View>
  )
};

export default FarmTab;