import React from 'react';
import { View, Text } from 'react-native';

export const Card = ({ children, style }) => {
  return (
    <View className={`p-4 bg-white rounded-lg shadow-md ${style}`}>
      {children}
    </View>
  );
};
