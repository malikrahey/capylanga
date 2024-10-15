import { View, Text } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LessonsTab from './home/LessonsTab';
import { SparklesIcon } from "react-native-heroicons/solid";
import StoreTab from './home/StoreTab';
import { FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import useLanguage from '../hooks/useLanguage';
import FarmTab from './home/FarmTab';
import ConversationsTab from './home/ConversationsTab';
import TrainingTab from './home/TrainingTab';

const HomeScreen = ({navigation}) => {

  const Tab = createBottomTabNavigator();
  const {selectedLanguage} = useLanguage();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, 
    })
  }, [])


  return (
    <>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Lessons') {
            iconName = 'book-open'
          } else if (route.name === 'Store') {
            return <FontAwesome name="shopping-bag" size={size} color={color} />
          } else if (route.name === 'Conversations') {
            return <SimpleLineIcons name="bubble" color={color} size={size} />;
          }

          // You can return any component that you like here!
          return <SimpleLineIcons name="book-open" color={color} size={size} />;
        },
        tabBarActiveTintColor: 'purple',
        tabBarInactiveTintColor: 'gray',
      })}> 
      <Tab.Screen name="Lessons" component={LessonsTab} key={selectedLanguage}/>
      <Tab.Screen name="Store" component={StoreTab} />
      <Tab.Screen name="Farm" component={FarmTab} />
      <Tab.Screen name="Conversations" component={ConversationsTab} />
      <Tab.Screen name="Training" component={TrainingTab} />
    </Tab.Navigator>
    </>
  )
}

export default HomeScreen