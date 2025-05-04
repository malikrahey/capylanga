import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useLanguage } from '../../hooks/useLanguage';

export default function LessonSelectBadge({ lesson, onPress }) {
  const { t } = useLanguage();

  return (
    <TouchableOpacity onPress={onPress}>
      <View className="bg-blue-500 p-4 m-2 rounded-full">
        <Text className="text-white text-center font-bold">{t(lesson.title)}</Text>
      </View>
    </TouchableOpacity>
  );
}
