import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function RaisedButton({ children, className, onPress }) {
  return (
    <TouchableOpacity 
      className={`${className} items-center justify-center shadow-sm`}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
}
