import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useLanguage } from '../../hooks/useLanguage';

export const RaisedButton = ({ onPress, title, style }) => {
  const { t } = useLanguage();

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`p-3 bg-blue-500 rounded-lg shadow-md ${style}`}
    >
      <Text className="text-white text-center text-lg">{t(title)}</Text>
    </TouchableOpacity>
  );
};
