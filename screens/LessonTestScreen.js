import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { shuffleArray } from '../utils/testUtils';
import tailwind from 'tailwind-rn';

export default function LessonTestScreen({ route }) {
  const { questions } = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    setShuffledQuestions(shuffleArray([...questions]));
  }, [questions]);

  const handleAnswer = (selectedAnswer) => {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    } else {
      setShuffledQuestions([...shuffledQuestions, currentQuestion]);
    }

    if (currentQuestionIndex + 1 < shuffledQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigation.navigate('TestResults', { score, totalQuestions: questions.length });
    }
  };

  if (shuffledQuestions.length === 0) {
    return (
      <View style={tailwind('flex-1 justify-center items-center')}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  return (
    <View style={tailwind('flex-1 justify-center items-center p-4')}>
      <Text style={tailwind('text-xl font-bold mb-4')}>{currentQuestion.question}</Text>
      {currentQuestion.answers.map((answer, index) => (
        <TouchableOpacity
          key={index}
          style={tailwind('bg-blue-500 p-3 rounded-lg mb-2 w-full')}
          onPress={() => handleAnswer(answer)}
        >
          <Text style={tailwind('text-white text-center')}>{answer}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}