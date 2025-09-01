import { Animated, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, ProgressBar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RaisedButton from '../ui/RaisedButton';
import { STORAGE_KEYS } from '../../utils/constants';

const WordBank = ({words, addSelectedWord}) => {

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const [displayWords, setDisplayWords] = useState([]);

  useEffect(() => {
    setDisplayWords(shuffleArray(words));
  }, [words]);

  return (
    <View className='flex-row flex-wrap justify-center px-4'>
      {displayWords.map((word, index) => (
        <TouchableOpacity
          className='bg-white p-3 rounded-xl shadow-lg m-2 border border-gray-100 active:bg-gray-50'
          key={index}
          onPress={() => addSelectedWord(word)}
        >
          <Text className='text-lg text-gray-800 font-medium'>{word}</Text>  
        </TouchableOpacity>
      ))}
    </View>
  )
}

const Answer = ({selectedWords, removeSelectedWord}) => {
  return (
    <View className='w-full min-h-[120px] bg-gray-50 rounded-2xl mx-4 p-4 shadow-sm'>
      <View className='flex-row flex-wrap items-start justify-start w-full gap-2'>
        {selectedWords.map((word, index) => (
          <View key={`${word}-${index}`}>
            <TouchableOpacity 
              className='items-center bg-white px-4 py-2 rounded-lg shadow-sm active:bg-gray-50' 
              onPress={() => removeSelectedWord(index)}
            >   
              <Text className='font-semibold text-lg text-gray-800 whitespace-nowrap'>{word}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  )
}

const Test = ({test, isTraining = false, onComplete}) => {

  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState('');
  const [selectedWords, setSelectedWords] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const navigation = useNavigation();

  const addSelectedWord = (word) => {
    setSelectedWords([...selectedWords, word]);
    setAnswer(`${answer} ${word}`);
  }

  const removeSelectedWord = (index) => {
    const newWords = [...selectedWords];
    newWords.splice(index, 1);
    setSelectedWords(newWords);
  };

  const addToTrainingBank= async () => {
    if (isTraining) return;

    try {
      const trainingBank = await AsyncStorage.getItem(STORAGE_KEYS.TRAINING_BANK);
      if (!trainingBank) {
          await AsyncStorage.setItem(STORAGE_KEYS.TRAINING_BANK, JSON.stringify([test[step]]));
        } else {

          const parsedTrainingBank = JSON.parse(trainingBank);
          parsedTrainingBank.forEach((item) => {
            if (item.prompt === test[step].prompt) {
              return;
            }
          });

          parsedTrainingBank.push(test[step]);
          await AsyncStorage.setItem(STORAGE_KEYS.TRAINING_BANK, JSON.stringify(parsedTrainingBank));
      }
    }
    catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = () => {
    console.log(checkAnswer(selectedWords, test[step].answer))
  }

  const checkAnswer = (selectedWordList, answer) => {
    // Combine the array into a single string separated by spaces
    const combined = selectedWordList.join(' ');
    const cleanCombined = combined.replace(/[^a-z\u00E0-\u00FF\s]/gi, '');
    // Remove all punctuation and symbols other than letters and accented characters
    const cleanStr = answer.replace(/[^a-z\u00E0-\u00FF\s]/gi, '');
    console.log(cleanStr)
    // Compare the combined string to the cleaned string
    if (cleanCombined === cleanStr) {
      setIsCorrect(true);
    } else {
      setIsWrong(true);
    }
  }


  const handleNext = () => {
    
    addToTrainingBank();
    if (step >= test.length-1) {
      if (onComplete) {
        onComplete();
      } else {
        navigation.navigate("Home")
      }
      return;
    }
    setIsCorrect(false);
    setIsWrong(false);
    setStep(step+1);
    setSelectedWords([]);
  }
  

  return (
    <View className='h-screen bg-white flex-1'>
      <View className='px-4 pt-4'>
        <ProgressBar 
          animatedValue={step/test.length} 
          color="#4F46E5"
          className='h-2 rounded-full'
        />
      </View>
      
      <ScrollView 
        className='flex-1'
        contentContainerStyle={{
          paddingBottom: 20
        }}
      >
        <View className='justify-start items-center p-6'>
          <Text className="text-xl text-gray-800 mb-8 font-semibold text-center leading-relaxed">
            {test[step].prompt}
          </Text>

          <View className='w-full mb-8'>
            <Answer 
              selectedWords={selectedWords} 
              removeSelectedWord={removeSelectedWord}
            />
          </View>

          <WordBank 
            words={test[step].wordBank} 
            addSelectedWord={addSelectedWord}
          />
        </View>
      </ScrollView>

      {/* Fixed bottom button area */}
      <View className='px-6 pb-8 pt-4 bg-white border-t border-gray-100'>
        {!isCorrect && !isWrong && (
          <RaisedButton 
            onPress={handleSubmit} 
            variant="continue" 
            buttonStyles="flex w-full h-14 items-center rounded-xl shadow-lg"
          >
            <Text className='m-auto justify-center text-xl font-bold text-black'>Submit</Text>
          </RaisedButton>
        )}

        {isCorrect && (
          <View className='bg-green-500 py-6 px-6 rounded-2xl shadow-xl'>
            <Text className='text-2xl text-white text-center font-bold mb-4'>Correct!</Text>
            <TouchableOpacity 
              className='bg-white py-3 px-6 rounded-xl items-center' 
              onPress={handleNext}
            >
              <Text className='text-lg text-green-600 font-bold'>Next Question</Text>
            </TouchableOpacity>
          </View>
        )}

        {isWrong && (
          <View className='bg-red-500 py-6 px-6 rounded-2xl shadow-xl'>
            <Text className='text-2xl text-white text-center font-bold mb-2'>Incorrect</Text>
            <Text className='text-lg text-white text-center mb-4'>Answer: {test[step].answer}</Text>
            <TouchableOpacity 
              className='bg-white py-3 px-6 rounded-xl items-center' 
              onPress={handleNext}
            >
              <Text className='text-lg text-red-600 font-bold'>Next Question</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  )
}

export default Test