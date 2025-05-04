import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Conversation = ({ messages, onPress }) => {
  return (
    <View className="flex-1 p-4 bg-white rounded-lg shadow-md">
      <ScrollView className="flex-1 mb-4">
        {messages.map((message, index) => (
          <View 
            key={index} 
            className={`mb-2 p-3 rounded-lg ${message.isUser ? 'bg-blue-100 self-end' : 'bg-gray-200 self-start'}`}
          >
            <Text className={`text-sm ${message.isUser ? 'text-blue-800' : 'text-gray-800'}`}>
              {message.text}
            </Text>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity 
        onPress={onPress}
        className="bg-blue-500 py-2 px-4 rounded-lg items-center"
      >
        <Text className="text-white font-bold">Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Conversation;