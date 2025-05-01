import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useLanguage } from '../../hooks/useLanguage';
import RaisedButton from '../ui/RaisedButton';

const Test = ({ questions, onComplete }) => {
  const { t } = useLanguage();

  return (
    <View className="flex-1 p-4 bg-gray-100">
      <Text className="text-2xl font-bold text-center mb-6 text-gray-800">{t('test.title')}</Text>
      {questions.map((question, index) => (
        <View key={index} className="mb-6 p-4 bg-white rounded-lg shadow">
          <Text className="text-lg font-semibold text-gray-700 mb-2">{question.question}</Text>
          {question.options.map((option, optionIndex) => (
            <TouchableOpacity
              key={optionIndex}
              className="p-3 my-1 bg-blue-50 rounded border border-blue-100"
              onPress={() => {}}
            >
              <Text className="text-blue-800">{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
      <RaisedButton onPress={onComplete} className="mt-4">
        {t('test.submit')}
      </RaisedButton>
    </View>
  );
};

export default Test;