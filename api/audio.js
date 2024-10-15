import { storage } from '../firebase'; // Import your Firebase storage instance
import axios from 'axios'; // Import axios for making API calls

const audioApiUrl = 'https://example.com/api/generate-audio'; // Replace with your API URL

// Get and download the audio file for a given lesson and line index from firebase,
// if it doesn't exist, generate it and post it in firebase
const getOrCreateAudioFile = async (selectedLanguage, lessonPath, lessonIndex, lineIndex) => {
  
  const filename = `${selectedLanguage}_${lessonPath}_${lessonIndex}_${lineIndex}.mp3`;
  
  try {
    const audioRef = storage.ref(`audio/${filename}`);
    const audioDownloadUrl = await audioRef.getDownloadURL();

    if (!audioDownloadUrl) {
      const audioUrl = await generateAudioFile(selectedLanguage,lessonPath, lessonIndex, lineIndex);
      return audioUrl;
    }

    return audioUrl;
  } catch (error) {
    console.error(error);
    throw error;
  }
  
};

const generateAudioFile = async (selectedLanguage,lessonPath, lessonIndex, lineIndex) => {
  try {
    const response = await axios.post(audioApiUrl, { text: '...' }); // Replace with the text to generate audio for
    const audioData = response.data;
    const filename = `${lessonPath}_${lessonIndex}_${lineIndex}.mp3`;
    const audioRef = storage.ref(`audio/${filename}`);
    await audioRef.put(audioData);
    const audioUrl = await audioRef.getDownloadURL();
    return audioUrl;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { getOrCreateAudioFile };