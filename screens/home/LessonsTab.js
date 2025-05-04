import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLanguage } from '../../hooks/useLanguage';
import LessonSelectBadge from '../../components/home/LessonSelectBadge';
import Card from '../../components/ui/Card';

export default function LessonsTab() {
  const { t } = useLanguage();

  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView className="p-4">
        <Text className="text-2xl font-bold text-gray-800 mb-4">{t('lessons')}</Text>
        <Card className="mb-4">
          <Text className="text-lg font-semibold text-gray-700 mb-2">{t('beginner')}</Text>
          <View className="flex-row flex-wrap">
            <LessonSelectBadge title={t('introductions')} level="1.0" />
            <LessonSelectBadge title={t('ordering_food')} level="1.1" />
          </View>
        </Card>
        <Card className="mb-4">
          <Text className="text-lg font-semibold text-gray-700 mb-2">{t('intermediate')}</Text>
          <View className="flex-row flex-wrap">
            <LessonSelectBadge title={t('asking_for_help')} level="2.0" />
            <LessonSelectBadge title={t('making_connections')} level="2.1" />
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}
