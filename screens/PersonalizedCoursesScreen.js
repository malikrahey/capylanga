import React, { useCallback, useLayoutEffect } from 'react';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import RaisedButton from '../components/ui/RaisedButton';
import styles from '../styles';
import { getPersonalizedCourses, getPersonalizedLessonContent } from '../api/personalizedCourses';
import { LANGUAGE_MAP } from '../utils/constants';
import { MaterialIcons } from '@expo/vector-icons';

const PersonalizedCoursesScreen = () => {
  const navigation = useNavigation();
  const [courses, setCourses] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  // Track which courses already have lesson content stored locally (all modules generated)
  const [generatedStatusMap, setGeneratedStatusMap] = React.useState({});

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      const storedCourses = await getPersonalizedCourses();

      // Determine for each course whether all its lesson modules have been generated and stored locally
      const statusEntries = await Promise.all(
        (storedCourses || []).map(async (course) => {
          // Guard: if course has no modules, mark as not generated
          if (!course?.lessonModules || course.lessonModules.length === 0) {
            return [course.id, false];
          }

          // Check every module for saved content
          const contents = await Promise.all(
            course.lessonModules.map((mod) =>
              getPersonalizedLessonContent(course.id, mod.moduleId)
            )
          );

          // All modules must have stored content to be considered fully generated
          const allGenerated = contents.every((c) => c !== null);
          return [course.id, allGenerated];
        })
      );

      setCourses(storedCourses);
      setGeneratedStatusMap(Object.fromEntries(statusEntries));
    } catch (error) {
      console.error("Failed to load courses:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchCourses();
    }, [fetchCourses])
  );

  const renderCourseItem = ({ item }) => {
    const isGenerated = generatedStatusMap[item.id];

    return (
      <TouchableOpacity 
        className="bg-white p-4 rounded-lg mb-2.5 shadow-sm"
        onPress={() => navigation.navigate('ViewPersonalizedCourse', { courseId: item.id })}
      >
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-lg font-bold mb-1">{item.name}</Text>
            <Text className="text-gray-600">{LANGUAGE_MAP[item.language]} - {item.lessonModules?.length || 0} modules</Text>
          </View>
          {isGenerated && (
            <MaterialIcons name="check-circle" size={24} color="#22c55e" />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.AndroidSafeArea} className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
        <Text>Loading courses...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.AndroidSafeArea} className="flex-1 p-4">
      <View className="flex-1 p-4">
        <Text className="text-2xl font-bold mb-4">My Personalized Courses</Text>
        {courses.length === 0 ? (
          <View className="flex-1 justify-center items-center">
            <Text className="text-lg mb-4">You haven't created any personalized courses yet.</Text>
          </View>
        ) : (
          <FlatList
            data={courses}
            renderItem={renderCourseItem}
            keyExtractor={item => item.id}
            className="flex-1"
          />
        )}
        <RaisedButton 
          variant="success" 
          buttonStyles="p-4 mt-4" 
          onPress={() => navigation.navigate('CreatePersonalizedCourse')}
        >
          <Text className='text-white font-bold'>Create New Course</Text>
        </RaisedButton>
      </View>
    </SafeAreaView>
  );
};

export default PersonalizedCoursesScreen; 