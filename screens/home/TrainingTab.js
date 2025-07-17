import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useCallback } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import RaisedButton from '../../components/ui/RaisedButton';
import { STORAGE_KEYS } from '../../utils/constants';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const TrainingTab = ({navigation}) => {
  const [trainingBank, setTrainingBank] = useState([]);
  const [isTraining, setIsTraining] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const loadTrainingBank = async () => {
        try {
          const trainingBank = await AsyncStorage.getItem(STORAGE_KEYS.TRAINING_BANK);
          if (trainingBank) {
            setTrainingBank(JSON.parse(trainingBank));
          }
        } catch (error) {
          console.log(error);
        }
      };
      loadTrainingBank();
    }, [])
  );

  const handleStartTraining = () => {
    setIsTraining(true);
  };

  return (
    <View className='items-center h-full justify-center w-full'>
      {isTraining ? (
        <View className="flex flex-col p-4">
          <RaisedButton onPress={handleStartTraining} buttonStyles={"flex flex-col justify-evenly bg-white p-8 mb-4"}>
            <MaterialCommunityIcons name="weight-lifter" size={48} color="black" />
            <Text>Start Training</Text>
          </RaisedButton>
          <Text className="text-lg">You have {trainingBank.length} training cards</Text>
        </View>
      ) : (
        <View className='items-center h-full justify-center w-full'>
          {trainingBank.length === 0 ? (
            <Text className='text-2xl font-bold m-2'>No Training Bank, complete some lessons to build you training library</Text>
          ) : (
            <View className="flex flex-col p-4">
              <RaisedButton onPress={handleStartTraining} buttonStyles={"flex flex-col justify-evenly bg-white p-8 mb-4"}>
                <MaterialCommunityIcons name="weight-lifter" size={48} color="black" />
                <Text>Start Training</Text>
              </RaisedButton>
              <Text className="text-lg">You have {trainingBank.length} training cards</Text>
            </View>
          )}
        </View>
      )}
    </View>
  )
}

export default TrainingTab