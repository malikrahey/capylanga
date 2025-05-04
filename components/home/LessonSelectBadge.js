import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useLanguage } from '../../hooks/useLanguage';

export default function LessonSelectBadge({ lessonId }) {
  const { t } = useLanguage();

  return (
    <TouchableOpacity className="mt-2">
      <View className="bg-blue-100 rounded-full px-4 py-2">
        <Text className="text-blue-800 font-medium">{t('start_lesson')}</Text>
      </View>
    </TouchableOpacity>
  );
}
