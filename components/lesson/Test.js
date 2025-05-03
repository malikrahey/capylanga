import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function Test({ questions, onAnswer }) {
  return (
    <View className="p-4 bg-purple-50 rounded-lg shadow-md">
      {questions.map((question, index) => (
        <View key={index} className="mb-4">
          <Text className="text-lg font-bold text-purple-800 mb-2">{question.question}</Text>
          {question.options.map((option, optionIndex) => (
            <TouchableOpacity 
              key={optionIndex} 
              onPress={() => onAnswer(index, optionIndex)}
              className="p-3 mb-2 bg-white rounded-lg border border-purple-200"
            >
              <Text className="text-purple-700">{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
}
