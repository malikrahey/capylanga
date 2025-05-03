import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useLanguage } from '../../hooks/useLanguage';

export const Header = ({ title, onMenuPress }) => {
  const { t } = useLanguage();

  return (
    <View className="flex-row items-center justify-between p-4 bg-blue-500">
      <TouchableOpacity onPress={onMenuPress}>
        <Text className="text-white text-xl">☰</Text>
      </TouchableOpacity>
      <Text className="text-white text-xl font-bold">{t(title)}</Text>
      <View className="w-8" />
    </View>
  );
};
