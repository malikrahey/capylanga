import AsyncStorage from '@react-native-async-storage/async-storage';

const COMPLETED_LESSONS_KEY = '@completed_lessons';

export const getCompletedLessons = async (language) => {
  try {
    const completedLessonsJson = await AsyncStorage.getItem(`${COMPLETED_LESSONS_KEY}_${language}`);
    return completedLessonsJson ? JSON.parse(completedLessonsJson) : {};
  } catch (error) {
    console.error('Error getting completed lessons:', error);
    return {};
  }
};

export const markLessonAsComplete = async (language, rootPath, lessonIndex) => {
  try {
    const completedLessons = await getCompletedLessons(language);
    if (!completedLessons[rootPath]) {
      completedLessons[rootPath] = [];
    }
    if (!completedLessons[rootPath].includes(lessonIndex)) {
      completedLessons[rootPath].push(lessonIndex);
      await AsyncStorage.setItem(
        `${COMPLETED_LESSONS_KEY}_${language}`,
        JSON.stringify(completedLessons)
      );
    }
  } catch (error) {
    console.error('Error marking lesson as complete:', error);
  }
};

export const isLessonComplete = async (language, rootPath, lessonIndex) => {
  try {
    const completedLessons = await getCompletedLessons(language);
    return completedLessons[rootPath]?.includes(lessonIndex) || false;
  } catch (error) {
    console.error('Error checking lesson completion:', error);
    return false;
  }
}; 