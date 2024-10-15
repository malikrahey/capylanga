import { FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState, useLayoutEffect } from 'react'
import { ActivityIndicator, Text, View } from 'react-native';
import { PlayIcon } from 'react-native-heroicons/solid';
import { Button } from 'react-native-paper';

const TrainingTab = ({navigation}) => {
  
  const [trainingBank, setTrainingBank] = useState([]);
  const [loading, setLoading] = useState(true);


  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      tabBarIcon: ({ color, size }) => (
        <SimpleLineIcons name="book-open" color={color} size={size} />
      )
    })
  }, []);

  useEffect(() => {
    const loadTrainingBank = async () => {
      try {
        const trainingBank = await AsyncStorage.getItem('trainingBank');
        if (trainingBank) {
          setTrainingBank(JSON.parse(trainingBank));
        }
        console.log("trainingBank", trainingBank);
      } catch (error) {
        console.error(error); 
      } finally {
        setLoading(false);
      }
    };

    loadTrainingBank();
  }, []);

  const handleStartTraining = () => {
    
    // select a random selection of cards from the training bank
    const sessionCards = [];
    for (let i = 0; i < 10; i++) {
      if (trainingBank.length === 0) {
        break;
      }
      const randomIndex = Math.floor(Math.random() * trainingBank.length);
      const card = trainingBank[randomIndex];
      trainingBank.splice(randomIndex, 1);
      sessionCards.push(card);
    }

    navigation.navigate("Training", {sessionCards});
  };

  return (
    <View className='items-center h-full justify-center w-full'>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          {trainingBank.length === 0 ? (
            <Text className='text-2xl font-bold m-2'>No Training Bank, complete some lessons to build you training library</Text>
          ) : (
            <View>
              <Button onPress={handleStartTraining}>
                <PlayIcon size={24} color='black' />
              </Button>
              <Text>You have {trainingBank.length} training cards</Text>
            </View>
          )}
        </>
      )}
    </View>
  )
}

export default TrainingTab