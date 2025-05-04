import React from 'react';
import { View } from 'react-native';

export default function Card({ children, className = '' }) {
  return (
    <View className={`${className}`}>
      {children}
    </View>
  );
}
