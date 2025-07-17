import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import styles from '../styles';
import { getPersonalizedCourseById, generateAndStoreLessonContent, getPersonalizedLessonContent } from '../api/personalizedCourses';
import { LANGUAGE_MAP } from '../utils/constants';
import { MaterialIcons } from '@expo/vector-icons';

const ViewPersonalizedCourseScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { courseId } = route.params;
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generatingModules, setGeneratingModules] = useState({});
  const [generatedModulesStatus, setGeneratedModulesStatus] = useState({});

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

  useEffect(() => {
    fetchCourseDetails();
  }, [fetchCourseDetails]);

  // Potentially refresh if navigating back after completing a lesson module
  useFocusEffect(
    useCallback(() => {
      fetchCourseDetails(); // Re-fetch to update completion statuses if we implement them
    }, [fetchCourseDetails])
  );

  const handleSelectModule = async (module) => {
    try {
      // Set loading state for this specific module
      setGeneratingModules(prev => ({ ...prev, [module.moduleId]: true }));
      
      const lessonContent = await generateAndStoreLessonContent(courseId, module, course.language);
      
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
      Alert.alert('Error', 'Failed to generate lesson content. Please try again.');
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
    <SafeAreaView style={styles.AndroidSafeArea} className="flex-1 p-4">
      <View className="flex-1 p-4">
        <Text className="text-base text-gray-600 mb-4">Language: {LANGUAGE_MAP[course.language]}</Text>
        
        <FlatList
          data={course.lessonModules}
          renderItem={renderModuleItem}
          keyExtractor={item => item.moduleId}
          ListHeaderComponent={() => <Text className="text-lg font-bold mb-3">Modules:</Text>}
          ListEmptyComponent={() => <Text>No modules found for this course.</Text>}
        />
      </View>
    </SafeAreaView>
  );
};

export default ViewPersonalizedCourseScreen; 