import React from 'react';
import { storiesOf } from '@storybook/react-native';
import LessonScreen from './LessonScreen';

export default {
  title: 'LessonScreen',
};

export const Default = () => <LessonScreen navigation={{ goBack: () => {} }} />;

storiesOf('LessonScreen', module).add('default', Default);
