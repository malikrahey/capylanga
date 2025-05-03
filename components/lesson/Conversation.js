import React from 'react';
import { View, Text } from 'react-native';
import { useLanguage } from '../../hooks/useLanguage';

export const Conversation = ({ messages }) => {
  const { t } = useLanguage();

  return (
    <View className="flex-1 p-4 bg-gray-100">
      {messages.map((message, index) => (
        <View
          key={index}
          className={`mb-4 p-3 rounded-lg ${message.isUser ? 'bg-blue-500 self-end' : 'bg-white self-start'}`}
        >
          <Text className={message.isUser ? 'text-white' : 'text-black'}>
            {t(message.text)}
          </Text>
        </View>
      ))}
    </View>
  );
};
