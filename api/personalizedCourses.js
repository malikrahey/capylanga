import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateOnDemandLesson } from './lessons';

const PERSONALIZED_COURSES_KEY = '@personalized_courses';
const PERSONALIZED_LESSON_CONTENT_KEY_PREFIX = '@personalized_lesson_content_';

/**
 * Course Data Structure:
 * {
 *   id: string, // Unique ID (e.g., timestamp or UUID)
 *   name: string, // User-defined name
 *   language: string, // e.g., 'es', 'fr'
 *   skillLevel: string, // e.g., 'beginner', 'intermediate'
 *   topics: string[], // Array of topic strings
 *   createdAt: string, // ISO date string
 *   lessonModules: [
 *     {
 *       moduleId: string, // Unique ID for the module within the course
 *       title: string,
 *       description: string, // Used as prompt for generating lesson content
 *       isCompleted: boolean, // Optional, for tracking completion
 *       // lessonContent will be stored separately to avoid overly large course objects
 *     }
 *   ]
 * }
 */

// Helper function to get all courses
const getPersonalizedCourses = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(PERSONALIZED_COURSES_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Failed to fetch personalized courses.', e);
    return [];
  }
};

// Helper function to get a specific course by ID
const getPersonalizedCourseById = async (courseId) => {
  try {
    const courses = await getPersonalizedCourses();
    return courses.find(course => course.id === courseId);
  } catch (e) {
    console.error('Failed to fetch course by ID.', e);
    return null;
  }
};

// Helper function to save a new course
const savePersonalizedCourse = async (course) => {
  try {
    const courses = await getPersonalizedCourses();
    courses.push(course);
    await AsyncStorage.setItem(PERSONALIZED_COURSES_KEY, JSON.stringify(courses));
    return course;
  } catch (e) {
    console.error('Failed to save course.', e);
    throw e;
  }
};

// Helper function to get lesson content for a specific module
const getPersonalizedLessonContent = async (courseId, moduleId) => {
  try {
    const key = `${PERSONALIZED_LESSON_CONTENT_KEY_PREFIX}${courseId}_${moduleId}`;
    const content = await AsyncStorage.getItem(key);
    return content ? JSON.parse(content) : null;
  } catch (e) {
    console.error('Failed to fetch lesson content.', e);
    return null;
  }
};

// Helper function to save lesson content for a specific module
const savePersonalizedLessonContent = async (courseId, moduleId, content) => {
  try {
    const key = `${PERSONALIZED_LESSON_CONTENT_KEY_PREFIX}${courseId}_${moduleId}`;
    await AsyncStorage.setItem(key, JSON.stringify(content));
    return content;
  } catch (e) {
    console.error('Failed to save lesson content.', e);
    throw e;
  }
};

// Function to generate and store lesson content for a module
const generateAndStoreLessonContent = async (courseId, module, language) => {
  try {
    // First check if we already have the content
    const existingContent = await getPersonalizedLessonContent(courseId, module.moduleId);
    if (existingContent) {
      return existingContent;
    }

    // Generate new lesson content using the module description
    const generatedLesson = await generateOnDemandLesson(language, module.description);
    
    // Store the generated content
    const lessonContent = {
      ...generatedLesson,
      moduleId: module.moduleId,
      courseId: courseId,
      createdAt: new Date().toISOString(),
    };

    await savePersonalizedLessonContent(courseId, module.moduleId, lessonContent);
    return lessonContent;
  } catch (error) {
    console.error('Error generating lesson content:', error);
    throw error;
  }
};

export {
  getPersonalizedCourses,
  getPersonalizedCourseById,
  savePersonalizedCourse,
  getPersonalizedLessonContent,
  savePersonalizedLessonContent,
  generateAndStoreLessonContent,
}; 