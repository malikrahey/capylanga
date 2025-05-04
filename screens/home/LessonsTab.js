import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLanguage } from '../../hooks/useLanguage';
import LessonSelectBadge from '../../components/home/LessonSelectBadge';
import Card from '../../components/ui/Card';

export default function LessonsTab() {
  const { t } = useLanguage();

  return (
    <View className="flex-1 bg-blue-50 p-4">
      <Text className="text-2xl font-bold text-blue-800 mb-4">{t('lessons')}</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Card className="mb-4">
          <Text className="text-lg font-semibold text-blue-700">{t('introductions')}</Text>
          <LessonSelectBadge lessonId="1.0_introductions" />
        </Card>
        <Card className="mb-4">
          <Text className="text-lg font-semibold text-blue-700">{t('ordering_food')}</Text>
          <LessonSelectBadge lessonId="1.1_ordering_food" />
        </Card>
      </ScrollView>
    </View>
  );
}
