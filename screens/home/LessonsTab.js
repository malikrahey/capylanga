import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Animated } from 'react-native'
import React, { lazy, useContext, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import useLanguage from '../../hooks/useLanguage'
import { SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import LessonSelectBadge from '../../components/home/LessonSelectBadge';
import * as manifest from '../../public/lessons/es/manifest.json'
import { ActivityIndicator } from 'react-native-paper';
import CountryFlag from 'react-native-country-flag';
import Header from '../../components/home/Header';
import styles from '../../styles';
import SideMenuContent from '../../components/home/SideMenuContent';
import SideMenu from 'react-native-side-menu-updated';
import * as lessonContent from '../../public/lessons/lessonContent.json'
import { LanguageContext } from '../../providers/LanguageProvider';

const LessonsTab = ({navigation}) => {

  const {selectedLanguage} = useLanguage();

  const [lessons, setLessons] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menu = <SideMenuContent />

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      tabBarIcon: ({ color, size }) => (
        <SimpleLineIcons name="book-open" color={color} size={size} />
      )
    })
  }, [])

  console.log('rerender')
  console.log(selectedLanguage)

  useEffect(() => {
    setLoading(true);
    try {
      console.log('Use effect running > ', selectedLanguage);
      const manifest = lessonContent[selectedLanguage]['manifest'];
      console.log(JSON.stringify(manifest));
      setLessons(manifest.lessonModules);
    } catch (error) {
      console.error('Error in useEffect:', error);
    } finally {
      setLoading(false);
    }
  });

  const animationFunction = (prop, value) =>
  Animated.spring(prop, {
    toValue: value,
    friction: 8,
    useNativeDriver: true,
  })
  
  return (
    <SideMenu
      menu={menu}
      isOpen={isMenuOpen}
      onChange={setIsMenuOpen}
      menuPosition='left'
      animationFunction={animationFunction}
      
    >
      <SafeAreaView style={styles.AndroidSafeArea} className='items-center h-full justify-center w-full bg-neutral-100'>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <>
          
            <Header setIsMenuOpen={setIsMenuOpen} />

            <ScrollView className='w-full' contentContainerStyle={{
              alignContent: 'center',
              justifyContent: 'center'
            }}>  
              <Text className='text-2xl font-bold m-2'>Module 1: Essentials</Text>
            
              {lessons.map(lesson => lesson !== undefined ? (
                
                <View key={lesson.rootPath} className="items-center my-4"> 
                  <LessonSelectBadge  {...lesson}/>
                </View> 
              ) : null)}
            </ScrollView>
          </>
        )}
        
      </SafeAreaView>
    </SideMenu>
  )
}

export default LessonsTab