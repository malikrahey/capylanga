import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function RaisedButton({ text, onPress, className = '' }) {
  return (
    <TouchableOpacity 
      className={`${className} bg-blue-600 py-3 px-6 rounded-lg shadow-md items-center justify-center`}
      onPress={onPress}
    >
      <Text className="text-white text-lg font-semibold">{text}</Text>
    </TouchableOpacity>
  );
}
