import { View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const AIConversationScreen = ({ route, navigation }) => {
  const { topic } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    setMessages([...messages, { text: newMessage, sender: 'user' }]);
    setNewMessage('');
  };

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-lg font-bold mb-4">{topic.title}</Text>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View className={`bg-${item.sender === 'user' ? 'purple-100' : 'gray-100'} p-4 rounded-lg mb-4`}>
            <Text className="text-lg">{item.text}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View className="flex-row mb-4">
        <TextInput
          className="bg-gray-100 p-4 rounded-lg flex-1"
          placeholder="Type a message..."
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
        />
        <TouchableOpacity
          className="bg-purple-500 p-4 rounded-lg ml-4"
          onPress={handleSendMessage}
        >
          <Text className="text-white">Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default AIConversationScreen