import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import useLanguage from '../../hooks/useLanguage'
import { Drawer } from 'react-native-paper'
import CountryFlag from 'react-native-country-flag'

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

const DrawerSideMenu = ({ setIsDrawerOpen }) => {
  const { selectedLanguage, setSelectedLanguage } = useLanguage();

  return (
    <GestureHandlerRootView className="flex-1 bg-neutral-100">
      <SafeAreaView>
      <Drawer.Section title="Language" className="bg-white">
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
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default DrawerSideMenu;