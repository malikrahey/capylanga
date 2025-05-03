import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function RaisedButton({ children, onPress, className, textClassName }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${className} shadow-md`}
      activeOpacity={0.7}
    >
      <Text className={textClassName}>{children}</Text>
    </TouchableOpacity>
  );
}
