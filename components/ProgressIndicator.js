import React from 'react';
import { View, Text } from 'react-native';
import lessonStyles from '../styles/lessonStyles';

const ProgressIndicator = () => {
  return (
    <View style={lessonStyles.progressContainer}>
      <Text>Progress: 50%</Text>
    </View>
  );
};

export default ProgressIndicator;
