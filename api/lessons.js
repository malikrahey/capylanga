import { db } from '../firbaseConfig';
import { collection, doc, getDoc } from 'firebase/firestore';

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

export { getLesson };