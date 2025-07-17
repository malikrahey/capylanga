import { View, Text } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Card } from '../components/ui/Card'
import RaisedButton from '../components/ui/RaisedButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { STORAGE_KEYS } from '../utils/constants';

const LessonCompleteScreen = ({navigation}) => {

  const [coins, setCoins] = useState(0);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, []);

  useEffect(() => {

    const updateCoins = async () => {
      try {
        const coinsJSON = await AsyncStorage.getItem(STORAGE_KEYS.COINS);
        const currentCoins = coinsJSON ? JSON.parse(coinsJSON) : 0;
        const newCoins = currentCoins + 5;
        await AsyncStorage.setItem(STORAGE_KEYS.COINS, JSON.stringify(newCoins));
        setCoins(newCoins);
      } catch (error) {
        console.error(error);
      }
    };

    updateCoins();

  }, []);

  const handleContinue = () => {
    navigation.navigate('Home')
  }

  return (
    <View className='items-center h-full justify-center w-full bg-neutral-100'>
      <Card className="p-8 items-center">
        <MaterialIcons name="check-circle" size={64} color="#22c55e" />
        <Text className='text-2xl font-bold m-4 text-center'>Lesson Complete!</Text>
        <Text className='text-lg text-gray-600 mb-4 text-center'>Great job! You've earned 5 coins.</Text>
        <Text className='text-xl font-bold text-gray-800'>Total Coins: {coins}</Text>
      </Card>

      <View className="mt-8">
        <RaisedButton onPress={handleContinue} variant="continue" buttonStyles="p-4">
          <Text className="text-white font-bold">Continue</Text>
        </RaisedButton>
      </View>

    </View>
  )
}

export default LessonCompleteScreen