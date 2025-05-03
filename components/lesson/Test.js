import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useLanguage } from '../../hooks/useLanguage';

export const Test = ({ question, options, onAnswer }) => {
  const { t } = useLanguage();

  return (
    <View className="p-4 bg-gray-100 rounded-lg">
      <Text className="text-lg font-bold mb-4">{t(question)}</Text>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onAnswer(option.isCorrect)}
          className="p-3 mb-2 bg-white rounded-lg"
        >
          <Text className="text-lg">{t(option.text)}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
