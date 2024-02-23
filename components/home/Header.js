import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import CountryFlag from 'react-native-country-flag'
import useLanguage from '../../hooks/useLanguage'

const Header = ({setIsMenuOpen}) => {

  const {selectedLanguage} = useLanguage();

  return (
    <View className='w-full bg-white flex-row h-16 align-middle'>
      <TouchableOpacity className='items-center justify-center' onPress={() => setIsMenuOpen(true)}>
        <CountryFlag className='rounded-lg justify-center self-center mx-4' isoCode={selectedLanguage.toLowerCase()} size={40} />
      </TouchableOpacity>
    </View>
  )
}

export default Header