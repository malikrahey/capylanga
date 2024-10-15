import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'

const topics = [
  { id: 1, title: 'Ordering Food' },
  { id: 2, title: 'Checking into a hotel' },
  { id: 3, title: 'Introducing yourself' },
  { id: 4, title: 'Planning the future' },
]

const ConversationsTab = ({ navigation }) => {
  return (
    <View className="flex-1 bg-white p-4">
      <FlatList
        data={topics}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="bg-purple-100 p-4 rounded-lg mb-4"
            onPress={() => navigation.navigate('AIConversation', { topic: item })}
          >
            <Text className="text-lg">{item.title}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  )
}

export default ConversationsTab