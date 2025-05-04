import React from 'react';
import { View, TouchableOpacity } from 'react-native';

export default function Card({ children, className = '', ...props }) {
  return (
    <TouchableOpacity activeOpacity={0.8} {...props}>
      <View className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
        {children}
      </View>
    </TouchableOpacity>
  );
}
