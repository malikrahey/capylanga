import { View, Text, Touchable, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useContext } from 'react'
import CountryFlag from 'react-native-country-flag'
import styles from '../../styles'
import { LanguageContext } from '../../providers/LanguageProvider'
import useLanguage from '../../hooks/useLanguage'

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

  const handleSelect = (language) => {
    setSelectedLanguage(language);
  } 

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <Text className='text-2xl font-bold m-2'>Select Language:</Text>
      
      <View className='space-y-4 h-full'>
      {languages.map(language => (

      <TouchableOpacity className='flex-row space-x-2 items-center ml-2' key={language.iso} onPress={() => handleSelect(language.path)}>
        <CountryFlag className='rounded-lg' isoCode={language.iso} size={40}/>
        <Text className='text-xl font-bold'>{language.title}</Text>
      </TouchableOpacity>

      ))}

    </View>
      
    </SafeAreaView>
  )
}

export default SideMenuContent