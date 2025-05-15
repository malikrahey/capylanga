import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useLayoutEffect } from 'react';
import useLanguage from '../hooks/useLanguage';
import { generateOnDemandLesson } from '../api/lessons';
import { MaterialIcons } from '@expo/vector-icons';
import { LANGUAGE_MAP } from '../utils/constants';

const OnDemandLessonScreen = ({ route, navigation }) => {
  const { language } = route.params;
  const { selectedLanguage } = useLanguage();
  const [lessonDescription, setLessonDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleSubmit = async () => {
    if (!lessonDescription.trim()) return;
    
    setIsLoading(true);
    try {
      const generatedLesson = await generateOnDemandLesson(selectedLanguage, lessonDescription);
      
      // Navigate to the lesson screen with the generated content
      navigation.navigate('Lesson', {
        rootPath: 'onDemand',
        lessonIndex: generatedLesson.id,
        lessonContent: {
          lesson: {
            title: generatedLesson.title,
            type: generatedLesson.type,
            introduction: generatedLesson.introduction,
            story: generatedLesson.story,
            tests: generatedLesson.tests
          }
        }
      });
    } catch (error) {
      console.error('Error generating lesson:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-100 py-4">
      <View className="flex-1 px-4 pt-4">
        <View className="flex-row items-center mb-6">
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            className="mr-4"
          >
            <MaterialIcons name="arrow-back" size={28} color="#000" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold">On Demand Lesson</Text>
        </View>
        
        <Text className="text-lg mb-6">Selected Language: {LANGUAGE_MAP[language.toLowerCase()]}</Text>
        
        <View className="flex-1 bg-white rounded-xl p-4 shadow-sm">
          <TextInput
            className="w-full h-32 text-lg p-2 border border-gray-200 rounded-lg"
            placeholder="Describe the lesson to practice..."
            placeholderTextColor="#9CA3AF"
            multiline
            textAlignVertical="top"
            value={lessonDescription}
            onChangeText={setLessonDescription}
            editable={!isLoading}
          />
          
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={isLoading || !lessonDescription.trim()}
            className={`mt-4 p-4 rounded-xl ${
              isLoading || !lessonDescription.trim() 
                ? 'bg-gray-400' 
                : 'bg-blue-500'
            }`}
          >
            <Text className="text-white font-bold text-lg text-center">
              {isLoading ? 'Generating Lesson...' : 'Start Lesson'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OnDemandLessonScreen; 