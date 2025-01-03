import { View, Text, TouchableOpacity, NativeModules } from 'react-native';
import React, { createRef, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as lessonContent from '../../public/lessonContent.json';
import useLanguage from '../../hooks/useLanguage';
import RaisedButton from '../ui/RaisedButton';

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
    <View className="flex items-center" ref={ref}>
      <View className="flex w-32 justify-center h-32">
        <TouchableOpacity
          className="rounded-xl border border-b-4 shadow-xl items-center bg-blue-400 p-4 border-blue-600 "
          onPress={handlePress}
        >
          <MaterialIcons name={icon} size={42} color="black" />
        </TouchableOpacity>
      </View>
      {isSelected && lessons && (
        <View
          className="relative justify-center flex bg-blue-400 rounded-md shadow-2xl p-4 w-48 border border-b-4 border-blue-600"
        >
          <View className="bg-blue-400 h-3 w-3 absolute -top-2 left-1/2 -translate-x-1/2 rotate-45 border-2 border-b-0 border-r-0 border-blue-600" />
          <Text className={`text-lg font-bold ${isSelected ? "" : "text-blue-200"}`}>{rootPath}</Text>
          <View className="flex-row flex justify-evenly space-x-2 p-3">
            {lessons.map((lesson) => (
              <RaisedButton key={`${rootPath} ${lesson}`} onPress={() => handleSelect(lesson)}>
                <Text className="text-lg m-2">{lesson}</Text>
              </RaisedButton>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};


export default LessonSelectBadge;