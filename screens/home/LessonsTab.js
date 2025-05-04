import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLanguage } from '../../hooks/useLanguage';
import LessonSelectBadge from '../../components/home/LessonSelectBadge';

export default function LessonsTab() {
  const { t } = useLanguage();

  return (
    <View className="flex-1 bg-blue-50 p-4">
      <Text className="text-2xl font-bold text-blue-800 mb-4">{t('lessons')}</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row flex-wrap justify-between">
          <LessonSelectBadge
            title={t('introductions')}
            description={t('introductionsDescription')}
            icon="handshake"
            color="bg-blue-200"
            textColor="text-blue-800"
          />
          <LessonSelectBadge
            title={t('orderingFood')}
            description={t('orderingFoodDescription')}
            icon="utensils"
            color="bg-green-200"
            textColor="text-green-800"
          />
          <LessonSelectBadge
            title={t('askingForHelp')}
            description={t('askingForHelpDescription')}
            icon="question-circle"
            color="bg-yellow-200"
            textColor="text-yellow-800"
          />
          <LessonSelectBadge
            title={t('makingConnections')}
            description={t('makingConnectionsDescription')}
            icon="users"
            color="bg-purple-200"
            textColor="text-purple-800"
          />
          <LessonSelectBadge
            title={t('planningTheFuture')}
            description={t('planningTheFutureDescription')}
            icon="calendar"
            color="bg-red-200"
            textColor="text-red-800"
          />
        </View>
      </ScrollView>
    </View>
  );
}
