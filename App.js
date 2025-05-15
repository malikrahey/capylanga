import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LanguageProvider from './providers/LanguageProvider';
import { NavigationContainer } from '@react-navigation/native';
import LessonScreen from './screens/LessonScreen';
import AIConversationScreen from './screens/AIConversationScreen';
import TrainingScreen from './screens/TrainingScreen';
import OnDemandLessonScreen from './screens/OnDemandLessonScreen';
import LessonCompleteScreen from './screens/LessonCompleteScreen';

export default function App() {

  const Stack = createStackNavigator();


  return (
    <NavigationContainer>
      <LanguageProvider>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Lesson" component={LessonScreen} />
          <Stack.Screen name="AIConversation" component={AIConversationScreen} />
          <Stack.Screen name="TrainingScreen" component={TrainingScreen} />
          <Stack.Screen name="OnDemandLesson" component={OnDemandLessonScreen} />
          <Stack.Screen 
            name="LessonComplete" 
            component={LessonCompleteScreen}
            options={{
              headerShown: false
            }}
          />
        </Stack.Navigator>
      </LanguageProvider>
    </NavigationContainer>
  );
}

