import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Test = ({ question, options, onSelect }) => {
  return (
    <View className="flex-1 p-4 bg-white rounded-lg shadow-md">
      <Text className="text-lg font-bold text-gray-800 mb-4">{question}</Text>
      {options.map((option, index) => (
        <TouchableOpacity 
          key={index} 
          onPress={() => onSelect(option)}
          className="mb-2 p-3 bg-gray-100 rounded-lg"
        >
          <Text className="text-gray-800">{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Test;