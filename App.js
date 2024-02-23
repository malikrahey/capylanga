import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LanguageProvider from './providers/LanguageProvider';
import { NavigationContainer } from '@react-navigation/native';
import LessonScreen from './screens/LessonScreen';

export default function App() {

  const Stack = createStackNavigator();

  const [lessons, setLessons] = useState(null);
  const [loading, setLoading] = useState(true);


  return (
    <NavigationContainer>
      <LanguageProvider>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Lesson" component={LessonScreen} />
        </Stack.Navigator>
      </LanguageProvider>
    </NavigationContainer>
  );
}

