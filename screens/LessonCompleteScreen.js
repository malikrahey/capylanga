import { View, Text, Platform } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Card } from '../components/ui/Card'
import RaisedButton from '../components/ui/RaisedButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { STORAGE_KEYS } from '../utils/constants';
import { AdEventType, InterstitialAd, TestIds } from 'react-native-google-mobile-ads';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { addCredits, getCredits, CREDIT_REWARDS } from '../api/credits';

const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
  keywords: ['fashion']
});

const LessonCompleteScreen = () => {

  const [coins, setCoins] = useState(0);
  const [credits, setCredits] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [canContinue, setCanContinue] = useState(false);
  const navigation = useNavigation();

  

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, []);

  useEffect(() => {

    const unsubscribeLoaded = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      setLoaded(true);
    });

    const unsubscribeOpened = interstitial.addAdEventListener(AdEventType.OPENED, () => {
     if (Platform.OS === 'ios') {
      StatusBar.setHidden(true);
     }
    });

    const unsubscribeClosed = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
      if (Platform.OS === 'ios') {
        StatusBar.setHidden(false);
      }
    });

    interstitial.load();

    const updateCurrencies = async () => {
      try {
        // Update coins (existing system)
        const coinsJSON = await AsyncStorage.getItem(STORAGE_KEYS.COINS);
        const currentCoins = coinsJSON ? JSON.parse(coinsJSON) : 0;
        const newCoins = currentCoins + 5;
        await AsyncStorage.setItem(STORAGE_KEYS.COINS, JSON.stringify(newCoins));
        setCoins(newCoins);

        // Update credits (new system)
        const newCredits = await addCredits(CREDIT_REWARDS.LESSON_COMPLETE);
        setCredits(newCredits);

        setCanContinue(true);
      } catch (error) {
        console.error('Error updating currencies:', error);
        // Fallback: just get current values and allow continue
        try {
          const coinsJSON = await AsyncStorage.getItem(STORAGE_KEYS.COINS);
          const currentCoins = coinsJSON ? JSON.parse(coinsJSON) : 0;
          setCoins(currentCoins);
          
          const currentCredits = await getCredits();
          setCredits(currentCredits);
          
          setCanContinue(true);
        } catch (fallbackError) {
          console.error('Fallback error:', fallbackError);
          setCanContinue(true);
        }
      }
    };

    updateCurrencies();

    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
      unsubscribeOpened();
    }

  }, []);

  const handleContinue = () => {
    if (loaded) {
      interstitial.show();
    }
    navigation.navigate('Home')
  }

  return (
    <View className='items-center h-full justify-center w-full bg-neutral-100'>
      <Card className="p-8 items-center">
        <MaterialIcons name="check-circle" size={64} color="#22c55e" />
        <Text className='text-2xl font-bold m-4 text-center'>Lesson Complete!</Text>
        <Text className='text-lg text-gray-600 mb-4 text-center'>
          Great job! You've earned rewards!
        </Text>
        
        {/* Currency Rewards Display */}
        <View className="bg-gray-50 p-4 rounded-lg w-full mb-4">
          <View className="flex-row justify-between items-center mb-2">
            <View className="flex-row items-center">
              <MaterialIcons name="monetization-on" size={20} color="#f59e0b" />
              <Text className="text-lg font-semibold ml-2">+5 Coins</Text>
            </View>
            <Text className='text-lg font-bold text-gray-800'>Total: {coins}</Text>
          </View>
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <MaterialIcons name="stars" size={20} color="#8b5cf6" />
              <Text className="text-lg font-semibold ml-2">+{CREDIT_REWARDS.LESSON_COMPLETE} Credit</Text>
            </View>
            <Text className='text-lg font-bold text-gray-800'>Total: {credits}</Text>
          </View>
        </View>
      </Card>

      <View className="mt-8">
        <RaisedButton onPress={handleContinue} variant="continue" buttonStyles="p-4" disabled={!canContinue}>
          <Text className="text-white font-bold">Continue</Text>
        </RaisedButton>
      </View>

    </View>
  )
}

export default LessonCompleteScreen