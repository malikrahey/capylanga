import { Animated, View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, ProgressBar } from 'react-native-paper';

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
  }, [words])

  return (
    <View className='flex-row space-x-4 flex-wrap w-[60%] justify-center'>
      {displayWords.map((word, index) => (
        <TouchableOpacity
        className='bg-white p-1 rounded-lg shadow-md'
        key={word}
        onPress={() => addSelectedWord(word, index)}
        onLayout={(event) => {
          const x = event.nativeEvent.layout.x;
          const y = event.nativeEvent.layout.y;
          animatedValues[word].setValue({ x, y });
        }}
      >
          <Text className='text-lg'>{word}</Text>  
        </TouchableOpacity>
      ))}
    </View>
  )
}

const Answer = ({selectedWords, removeSelectedWord, animatedValues}) => {

  return (
    <View className='flex-row flex-wrap items-center'>
      {selectedWords.map((word, index) => (
        <Animated.View
          key={word}
          style={{
            transform: animatedValues[word].getTranslateTransform(),
          }}
        >
          <TouchableOpacity className='items-center' onPress={() => removeSelectedWord(index)}>   
            <Text className='font-bold text-lg' > {word} </Text>
          </TouchableOpacity>
        </Animated.View>
      ))}
    </View>
  )
}

const Test = ({test}) => {

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
  }

  const handleSubmit = () => {
    console.log(checkAnswer(selectedWords, test[step].answer))
  }

  const checkAnswer = (selectedWordList, answer) => {
    // Combine the array into a single string separated by spaces
    const combined = selectedWordList.join(' ');
    console.log(combined)
    // Remove all punctuation and symbols other than letters and accented characters
    const cleanStr = answer.replace(/[^a-z\u00E0-\u00FF\s]/gi, '');
    console.log(cleanStr)
    // Compare the combined string to the cleaned string
    if (combined === cleanStr) {
      setIsCorrect(true);
    } else {
      setIsWrong(true);
    }
  }


  const handleNext = () => {
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
    <View>
      <ProgressBar progress={step/test.length} />
      <View className='items-center justify-evenly h-screen'>

      
      <Text className="text-lg">{test[step].prompt}</Text>

      <Answer selectedWords={selectedWords} removeSelectedWord={removeSelectedWord} animatedValues={animatedValues} />

      <WordBank words={test[step].wordBank} addSelectedWord={addSelectedWord} animatedValues={animatedValues}/>

      {!isCorrect && !isWrong && (
        <TouchableOpacity className='bg-purple-300 p-4 px-16 mb-8 rounded-2xl items-center' onPress={handleSubmit}>
          <Text className='text-xl'>Submit</Text>
        </TouchableOpacity>
      )}
      

      {isCorrect && (
        <View className='bg-green-300 p-4 justify-center px-10 rounded-xl shadow-xl'>
          <Text className='text-2xl text-center'>Correct</Text>
          <Button onPress={handleNext}>
            <Text className='text-lg'>Next</Text>
          </Button>
        </View>
      )}

      {isWrong && (
        <View className='bg-red-300 p-4 justify-center rounded-xl'>
          <Text className='text-2xl text-center'>Incorrect</Text>
          <Text className='text-lg'>Answer: {test[step].answer}</Text>
          <Button onPress={handleNext}>
            <Text className='text-lg'>Next</Text>
          </Button>
      </View>
      )}
    </View>
    </View>
  )
}

export default Test