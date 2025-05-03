import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useLanguage } from '../../hooks/useLanguage';
import RaisedButton from '../ui/RaisedButton';

export default function Test({ questions, onComplete }) {
  const { t } = useLanguage();
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [score, setScore] = React.useState(0);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    if (option === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onComplete(score);
    }
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-2xl font-bold text-center mb-4 text-gray-800">
        {t('test')}
      </Text>
      <View className="mb-6">
        <Text className="text-lg font-semibold text-gray-700 mb-2">
          {currentQuestion.question}
        </Text>
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            className={`p-3 mb-2 rounded-lg ${selectedOption === option ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-100'}`}
            onPress={() => handleOptionSelect(option)}
            disabled={selectedOption !== null}
          >
            <Text className="text-gray-800">{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {selectedOption && (
        <RaisedButton
          onPress={handleNextQuestion}
          className="bg-blue-500 py-3 px-6 rounded-lg"
          textClassName="text-white text-center font-bold"
        >
          {currentQuestionIndex < questions.length - 1 ? t('next') : t('finish')}
        </RaisedButton>
      )}
    </View>
  );
}
