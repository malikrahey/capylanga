import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useLanguage } from '../../hooks/useLanguage';

export const LessonSelectBadge = ({ lesson, onPress, isSelected }) => {
  const { t } = useLanguage();

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`p-4 m-2 rounded-lg ${isSelected ? 'bg-blue-500' : 'bg-gray-200'}`}
    >
      <Text className={`text-lg ${isSelected ? 'text-white' : 'text-black'}`}>
        {t(lesson.title)}
      </Text>
    </TouchableOpacity>
  );
};
