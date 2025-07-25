import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import styles from '../styles';
import { getPersonalizedCourseById, generateAndStoreLessonContent, getPersonalizedLessonContent } from '../api/personalizedCourses';
import { LANGUAGE_MAP } from '../utils/constants';
import { MaterialIcons } from '@expo/vector-icons';
import { getCredits, deductCredits, hasEnoughCredits, CREDIT_COSTS } from '../api/credits';

const ViewPersonalizedCourseScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { courseId } = route.params;
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generatingModules, setGeneratingModules] = useState({});
  const [generatedModulesStatus, setGeneratedModulesStatus] = useState({});
  const [credits, setCredits] = useState(0);

  const fetchCourseDetails = useCallback(async () => {
    try {
      setLoading(true);
      const courseData = await getPersonalizedCourseById(courseId);
      setCourse(courseData);

      if (courseData) {
        navigation.setOptions({ title: courseData.name });

        // Determine generated status for each module
        if (courseData.lessonModules && courseData.lessonModules.length > 0) {
          const statusEntries = await Promise.all(
            courseData.lessonModules.map(async (mod) => {
              const content = await getPersonalizedLessonContent(courseData.id, mod.moduleId);
              return [mod.moduleId, !!content];
            })
          );
          setGeneratedModulesStatus(Object.fromEntries(statusEntries));
        }
      } else {
        navigation.setOptions({ title: 'Course Not Found' });
      }
    } catch (error) {
      console.error("Failed to fetch course data:", error);
      navigation.setOptions({ title: 'Error Loading Course' });
    } finally {
      setLoading(false);
    }
  }, [courseId, navigation]);

  // Load credits and course details when screen is focused
  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        try {
          const currentCredits = await getCredits();
          setCredits(currentCredits);
        } catch (error) {
          console.error('Error loading credits:', error);
        }
      };
      loadData();
      fetchCourseDetails();
    }, [fetchCourseDetails])
  );

  useEffect(() => {
    fetchCourseDetails();
  }, [fetchCourseDetails]);

  const handleSelectModule = async (module) => {
    // Check if content already exists
    const existingContent = await getPersonalizedLessonContent(courseId, module.moduleId);
    
    if (existingContent) {
      // Content already exists, navigate directly
      navigation.navigate('Lesson', {
        rootPath: 'personalized',
        lessonIndex: module.moduleId,
        lessonContent: {
          lesson: {
            title: existingContent.title,
            type: existingContent.type,
            introduction: existingContent.introduction,
            story: existingContent.story,
            tests: existingContent.tests
          }
        }
      });
      return;
    }

    // Check credits before generating new content
    const canAfford = await hasEnoughCredits(CREDIT_COSTS.GENERATE_LESSON);
    if (!canAfford) {
      Alert.alert(
        'Insufficient Credits', 
        `You need ${CREDIT_COSTS.GENERATE_LESSON} credit to generate this lesson, but you only have ${credits}. Watch a video to earn more credits!`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Get Credits', onPress: () => navigation.navigate('GetCreditsScreen') }
        ]
      );
      return;
    }

    try {
      // Set loading state for this specific module
      setGeneratingModules(prev => ({ ...prev, [module.moduleId]: true }));
      
      // Deduct credits first
      await deductCredits(CREDIT_COSTS.GENERATE_LESSON);
      
      const lessonContent = await generateAndStoreLessonContent(courseId, module, course.language);
      
      // Update credits display
      const newCredits = await getCredits();
      setCredits(newCredits);
      
      // Update generated status
      setGeneratedModulesStatus(prev => ({ ...prev, [module.moduleId]: true }));
      
      // Navigate to the lesson screen with the generated content
      navigation.navigate('Lesson', {
        rootPath: 'personalized',
        lessonIndex: module.moduleId,
        lessonContent: {
          lesson: {
            title: lessonContent.title,
            type: lessonContent.type,
            introduction: lessonContent.introduction,
            story: lessonContent.story,
            tests: lessonContent.tests
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
        Alert.alert('Error', 'Failed to generate lesson content. Please try again.');
      }
    } finally {
      // Clear loading state for this module
      setGeneratingModules(prev => ({ ...prev, [module.moduleId]: false }));
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.AndroidSafeArea} className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
        <Text>Loading course details...</Text>
      </SafeAreaView>
    );
  }

  if (!course) {
    return (
      <SafeAreaView style={styles.AndroidSafeArea} className="flex-1 justify-center items-center">
        <Text>Course not found.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} className="mt-2.5">
          <Text className="text-purple-600">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const renderModuleItem = ({ item }) => {
    const isGenerating = generatingModules[item.moduleId];
    const isGenerated = generatedModulesStatus[item.moduleId];
    
    return (
      <TouchableOpacity 
        className="bg-white p-4 rounded-lg mb-2.5 shadow-sm"
        onPress={() => handleSelectModule(item)}
        disabled={isGenerating}
      >
        <View className="flex-row justify-between items-center">
          <View className="flex-1 pr-2">
            <Text className="text-base font-bold">{item.title}</Text>
            <Text className="text-sm text-gray-500 mt-1">{item.description}</Text>
            {!isGenerated && !isGenerating && (
              <View className="flex-row items-center mt-2">
                <MaterialIcons name="stars" size={16} color="#f59e0b" />
                <Text className="text-sm text-gray-600 ml-1">Costs {CREDIT_COSTS.GENERATE_LESSON} credit</Text>
              </View>
            )}
          </View>
          {isGenerated && !isGenerating && (
            <MaterialIcons name="check-circle" size={20} color="#22c55e" />
          )}
        </View>
        {isGenerating && (
          <View className="mt-2">
            <ActivityIndicator size="small" />
            <Text className="text-sm text-gray-500 mt-1">Generating lesson...</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.AndroidSafeArea} className="flex-1">
      <View className="flex-1 p-4">
        {/* Credits Display */}
        <View className="bg-white p-4 rounded-xl shadow-sm mb-4">
          <View className="flex-row items-center justify-center">
            <MaterialIcons name="stars" size={20} color="#f59e0b" />
            <Text className="text-lg font-semibold ml-2">Credits: {credits}</Text>
          </View>
        </View>

        {/* Course Info */}
        <View className="bg-white p-4 rounded-lg mb-4 shadow-sm">
          <Text className="text-xl font-bold">{course.name}</Text>
          <Text className="text-gray-600">
            {LANGUAGE_MAP[course.language]} • {course.skillLevel} • {course.lessonModules?.length || 0} modules
          </Text>
        </View>

        {/* Lesson Modules */}
        <FlatList
          data={course.lessonModules || []}
          renderItem={renderModuleItem}
          keyExtractor={(item) => item.moduleId}
          className="flex-1"
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default ViewPersonalizedCourseScreen; 