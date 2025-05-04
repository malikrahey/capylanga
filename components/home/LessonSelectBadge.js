import { View, Text, TouchableOpacity } from 'react-native';

export default function LessonSelectBadge({ title, onPress }) {
  return (
    <TouchableOpacity 
      className="bg-white p-4 rounded-lg shadow-md mb-4"
      onPress={onPress}
    >
      <Text className="text-lg font-bold text-gray-800">{title}</Text>
    </TouchableOpacity>
  );
}