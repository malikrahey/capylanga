import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import useLanguage from '../../hooks/useLanguage'
import { Drawer } from 'react-native-paper'
import CountryFlag from 'react-native-country-flag'
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
const languages = [
  {
    title: 'Spanish',
    iso: 'es',
    path: 'Es',
  },
  {
    title: 'French',
    iso: 'fr',
    path: 'Fr',
  },
  {
    title: 'Portuguese (Brazil)',
    iso: 'br',
    path: 'Br'
  }
]

const COINS_KEY = '@coins';
const CREDITS_KEY = '@credits';

const DrawerSideMenu = ({ setIsDrawerOpen }) => {
  const { selectedLanguage, setSelectedLanguage } = useLanguage();
  const [coins, setCoins] = useState(0);
  const [credits, setCredits] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [coinsData, creditsData] = await AsyncStorage.multiGet([COINS_KEY, CREDITS_KEY]);

      const currentCoins = coinsData[1] ? Number(coinsData[1]) : 0;
      const currentCredits = creditsData[1] ? Number(creditsData[1]) : 0;

      setCoins(currentCoins);
      setCredits(currentCredits);

      if (!coinsData[1]) {
        await AsyncStorage.setItem(COINS_KEY, String(0));
      }
      if (!creditsData[1]) {
        await AsyncStorage.setItem(CREDITS_KEY, String(0));
      }

    } catch (error) {
      console.error('Error loading currency data:', error);
    }
  };

  return (
    <GestureHandlerRootView className="flex-1 bg-neutral-100">
      <SafeAreaView className="flex-1 py-6">
      <Drawer.Section 
        title="Language" 
        className="bg-white rounded-xl mx-2"
        titleStyle={{ fontSize: 50, fontWeight: 'bold' }}
      >
        {languages.map((language) => (
          <Drawer.Item
            key={language.iso}
            label={language.title}
            className="py-2"
            icon={({ size, color }) => (
              <CountryFlag isoCode={language.iso} size={size} />
            )}
            onPress={() => {
              setSelectedLanguage(language.path);
              setIsDrawerOpen(false); 
            }}
          />
        ))}
      </Drawer.Section>

      <Drawer.Section 
        title="Credits"
        className="bg-white rounded-xl mx-2 mt-4"
        titleStyle={{ fontSize: 20, fontWeight: 'bold' }}
      >
        <Drawer.Item
          label="Get More Credits"
          className="py-2"
          icon={({ size, color }) => (
            <MaterialIcons name="attach-money" size={size} color={color} />
          )}
          onPress={() => {
            navigation.navigate('GetCreditsScreen');
            setIsDrawerOpen(false);
          }}
        />
      </Drawer.Section>

      <View className="flex-1" />

      <View className="mx-4 mb-4 p-4 bg-white rounded-xl shadow-sm">
        <Text className="text-lg font-bold">Coins: {coins}</Text>
        <Text className="text-lg font-bold mt-1">Credits: {credits}</Text>
      </View>

      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default DrawerSideMenu;