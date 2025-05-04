import React from 'react';
import { View, Text } from 'react-native';
import { Card } from '../ui/Card';

export default function Conversation({ lessonId }) {
  return (
    <Card className="mb-4 p-4 bg-white rounded-lg shadow-md">
      <Text className="text-xl font-semibold text-blue-800 mb-2">Conversation</Text>
      <View className="space-y-2">
        <Text className="text-base text-gray-700">Hello, how are you?</Text>
        <Text className="text-base text-gray-700">I'm good, thank you!</Text>
      </View>
    </Card>
  );
}
