import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useLanguage } from '../../hooks/useLanguage';

export const SideMenuContent = ({ onClose, navigation }) => {
  const { t } = useLanguage();

  return (
    <View className="flex-1 bg-white p-4">
      <TouchableOpacity onPress={onClose} className="self-end mb-4">
        <Text className="text-xl">✕</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Home');
          onClose();
        }}
        className="p-4 border-b border-gray-200"
      >
        <Text className="text-lg">{t('Home')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Lessons');
          onClose();
        }}
        className="p-4 border-b border-gray-200"
      >
        <Text className="text-lg">{t('Lessons')}</Text>
      </TouchableOpacity>
    </View>
  );
};
