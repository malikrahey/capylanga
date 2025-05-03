import React from 'react';
import { View, Text } from 'react-native';

export default function Conversation({ messages }) {
  return (
    <View className="flex-1 p-4 bg-blue-50 rounded-lg shadow-md">
      {messages.map((message, index) => (
        <View 
          key={index} 
          className={`mb-3 p-3 rounded-lg ${message.role === 'user' ? 'bg-blue-100 self-end' : 'bg-green-100 self-start'}`}
        >
          <Text className={`text-sm ${message.role === 'user' ? 'text-blue-800' : 'text-green-800'}`}>
            {message.content}
          </Text>
        </View>
      ))}
    </View>
  );
}
