import { View, Text } from 'react-native';

export default function Card({ children }) {
  return (
    <View className="bg-white p-4 rounded-lg shadow-sm">
      {children}
    </View>
  );
}