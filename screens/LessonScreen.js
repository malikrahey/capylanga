import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useLanguage } from '../hooks/useLanguage';
import Conversation from '../components/lesson/Conversation';
import Test from '../components/lesson/Test';
import { Card } from '../components/ui/Card';
import { RaisedButton } from '../components/ui/RaisedButton';

export default function LessonScreen({ route }) {
  const { language } = useLanguage();
  const { lessonId } = route.params;

  return (
    <ScrollView className="flex-1 bg-blue-50 p-4">
      <Card className="mb-4 p-4 bg-white rounded-lg shadow-md">
        <Text className="text-2xl font-bold text-blue-800 mb-2">Lesson {lessonId}</Text>
        <Text className="text-lg text-blue-600">Learn new phrases in {language}</Text>
      </Card>

      <Conversation lessonId={lessonId} />
      <Test lessonId={lessonId} />

      <View className="mt-4">
        <RaisedButton text="Complete Lesson" onPress={() => console.log('Lesson completed')} />
      </View>
    </ScrollView>
  );
}
