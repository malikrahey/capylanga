import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Conversation } from '../components/lesson/Conversation';
import { Test } from '../components/lesson/Test';
import { useLanguage } from '../hooks/useLanguage';

export const LessonScreen = ({ route }) => {
  const { lesson } = route.params;
  const { currentLanguage } = useLanguage();

  return (
    <View style={styles.container}>
      {lesson.type === 'conversation' ? (
        <Conversation conversation={lesson.content} />
      ) : (
        <Test questions={lesson.content} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
});