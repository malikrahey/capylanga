import { View, Text, TouchableOpacity } from 'react-native';
import { useLanguage } from '../../hooks/useLanguage';

export default function SideMenuContent() {
  const { language, setLanguage } = useLanguage();

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-xl font-bold mb-4">Settings</Text>
      <TouchableOpacity 
        className="bg-blue-500 px-4 py-2 rounded-full mb-4"
        onPress={() => setLanguage(language === 'en' ? 'es' : 'en')}
      >
        <Text className="text-white font-bold">Switch to {language === 'en' ? 'Spanish' : 'English'}</Text>
      </TouchableOpacity>
    </View>
  );
}