import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLanguage } from '../hooks/useLanguage';
import { Card } from '../components/ui/Card';
import { RaisedButton } from '../components/ui/RaisedButton';
import Conversation from '../components/lesson/Conversation';
import Test from '../components/lesson/Test';

export default function LessonScreen({ route }) {
  const { language } = useLanguage();
  const { lessonId } = route.params;

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.title}>Lesson {lessonId}</Text>
        <Conversation />
        <Test />
        <RaisedButton style={styles.button} onPress={() => console.log('Complete Lesson')}>
          Complete Lesson
        </RaisedButton>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  card: {
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1a365d',
  },
  button: {
    marginTop: 20,
  },
});