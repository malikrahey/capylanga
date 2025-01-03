import { Animated, View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, ProgressBar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RaisedButton from '../ui/RaisedButton';

const WordBank = ({words, addSelectedWord, animatedValues}) => {

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
    <View className='flex-row flex-wrap justify-center'>
      {displayWords.map((word, index) => (
        <TouchableOpacity
        className='bg-white p-2 rounded-lg shadow-md m-2 border border-b-4 '
        key={word}
        onPress={() => addSelectedWord(word, index)}
        onLayout={(event) => {
          const x = event.nativeEvent.layout.x;
          const y = event.nativeEvent.layout.y;
          animatedValues[word].setValue({ x, y });
        }}
      >
          <Text className='text-lg text-gray-800'>{word}</Text>  
        </TouchableOpacity>
      ))}
    </View>
  )
}

const Answer = ({selectedWords, removeSelectedWord, animatedValues}) => {

  return (
    <View className='flex-row flex-wrap items-center justify-center'>
      {selectedWords.map((word, index) => (
        <Animated.View
          key={index}
          style={{
            transform: animatedValues[word].getTranslateTransform(),
          }}
        >
          <TouchableOpacity className='items-center' onPress={() => removeSelectedWord(index)}>   
            <Text className='font-bold text-lg text-gray-800' > {word} </Text>
          </TouchableOpacity>
        </Animated.View>
      ))}
    </View>
  )
}

const Test = ({test, isTraining = false}) => {

  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState('');
  const [selectedWords, setSelectedWords] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [animatedValues, setAnimatedValues] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    const animatedValuesObj = {};
    test[step].wordBank.forEach((word) => {
      animatedValuesObj[word] = new Animated.ValueXY();
    });
    setAnimatedValues(animatedValuesObj);
  }, [test, step]);

  const addSelectedWord = (word, index) => {
    setSelectedWords([...selectedWords, word]);
    setAnswer(`${answer} ${word}`);
    const x = index * 50; // assuming each word is 50 units wide
    const y = 200; // assuming the word bank is 200 units below the answer
    animatedValues[word].setValue({ x, y }); // initialize the position of the word
    Animated.spring(animatedValues[word], {
      toValue: { x: 0, y: 0 }, // animate to the position of the answer section
      useNativeDriver: true,
    }).start();
  }

  const removeSelectedWord = (index) => {
    const newWords = [...selectedWords]
    newWords.splice(index, 1);
    setSelectedWords(newWords);
  };

  const addToTrainingBank= async () => {
    if (isTraining) return;

    try {
      const trainingBank = await AsyncStorage.getItem('trainingBank');
      if (!trainingBank) {
          await AsyncStorage.setItem('trainingBank', JSON.stringify([test[step]]));
        } else {

          const parsedTrainingBank = JSON.parse(trainingBank);
          parsedTrainingBank.forEach((item) => {
            if (item.prompt === test[step].prompt) {
              return;
            }
          });

          parsedTrainingBank.push(test[step]);
          await AsyncStorage.setItem('trainingBank', JSON.stringify(parsedTrainingBank));
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
      navigation.navigate("Home")
      return;
    }
    setIsCorrect(false);
    setIsWrong(false);
    setStep(step+1);
    setSelectedWords([]);
  }
  

  return (
    <View className='h-screen bg-gray-100'>
      <ProgressBar progress={step/test.length} />
      <View className='flex-1 justify-center items-center p-4'>
      
      <Text className="text-lg text-gray-800 mb-8">{test[step].prompt}</Text>

      <Answer selectedWords={selectedWords} removeSelectedWord={removeSelectedWord} animatedValues={animatedValues} />

      <View className='h-16'></View>

      <WordBank words={test[step].wordBank} addSelectedWord={addSelectedWord} animatedValues={animatedValues}/>

      <View className='h-16'></View>

      {!isCorrect && !isWrong && (
        <RaisedButton onPress={handleSubmit} variant="continue" buttonStyles="flex w-32 h-12 items-center">
          <Text className='m-auto justify-center text-xl font-bold'>Submit</Text>
        </RaisedButton>
      )}
      

      {isCorrect && (
        <View className='bg-green-600 py-4 px-10 rounded-full shadow-xl'>
          <Text className='text-2xl text-white text-center font-bold'>Correct</Text>
          <TouchableOpacity className='bg-green-800 py-2 px-4 rounded-full items-center' onPress={handleNext}>
            <Text className='text-lg text-white font-bold'>Next</Text>
          </TouchableOpacity>
        </View>
      )}

      {isWrong && (
        <View className='bg-red-600 py-4 px-10 rounded-full'>
          <Text className='text-2xl text-white text-center font-bold'>Incorrect</Text>
          <Text className='text-lg text-white'>Answer: {test[step].answer}</Text>
          <TouchableOpacity className='bg-red-800 py-2 px-4 rounded-full items-center' onPress={handleNext}>
            <Text className='text-lg text-white font-bold'>Next</Text>
          </TouchableOpacity>
      </View>
      )}
    </View>
    </View>
  )
}

export default Test