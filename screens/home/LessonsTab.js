import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Animated } from 'react-native'
import React, { lazy, useContext, useEffect, useLayoutEffect, useMemo, useState, useCallback } from 'react'
import useLanguage from '../../hooks/useLanguage'
import { SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import LessonSelectBadge from '../../components/home/LessonSelectBadge';
import * as manifest from '../../public/lessons/es/manifest.json'
import { ActivityIndicator } from 'react-native-paper';
import CountryFlag from 'react-native-country-flag';
import Header from '../../components/home/Header';
import styles from '../../styles';
import SideMenuContent from '../../components/home/SideMenuContent';
import SideMenu from 'react-native-side-menu-updated';
import * as lessonContent from '../../public/lessonContent.json'
import { LanguageContext } from '../../providers/LanguageProvider';
import RaisedButton from '../../components/ui/RaisedButton';
import DrawerSideMenu from '../../components/home/DrawerSideMenu';
import { Drawer } from 'react-native-drawer-layout';

const LessonsTab = ({navigation}) => {

  const {selectedLanguage} = useLanguage();

  const [lessons, setLessons] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSelect = useCallback((index) => {
    setSelectedBadge(index);
  }, []);

  const handleDeselect = useCallback(() => {
    setSelectedBadge(null);
  }, []);

  const renderLessonBadge = useCallback((lesson, index) => {
    const onSelectForIndex = () => handleSelect(index);
    
    return (
      <View key={`${lesson.rootPath}-${refreshKey}`} className={`items-center my-4 ${selectedBadge === index ? '' : ''}`}> 
        <LessonSelectBadge  
          {...lesson}
          onSelect={onSelectForIndex}
          onDeselect={handleDeselect}
        />
      </View>
    );
  }, [handleSelect, handleDeselect, selectedBadge, refreshKey]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      tabBarIcon: ({ color, size }) => (
        <SimpleLineIcons name="book-open" color={color} size={size} />
      )
    })
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      setRefreshKey(prev => prev + 1);
    }, [])
  );

  useEffect(() => {
    setLoading(true);
    try {
      console.log('selectedLanguage', selectedLanguage);
      const languageContent = lessonContent[selectedLanguage];
      if (!languageContent) {
        return;
      }
      const manifest = lessonContent[selectedLanguage]['manifest'];
      setLessons(manifest.lessonModules);
    } catch (error) {
      console.error('Error in useEffect:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedLanguage, refreshKey]);

  const animationFunction = (prop, value) =>
  Animated.spring(prop, {
    toValue: value,
    friction: 8,
    useNativeDriver: true,
  });
  
  return (
    <Drawer
      open={isMenuOpen}
      onOpen={() => setIsMenuOpen(true)}
      onClose={() => setIsMenuOpen(false)}
      renderDrawerContent={() => <DrawerSideMenu setIsDrawerOpen={setIsMenuOpen} />}
    >
      <SafeAreaView style={styles.AndroidSafeArea} className='items-center h-full justify-center w-full bg-neutral-100'>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <>
            <Header setIsMenuOpen={setIsMenuOpen} />

            <ScrollView 
              className='w-full p-4' 
              contentContainerStyle={{
                alignContent: 'center',
                justifyContent: 'center',
                paddingBottom: 40
              }}
            >  
              <Text className='text-2xl font-bold'>Module 1: Essentials</Text>
            
              {lessons?.map((lesson, index) => lesson !== undefined ? 
                renderLessonBadge(lesson, index) : null
              )}

              <RaisedButton 
                variant={'continue'} 
                buttonStyles="p-4" 
                onPress={() => navigation.navigate('OnDemandLesson', { language: selectedLanguage })}
              >
                <Text className=' font-bold text-white z-10'>Lesson On Demand</Text>
              </RaisedButton>
            </ScrollView>
          </>
        )}
        
      </SafeAreaView>
      </Drawer>
  )
}

export default LessonsTab