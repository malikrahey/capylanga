import { View, Text, TouchableOpacity } from 'react-native';

export default function Test() {
  return (
    <View className="flex-1 p-4 bg-gray-50">
      <Text className="text-lg font-bold text-gray-800 mb-4">Test</Text>
      <TouchableOpacity className="bg-blue-500 px-4 py-2 rounded-full">
        <Text className="text-white font-bold text-center">Submit Answer</Text>
      </TouchableOpacity>
    </View>
  );
}