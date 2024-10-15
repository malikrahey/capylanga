import { View, Text, TouchableOpacity, NativeModules } from 'react-native';
import React, { createRef, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as lessonContent from '../../public/lessonContent.json';
import useLanguage from '../../hooks/useLanguage';

const LessonSelectBadge = ({ rootPath, onSelect, onDeselect }) => {
  const navigation = useNavigation();
  const [isSelected, setIsSelected] = useState(false);
  const { selectedLanguage } = useLanguage();
  const ref = createRef();
  console.log('selected > ', selectedLanguage);
  console.log('root > ', rootPath);
  console.log('content selected root > ', lessonContent[selectedLanguage][rootPath]);

  // THIS SHOULD NOT BE NECESSARY FIX LATER
  if (!lessonContent[selectedLanguage][rootPath]) {
    return null;
  }

  const lessons = lessonContent[selectedLanguage][rootPath] && Object.keys(lessonContent[selectedLanguage][rootPath]).filter(key => !isNaN(Number(key)));
  const icon = lessonContent[selectedLanguage][rootPath]['config']['icon'];

  const handleSelect = (lesson) => {
    navigation.navigate('Lesson', {
      rootPath: rootPath,
      lessonIndex: String(lesson)
    });
  };

  const handlePress = () => {
    setIsSelected(!isSelected);
    if (isSelected) {
      onDeselect();
    } else {
      onSelect();
    }
  }

  return (
    <View className={`relative ${isSelected ? 'my-12' : ''}`} ref={ref}>
      <TouchableOpacity
        className={`${isSelected ? 'rounded-full' : 'rounded-full border-b-2'} shadow-xl items-center bg-blue-200 p-5 border-blue-600 border-t-2 border-x-2 `}
        onPress={handlePress}
      >
        <MaterialIcons name={icon} size={42} color='black' />
      </TouchableOpacity>
      {isSelected && lessons && (
  <View
    className='bg-blue-200 rounded-md shadow-2xl p-4 absolute -left-8 top-24 w-48'
  >
    <View
      className='bg-blue-200 h-3 w-3 absolute -top-2 left-1/2 -translate-x-1/2 rotate-45'
    />
    <Text className={`text-lg font-bold ${isSelected ? '' : 'text-blue-200'}`}>{rootPath}</Text>
    <View className='flex-row space-x-2 p-3'>
      {lessons.map((lesson) => (
        <TouchableOpacity
          className='items-center border shadow-md rounded-md bg-blue-100'
          key={`${rootPath} ${lesson}`}
          onPress={() => handleSelect(lesson)}
        >
          <Text className='text-lg m-2'>{lesson}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
)}
    </View>
  );
};

export default LessonSelectBadge;