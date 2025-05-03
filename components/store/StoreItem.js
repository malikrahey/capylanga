import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useLanguage } from '../../hooks/useLanguage';

export const StoreItem = ({ item, onPress }) => {
  const { t } = useLanguage();

  return (
    <TouchableOpacity
      onPress={onPress}
      className="p-4 m-2 bg-white rounded-lg shadow-md"
    >
      <Image source={{ uri: item.image }} className="w-full h-40 rounded-lg mb-2" />
      <Text className="text-lg font-bold">{t(item.name)}</Text>
      <Text className="text-gray-600">{t(item.description)}</Text>
      <Text className="text-blue-500 mt-2">{t('Price')}: {item.price}</Text>
    </TouchableOpacity>
  );
};
