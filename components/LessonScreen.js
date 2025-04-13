import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import Button from './Button';
import Divider from './Divider';
import MediaElement from './MediaElement';
import ScrollableContent from './ScrollableContent';

export default function LessonScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollableContent>
        <View className="p-4">
          <Text className="text-2xl font-bold text-gray-800 mb-2">Lesson Title</Text>
          <Divider />
          <Text className="text-lg text-gray-600 mb-4">
            This is the lesson content. It can be as long as needed and will scroll if it exceeds the screen height.
          </Text>
          <MediaElement />
          <View className="mt-6">
            <Button title="Next" onPress={() => {}} />
          </View>
        </View>
      </ScrollableContent>
    </SafeAreaView>
  );
}
