import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useLayoutEffect } from 'react';
import useLanguage from '../hooks/useLanguage';
import { generateOnDemandLesson } from '../api/lessons';
import { MaterialIcons } from '@expo/vector-icons';
import { LANGUAGE_MAP } from '../utils/constants';
import { useFocusEffect } from '@react-navigation/native';
import { getCredits, deductCredits, hasEnoughCredits, CREDIT_COSTS } from '../api/credits';

const OnDemandLessonScreen = ({ route, navigation }) => {
  const { language } = route.params;
  const { selectedLanguage } = useLanguage();
  const [lessonDescription, setLessonDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [credits, setCredits] = useState(0);
  const [canAffordLesson, setCanAffordLesson] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  // Load credits when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      const loadCredits = async () => {
        try {
          const currentCredits = await getCredits();
          setCredits(currentCredits);
          const canAfford = await hasEnoughCredits(CREDIT_COSTS.GENERATE_LESSON);
          setCanAffordLesson(canAfford);
        } catch (error) {
          console.error('Error loading credits:', error);
        }
      };
      loadCredits();
    }, [])
  );

  const handleSubmit = async () => {
    if (!lessonDescription.trim()) return;
    
    // Check credits before proceeding
    if (!canAffordLesson) {
      Alert.alert(
        'Insufficient Credits', 
        `You need ${CREDIT_COSTS.GENERATE_LESSON} credit to generate a lesson, but you only have ${credits}. Watch a video to earn more credits!`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Get Credits', onPress: () => navigation.navigate('GetCreditsScreen') }
        ]
      );
      return;
    }
    
    setIsLoading(true);
    try {
      // Deduct credits first
      await deductCredits(CREDIT_COSTS.GENERATE_LESSON);
      
      const generatedLesson = await generateOnDemandLesson(selectedLanguage, lessonDescription);
      
      // Update credits display
      const newCredits = await getCredits();
      setCredits(newCredits);
      setCanAffordLesson(await hasEnoughCredits(CREDIT_COSTS.GENERATE_LESSON));
      
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
      
      if (error.message.includes('Insufficient credits')) {
        Alert.alert('Insufficient Credits', error.message, [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Get Credits', onPress: () => navigation.navigate('GetCreditsScreen') }
        ]);
      } else {
        Alert.alert('Error', 'Failed to generate lesson. Please try again.');
      }
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
        
        {/* Credits Display */}
        <View className="bg-white p-4 rounded-xl shadow-sm mb-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <MaterialIcons name="stars" size={20} color="#f59e0b" />
              <Text className="text-lg font-semibold ml-2">Credits: {credits}</Text>
            </View>
            <Text className="text-lg font-semibold">Cost: {CREDIT_COSTS.GENERATE_LESSON}</Text>
          </View>
          {!canAffordLesson && (
            <View className="mt-2">
              <Text className="text-red-600 text-sm">
                ⚠️ You need {CREDIT_COSTS.GENERATE_LESSON - credits} more credit to generate a lesson.
              </Text>
              <TouchableOpacity 
                onPress={() => navigation.navigate('GetCreditsScreen')}
                className="mt-1"
              >
                <Text className="text-blue-600 text-sm underline">Get more credits</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        
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
            disabled={isLoading || !lessonDescription.trim() || !canAffordLesson}
            className={`mt-4 p-4 rounded-xl ${
              isLoading || !lessonDescription.trim() || !canAffordLesson
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