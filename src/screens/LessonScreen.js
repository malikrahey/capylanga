import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { lessonStyles } from '../styles/lessonStyles';

export default function LessonScreen() {
  return (
    <ScrollView style={lessonStyles.container}>
      <View style={lessonStyles.header}>
        <Text style={lessonStyles.title}>Lesson Title</Text>
      </View>
      <View style={lessonStyles.content}>
        <Text style={lessonStyles.text}>Lesson content goes here...</Text>
      </View>
    </ScrollView>
  );
}
