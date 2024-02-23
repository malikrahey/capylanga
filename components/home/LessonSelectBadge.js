import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as lessonContent from '../../public/lessons/lessonContent.json'
import useLanguage from '../../hooks/useLanguage';

const LessonSelectBadge = ({rootPath}) => {
  const navigation = useNavigation();
  const [isSelected, setIsSelected] = useState(false);
  const {selectedLanguage} = useLanguage();
  console.log('selected > ', selectedLanguage)
  console.log('root > ', rootPath)
  console.log('content selected root > ', lessonContent[selectedLanguage][rootPath])

  // THIS SHOULD NOT BE NECESSARY FIX LATER
  if (!lessonContent[selectedLanguage][rootPath]) {
    return null;
  }


  const lessons = lessonContent[selectedLanguage][rootPath] && Object.keys(lessonContent[selectedLanguage][rootPath]).filter(key => !isNaN(Number(key)));
  const icon = lessonContent[selectedLanguage][rootPath]['config']['icon'];

  const handleSelect = (lesson) => {
    navigation.navigate("Lesson",
    {
      rootPath: rootPath,
      lessonIndex: String(lesson)
    });
  }

  return (
    <View>
    <TouchableOpacity className={`${isSelected ? 'rounded-t-full w-48' : 'rounded-full border-b-2'} shadow-xl items-center bg-blue-200 p-5 border-blue-600 border-t-2 border-x-2 `}onPress={() => setIsSelected(!isSelected)}>
      <MaterialIcons name={icon} size={42} color="black" />
      
      
    </TouchableOpacity>
    {isSelected && lessons && (
      <View className='bg-blue-200 items-center rounded-b-full shadow-2xl p-4 w-48 border-blue-600 border-t-0 border-x-2 border-b-2'>
        
        <Text className={`text-lg font-bold ${isSelected ? '' : 'text-blue-200'}`}>{rootPath}</Text>
        <View className='flex-row space-x-2 p-3'>
        
        {lessons.map(lesson => (
          <TouchableOpacity className='items-center border shadow-md rounded-md bg-blue-100' key={`${rootPath} ${lesson}`} onPress={() => handleSelect(lesson)}>
            <Text className='text-lg m-2'>{lesson}</Text>
          </TouchableOpacity>
        ))}
        </View>
      </View>
    )}
    </View>
  )
}

export default LessonSelectBadge