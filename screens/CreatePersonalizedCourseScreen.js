import React, { useState } from 'react';
import { View, Text, TextInput, SafeAreaView, Alert, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RaisedButton from '../components/ui/RaisedButton';
import styles from '../styles';
import { savePersonalizedCourse } from '../api/personalizedCourses';
import CountryFlag from 'react-native-country-flag';
import { SELECTABLE_LANGUAGES } from '../utils/constants';
import { generateCourseOutline } from '../api/aiCourseService';
import { Picker } from '@react-native-picker/picker';

const STEPS = {
  NAME: 1,
  LANGUAGE: 2,
  SKILL_LEVEL: 3,
  TOPICS: 4,
  GENERATING: 5,
};

const CreatePersonalizedCourseScreen = () => {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(STEPS.NAME);

  const [courseName, setCourseName] = useState('');
  const [language, setLanguage] = useState('');
  const [skillLevel, setSkillLevel] = useState('');
  const [topics, setTopics] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Pre-defined skill level options for the dropdown
  const SKILL_LEVEL_OPTIONS = ['Beginner', 'Intermediate', 'Advanced'];

  const handleNext = () => {
    if (currentStep === STEPS.NAME && !courseName.trim()) {
      Alert.alert('Missing Information', 'Please enter a name for your course.');
      return;
    }
    if (currentStep === STEPS.LANGUAGE && !language) {
      Alert.alert('Missing Information', 'Please select a language for your course.');
      return;
    }
    if (currentStep === STEPS.SKILL_LEVEL && !skillLevel.trim()) {
      Alert.alert('Missing Information', 'Please select your skill level.');
      return;
    }
    if (currentStep === STEPS.TOPICS && !topics.trim()) {
      Alert.alert('Missing Information', 'Please list some topics you want to learn.');
      return;
    }

    if (currentStep < STEPS.TOPICS) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === STEPS.TOPICS) {
      handleGenerateCourse();
    }
  };

  const handleBack = () => {
    if (currentStep > STEPS.NAME) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGenerateCourse = async () => {
    setIsLoading(true);
    setCurrentStep(STEPS.GENERATING);
    console.log('Starting course generation with:', { courseName, language, skillLevel, topics });

    try {
      const topicsArray = topics.split(',').map(topic => topic.trim()).filter(topic => topic);
      const courseOutline = await generateCourseOutline(language, skillLevel, topicsArray);
      console.log('Generated course outline:', courseOutline);

      if (!courseOutline || !courseOutline.lessonModules || courseOutline.lessonModules.length === 0) {
        throw new Error('Failed to generate a valid course outline.');
      }

      const newCourse = {
        id: Date.now().toString(),
        name: courseName.trim(),
        language: language.trim(),
        skillLevel: skillLevel.trim(),
        topics: topicsArray,
        createdAt: new Date().toISOString(),
        lessonModules: courseOutline.lessonModules,
      };

      const savedCourse = await savePersonalizedCourse(newCourse);
      console.log('Course saved:', savedCourse);
      setIsLoading(false);
      Alert.alert('Course Created!', `Your course "${savedCourse.name}" has been created.`, [
        { text: 'OK', onPress: () => navigation.replace('ViewPersonalizedCourse', { courseId: savedCourse.id }) }
      ]);

    } catch (error) {
      setIsLoading(false);
      setCurrentStep(STEPS.TOPICS);
      console.error('Failed to generate or save course:', error);
      Alert.alert('Error', 'Could not create the course. Please try again.');
    }
  };

  const renderStepContent = () => {
    if (isLoading || currentStep === STEPS.GENERATING) {
      return (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" />
          <Text className="mt-4 text-lg">Generating your personalized course...</Text>
        </View>
      );
    }

    switch (currentStep) {
      case STEPS.NAME:
        return (
          <View className="flex-1">
            <Text className="text-xl font-semibold mb-2">What would you like to name your course?</Text>
            <TextInput
              className="border border-gray-300 p-3 rounded-lg bg-white text-lg"
              placeholder="e.g., My Spanish Adventure"
              value={courseName}
              onChangeText={setCourseName}
            />
          </View>
        );
      case STEPS.LANGUAGE:
        return (
          <View className="flex-1">
            <Text className="text-xl font-semibold mb-3">Which language do you want to learn?</Text>
            <FlatList
              data={SELECTABLE_LANGUAGES}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className={`flex-row items-center py-4 px-3 border rounded-lg mb-2.5 bg-white ${
                    language === item.code 
                      ? 'border-purple-600 bg-purple-50' 
                      : 'border-gray-200'
                  }`}
                  onPress={() => setLanguage(item.code)}
                >
                  <CountryFlag isoCode={item.flag} size={24} className="mr-4" />
                  <Text 
                    className={`text-lg ${
                      language === item.code 
                        ? 'font-bold text-purple-600' 
                        : 'text-gray-700'
                    }`}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        );
      case STEPS.SKILL_LEVEL:
        return (
          <View className="flex-1">
            <Text className="text-xl font-semibold mb-2">What is your current skill level?</Text>
            <View className="border border-gray-300 rounded-lg bg-white">
              <Picker
                selectedValue={skillLevel}
                onValueChange={(value) => setSkillLevel(value)}
                style={{ width: '100%' }}
              >
                <Picker.Item label="Select skill level..." value="" />
                {SKILL_LEVEL_OPTIONS.map((level) => (
                  <Picker.Item key={level} label={level} value={level} />
                ))}
              </Picker>
            </View>
          </View>
        );
      case STEPS.TOPICS:
        return (
          <View className="flex-1">
            <Text className="text-xl font-semibold mb-2">What topics are you interested in?</Text>
            <Text className="text-sm text-gray-500 mb-2">Separate topics with a comma (e.g., Travel, Food, Business)</Text>
            <TextInput
              className="border border-gray-300 p-3 rounded-lg bg-white text-lg h-28"
              placeholder="e.g., Greetings, Ordering food, Hobbies"
              value={topics}
              onChangeText={setTopics}
              multiline
              textAlignVertical="top"
            />
          </View>
        );
      default:
        return <Text>Unknown step</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.AndroidSafeArea} className="flex-1">
      <View className="flex-1 p-6">
        <Text className="text-2xl font-bold mb-6 text-center">Create Your Course</Text>
        <View className="flex-1">
          {renderStepContent()}
        </View>

        {!isLoading && currentStep !== STEPS.GENERATING && (
          <View className="mt-8">
            <View className="flex-row justify-between">
              {currentStep > STEPS.NAME && (
                <RaisedButton variant="secondary" onPress={handleBack} buttonStyles="flex-1 mr-2 p-4">
                  <Text>Back</Text>
                </RaisedButton>
              )}
              <RaisedButton 
                variant="continue"
                onPress={handleNext} 
                buttonStyles={currentStep === STEPS.NAME ? "flex-1 p-4" : "flex-1 ml-2 p-4"}
              >
                <Text>{currentStep === STEPS.TOPICS ? 'Generate Course' : 'Next'}</Text>
              </RaisedButton>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CreatePersonalizedCourseScreen; 