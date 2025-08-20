import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import useLanguage from '../../hooks/useLanguage'
import { Drawer } from 'react-native-paper'
import CountryFlag from 'react-native-country-flag'
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { STORAGE_KEYS } from '../../utils/constants';
import { getCredits, initializeCredits } from '../../api/credits';

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

const {COINS, CREDITS} = STORAGE_KEYS;

const DrawerSideMenu = () => {

  const { selectedLanguage, setSelectedLanguage } = useLanguage();
  const [coins, setCoins] = useState(0);
  const [credits, setCredits] = useState(0);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const loadData = async () => {
        try {
          // Load coins
          const coinsJson = await AsyncStorage.getItem(COINS);
          const currentCoins = coinsJson ? JSON.parse(coinsJson) : 0;
          setCoins(currentCoins);

          // Load and initialize credits
          const currentCredits = await initializeCredits();
          setCredits(currentCredits);
        } catch (error) {
          console.error('Error loading data:', error);
        }
      };
      loadData();
    }, [])
  );

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="flex-1 bg-white">
        
        {/* Currency Display */}
        <View className="p-4 bg-purple-50 border-b border-gray-200">
          <View className="flex-row justify-between items-center mb-2">
            <View className="flex-row items-center">
              <MaterialIcons name="monetization-on" size={20} color="#f59e0b" />
              <Text className="text-lg font-semibold ml-2">Coins: {coins}</Text>
            </View>
          </View>
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <MaterialIcons name="stars" size={20} color="#8b5cf6" />
              <Text className="text-lg font-semibold ml-2">Credits: {credits}</Text>
            </View>
            <Text 
              className="text-purple-600 text-sm underline"
              onPress={() => navigation.navigate('GetCreditsScreen')}
            >
              Get More
            </Text>
          </View>
        </View>

        {/* Language Selection */}
        <View className="p-4">
          <Text className="text-lg font-bold mb-3">Select Language</Text>
          {languages.map((language) => (
            <Drawer.Item
              key={language.iso}
              label={language.title}
              icon={() => <CountryFlag isoCode={language.iso} size={20} />}
              active={selectedLanguage === language.iso}
              onPress={() => setSelectedLanguage(language.iso)}
              style={{
                backgroundColor: selectedLanguage === language.iso ? '#f3f4f6' : 'transparent'
              }}
            />
          ))}
        </View>

        {/* Menu Items */}
        <View className="flex-1 p-4">
          <Drawer.Item
            label="Get Credits"
            icon={() => <MaterialIcons name="stars" size={20} color="#8b5cf6" />}
            onPress={() => navigation.navigate('GetCreditsScreen')}
          />
          <Drawer.Item
            label="My Courses"
            icon={() => <MaterialIcons name="school" size={20} color="#6b7280" />}
            onPress={() => navigation.navigate('PersonalizedCourses')}
          />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default DrawerSideMenu