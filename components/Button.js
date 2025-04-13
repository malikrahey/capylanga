import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function Button({ title, onPress }) {
  return (
    <TouchableOpacity
      className="bg-primary py-3 px-6 rounded-lg items-center justify-center"
      onPress={onPress}
    >
      <Text className="text-white font-semibold text-lg">{title}</Text>
    </TouchableOpacity>
  );
}
