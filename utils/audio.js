


import AsyncStorage from "@react-native-async-storage/async-storage";
import { getOrCreateAudioFile } from "../api/audio";

// Checks to see if the audio file exists in local storage, then will check
// firebase storage using the api function getOrCreateAudioFile
export async function getAudioFile(selectedLanguage, lessonPath, lessonIndex, lineIndex) {
  const filename = `${selectedLanguage}_${lessonPath}_${lessonIndex}_${lineIndex}.mp3`;
  const localFile = await AsyncStorage.getItem(filename);
  if (localFile) {
    return localFile;
  } 
  const fileFromApi = await getOrCreateAudioFile(selectedLanguage, lessonPath, lessonIndex, lineIndex);
}