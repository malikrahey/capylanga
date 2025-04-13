import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LessonContent from './LessonContent';
import ProgressIndicator from './ProgressIndicator';
import lessonStyles from '../styles/lessonStyles';

const LessonScreen = ({ navigation }) => {
  return (
    <View style={lessonStyles.container}>
      <Text style={lessonStyles.header}>Lesson Title</Text>
      <LessonContent />
      <ProgressIndicator />
      <TouchableOpacity style={lessonStyles.button} onPress={() => navigation.goBack()}>
        <Text style={lessonStyles.buttonText}>Back to Lessons</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LessonScreen;
