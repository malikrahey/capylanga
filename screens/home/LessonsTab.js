import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLanguage } from '../../hooks/useLanguage';
import LessonSelectBadge from '../../components/home/LessonSelectBadge';

const LessonsTab = () => {
  const { language } = useLanguage();

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold text-gray-800 mb-4">Lessons</Text>
      <ScrollView className="flex-1">
        <View className="flex-row flex-wrap justify-between">
          <LessonSelectBadge 
            title="Introductions" 
            level="1.0" 
            language={language} 
            className="mb-4"
          />
          <LessonSelectBadge 
            title="Ordering Food" 
            level="1.1" 
            language={language} 
            className="mb-4"
          />
          <LessonSelectBadge 
            title="Asking for Help" 
            level="1.2" 
            language={language} 
            className="mb-4"
          />
          <LessonSelectBadge 
            title="Making Connections" 
            level="1.3" 
            language={language} 
            className="mb-4"
          />
          <LessonSelectBadge 
            title="Planning the Future" 
            level="1.4" 
            language={language} 
            className="mb-4"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default LessonsTab;