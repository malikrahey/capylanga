import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import useLanguage from '../hooks/useLanguage';
import { useNavigation } from '@react-navigation/native';

const Sidebar = ({ isOpen, onClose }) => {
  const { selectedLanguage, setSelectedLanguage } = useLanguage();
  const navigation = useNavigation();

  const languages = [
    { id: 'english', name: 'English' },
    { id: 'spanish', name: 'Spanish' },
    { id: 'french', name: 'French' },
    { id: 'german', name: 'German' },
    { id: 'italian', name: 'Italian' },
    { id: 'portuguese', name: 'Portuguese' },
    { id: 'russian', name: 'Russian' },
    { id: 'japanese', name: 'Japanese' },
    { id: 'korean', name: 'Korean' },
    { id: 'chinese', name: 'Chinese' },
  ];

  if (!isOpen) return null;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
          <Text className="text-xl font-bold">Menu</Text>
          <TouchableOpacity onPress={onClose}>
            <MaterialIcons name="close" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1">
          <View className="p-4">
            <Text className="text-lg font-semibold mb-4">Select Language</Text>
            <View className="flex-row flex-wrap gap-2">
              {languages.map((lang) => (
                <TouchableOpacity
                  key={lang.id}
                  onPress={() => {
                    setSelectedLanguage(lang.name);
                    onClose();
                  }}
                  className={`px-4 py-2 rounded-full ${
                    selectedLanguage === lang.name
                      ? 'bg-blue-500'
                      : 'bg-gray-200'
                  }`}
                >
                  <Text
                    className={`font-medium ${
                      selectedLanguage === lang.name
                        ? 'text-white'
                        : 'text-gray-700'
                    }`}
                  >
                    {lang.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View className="p-4 border-t border-gray-200">
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('OnDemandLesson', { language: selectedLanguage });
                onClose();
              }}
              className="flex-row items-center bg-blue-500 p-4 rounded-xl"
            >
              <MaterialIcons name="add" size={24} color="white" />
              <Text className="text-white font-bold text-lg ml-2">
                Create Custom Lesson
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Sidebar; 