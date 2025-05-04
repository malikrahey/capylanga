import { TouchableOpacity, Text } from 'react-native';

export default function RaisedButton({ title, onPress }) {
  return (
    <TouchableOpacity 
      className="bg-blue-500 px-4 py-2 rounded-full shadow-md"
      onPress={onPress}
    >
      <Text className="text-white font-bold text-center">{title}</Text>
    </TouchableOpacity>
  );
}