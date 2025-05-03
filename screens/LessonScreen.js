import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Conversation from '../components/lesson/Conversation';
import Test from '../components/lesson/Test';

export default function LessonScreen({ route }) {
  const { lesson } = route.params;
  
  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <View className="mb-6 bg-white p-5 rounded-xl shadow-lg">
        <Text className="text-2xl font-bold text-gray-800 mb-2">{lesson.title}</Text>
        <Text className="text-gray-600 mb-4">{lesson.description}</Text>
      </View>
      
      <View className="mb-6">
        <Text className="text-xl font-semibold text-gray-700 mb-3">Conversation</Text>
        <Conversation messages={lesson.conversation} />
      </View>
      
      <View className="mb-6">
        <Text className="text-xl font-semibold text-gray-700 mb-3">Test Your Knowledge</Text>
        <Test questions={lesson.questions} onAnswer={() => {}} />
      </View>
    </ScrollView>
  );
}
