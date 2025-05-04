import { View, Text, TouchableOpacity, Image } from 'react-native';

export default function StoreItem({ item }) {
  return (
    <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
      <Image source={{ uri: item.image }} className="w-full h-40 rounded-lg mb-2" />
      <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
      <Text className="text-gray-600 mb-2">{item.description}</Text>
      <TouchableOpacity className="bg-green-500 px-4 py-2 rounded-full">
        <Text className="text-white font-bold text-center">Buy for {item.price}</Text>
      </TouchableOpacity>
    </View>
  );
}