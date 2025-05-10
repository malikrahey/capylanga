import { db } from '../firbaseConfig';
import { collection, doc, getDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../firbaseConfig';

const lessonsCollection = collection(db, 'lessons');
const ON_DEMAND_LESSONS_KEY = '@on_demand_lessons';

const getLesson = async (selectedLanguage, rootPath, lessonIndex) => {
  const path = `${selectedLanguage}/${rootPath}/${lessonIndex}`
  const transformedString = path.toLowerCase().replace(/ /g, '_');
  const lessonDoc = doc(lessonsCollection, transformedString);
  const lessonSnapshot = await getDoc(lessonDoc);

  if (lessonSnapshot.exists()) {
    return lessonSnapshot.data();
  } else {
    throw new Error('Lesson not found');
  }
};

const storeOnDemandLesson = async (lesson) => {
  try {
    // Get existing lessons
    const existingLessonsJson = await AsyncStorage.getItem(ON_DEMAND_LESSONS_KEY);
    const existingLessons = existingLessonsJson ? JSON.parse(existingLessonsJson) : [];
    
    // Add new lesson with timestamp
    const newLesson = {
      ...lesson,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    
    // Store updated lessons array
    await AsyncStorage.setItem(
      ON_DEMAND_LESSONS_KEY,
      JSON.stringify([newLesson, ...existingLessons])
    );
    
    return newLesson;
  } catch (error) {
    console.error('Error storing lesson:', error);
    throw error;
  }
};

const getOnDemandLessons = async () => {
  try {
    const lessonsJson = await AsyncStorage.getItem(ON_DEMAND_LESSONS_KEY);
    return lessonsJson ? JSON.parse(lessonsJson) : [];
  } catch (error) {
    console.error('Error getting lessons:', error);
    return [];
  }
};

const generateOnDemandLesson = async (language, description) => {
  try {
    const generateLesson = httpsCallable(functions, 'generateLesson');
    const result = await generateLesson({ language, description });
    const lesson = result.data;
    
    // Store the lesson locally
    const storedLesson = await storeOnDemandLesson(lesson);
    return storedLesson;
  } catch (error) {
    console.error('Error generating lesson:', error);
    throw error;
  }
};

export { getLesson, generateOnDemandLesson, getOnDemandLessons };