import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const RaisedButton = ({ children, onPress, className = '' }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`py-3 px-6 bg-blue-500 rounded-lg shadow-lg ${className}`}
      activeOpacity={0.7}
    >
      <Text className="text-white text-center font-bold text-lg">{children}</Text>
    </TouchableOpacity>
  );
};

export default RaisedButton;