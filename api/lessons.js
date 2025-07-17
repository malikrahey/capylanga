import { db, vertexai } from '../firbaseConfig';
import { collection, doc, getDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../firbaseConfig';
import { getVertexAI, getGenerativeModel, Schema } from 'firebase/vertexai';
import { LANGUAGE_MAP, ONDEMAND_LESSON_PROMPT, STORAGE_KEYS } from '../utils/constants';

const {ON_DEMAND_LESSONS} = STORAGE_KEYS;

const lessonsCollection = collection(db, 'lessons');

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
    const existingLessonsJson = await AsyncStorage.getItem(ON_DEMAND_LESSONS);
    const existingLessons = existingLessonsJson ? JSON.parse(existingLessonsJson) : [];
    
    // Add new lesson with timestamp
    const newLesson = {
      ...lesson,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    
    // Store updated lessons array
    await AsyncStorage.setItem(
      ON_DEMAND_LESSONS,
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
    const lessonsJson = await AsyncStorage.getItem(ON_DEMAND_LESSONS);
    return lessonsJson ? JSON.parse(lessonsJson) : [];
  } catch (error) {
    console.error('Error getting lessons:', error);
    return [];
  }
};

const generateOnDemandLesson = async (language, description) => {
  try {
    const schema = Schema.object({
      lesson: Schema.object({
        title: Schema.string(),
        type: Schema.string(),
        introduction: Schema.string(),
        story: Schema.array(Schema.object({
          speaker: Schema.string(),
          message: Schema.string(),
          translation: Schema.string(),
        })),
        tests: Schema.array(Schema.object({
          prompt: Schema.string(),
          answer: Schema.string(),
          wordBank: Schema.array(Schema.string()),
        })),
      })
    });

    const model = getGenerativeModel(vertexai, {
      model: 'gemini-2.0-flash',
    });


    const prompt = ONDEMAND_LESSON_PROMPT.replace('{LANGUAGE}', LANGUAGE_MAP[language.toLowerCase()]).replace('{DESCRIPTION}', description);
    const result = await model.generateContent(prompt);
    const lesson = JSON.parse(result.response.text().replace(/```json/g, '').replace(/```/g, ''));

    return lesson;

  } catch (error) {
    console.error('Error generating lesson:', error);

    throw error;
  }
};

export { getLesson, generateOnDemandLesson, getOnDemandLessons };