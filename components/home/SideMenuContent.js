import { View, Text, Touchable, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import CountryFlag from 'react-native-country-flag'
import styles from '../../styles'
import { LanguageContext } from '../../providers/LanguageProvider'
import useLanguage from '../../hooks/useLanguage'
import AsyncStorage from '@react-native-async-storage/async-storage'

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



const SideMenuContent = () => {

  const {setSelectedLanguage} = useLanguage();
  const [coins, setCoins] = useState(0);
  const [credits, setCredits] = useState(0);

  const handleSelect = (language) => {
    setSelectedLanguage(language);
  } 

  useEffect(() => {
    const getCoins = async () => {
      try {
        const coins = await AsyncStorage.getItem('coins');
        if (coins) {
          setCoins(JSON.parse(coins));
        }
      } catch (error) {
        console.error(error);
      }
    };

    getCoins();
  }, [])

  return (
    <SafeAreaView className='bg-white p-4 border-gray-400 z-10' style={[styles.AndroidSafeArea, {height: '100%'}]}>
      <Text className='text-2xl font-bold m-2'>Select Language:</Text>
      
      <View className='space-y-4'>
      {languages.map(language => (

      <TouchableOpacity className='flex-row space-x-2 items-center ml-2' key={language.iso} onPress={() => handleSelect(language.path)}>
        <CountryFlag className='rounded-lg' isoCode={language.iso} size={40}/>
        <Text className='text-xl font-bold'>{language.title}</Text>
      </TouchableOpacity>

      ))}

    </View>

    <View className='flex flex-col py-4'>
        <Text className='font-bold m-2'>Coins: {coins}</Text>
        <Text className='font-bold m-2'>Credits: {credits}</Text>
    </View>
      
    </SafeAreaView>
  )
}

export default SideMenuContent