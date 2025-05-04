import { View, Text } from 'react-native';

export default function Conversation() {
  return (
    <View className="flex-1 p-4 bg-gray-50">
      <Text className="text-lg font-bold text-gray-800 mb-4">Conversation</Text>
      <View className="bg-white p-4 rounded-lg shadow-sm">
        <Text className="text-gray-600">This is where the conversation will appear.</Text>
      </View>
    </View>
  );
}