import React from 'react';
import { View, Text } from 'react-native';
import { Card } from '../ui/Card';

export default function Test({ lessonId }) {
  return (
    <Card className="mb-4 p-4 bg-white rounded-lg shadow-md">
      <Text className="text-xl font-semibold text-blue-800 mb-2">Test Your Knowledge</Text>
      <View className="space-y-2">
        <Text className="text-base text-gray-700">Translate: Hello</Text>
      </View>
    </Card>
  );
}
