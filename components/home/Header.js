import { View, Text, TouchableOpacity } from 'react-native';
import { useLanguage } from '../../hooks/useLanguage';

export default function Header() {
  const { language, setLanguage } = useLanguage();

  return (
    <View className="flex-row justify-between items-center p-4 bg-blue-500">
      <Text className="text-white text-xl font-bold">CapyLanga</Text>
      <TouchableOpacity 
        className="bg-white px-4 py-2 rounded-full"
        onPress={() => setLanguage(language === 'en' ? 'es' : 'en')}
      >
        <Text className="text-blue-500 font-bold">{language === 'en' ? 'ES' : 'EN'}</Text>
      </TouchableOpacity>
    </View>
  );
}