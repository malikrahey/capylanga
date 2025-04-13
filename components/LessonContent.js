import React from 'react';
import { View, Text } from 'react-native';
import lessonStyles from '../styles/lessonStyles';

const LessonContent = () => {
  return (
    <View style={lessonStyles.contentContainer}>
      <Text>This is the lesson content. It can be as long or as short as needed.</Text>
    </View>
  );
};

export default LessonContent;
