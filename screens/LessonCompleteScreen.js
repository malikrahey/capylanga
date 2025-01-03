import { View, Text } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Card } from '../components/ui/Card'
import RaisedButton from '../components/ui/RaisedButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LessonCompleteScreen = ({navigation}) => {

  const [coins, setCoins] = useState(0);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, []);

  useEffect(() => {

    const getCoins = async () => {
      try {
        const coins = await AsyncStorage.getCoins('coins');
        if (coins) {
          setCoins(JSON.parse(coins));
        }
      } catch (error) {
        console.error(error);
      }
    };

    getCoins();

    setTimeout(addCoins, 1000);

  }, []);

  const addCoins = async () => {
    try {
      const newCoins = coins + 5;
      await AsyncStorage.setItem('coins', JSON.stringify(newCoins));
      setCoins(newCoins);
    } catch (error) {
      console.error(error);
    }
  }

  const handleContinue = () => {
    navigation.navigate('Home')
  }

  return (
    <View className='items-center h-full justify-center w-full'>
      <Card>
        <Text className='text-2xl font-bold m-2'>Lesson Complete</Text>
      </Card>

      <View>
        <RaisedButton onPress={handleContinue}>
          <Text>Continue</Text>
        </RaisedButton>
      </View>

    </View>
  )
}

export default LessonCompleteScreen