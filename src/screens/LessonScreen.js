import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styles } from '../styles/LessonScreen.styles';
import Button from '../components/Button';
import ProgressIndicator from '../components/ProgressIndicator';

export default function LessonScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lesson Title</Text>
        <ProgressIndicator progress={50} />
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>Lesson content goes here...</Text>
      </View>
      <View style={styles.footer}>
        <Button title="Next" onPress={() => {}} />
      </View>
    </ScrollView>
  );
}
