import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { LinearGradient } from 'expo-linear-gradient';

export default function LessonScreen() {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#6a11cb', '#2575fc']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1"
    >
      <View className="flex-row items-center p-4">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 rounded-full bg-white/10">
          <ArrowLeftIcon size={20} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold ml-4">Lesson</Text>
      </View>

      <ScrollView className="flex-1 px-4">
        <View className="bg-white/10 rounded-xl p-6 mb-4">
          <Text className="text-white text-lg font-semibold mb-2">Introduction</Text>
          <Text className="text-white/80">This is a modern styled lesson screen with gradient background and smooth transitions.</Text>
        </View>

        <View className="bg-white/10 rounded-xl p-6 mb-4">
          <Text className="text-white text-lg font-semibold mb-2">Content</Text>
          <Text className="text-white/80">Here you can add your lesson content with a clean and modern look.</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
