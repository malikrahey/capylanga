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
      <View className="flex w-36 justify-center h-36">
        <TouchableOpacity
          className={`rounded-2xl items-center justify-center p-6 ${
            isSelected 
              ? 'bg-blue-500 border-blue-600' 
              : 'bg-blue-400 border-blue-500'
          } border-2 shadow-sm`}
          style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 3,
          }}
          onPress={handlePress}
        >
          <MaterialIcons 
            name={icon} 
            size={48} 
            color="white"
          />
        </TouchableOpacity>
      </View>
      {isSelected && lessons && (
        <View
          className="relative justify-center flex bg-blue-400 rounded-2xl shadow-sm p-6 w-64 mt-4 border-2 border-blue-500"
          style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 3,
          }}
        >
          <View className="bg-blue-400 h-3 w-3 absolute -top-2 left-1/2 -translate-x-1/2 rotate-45 border-2 border-b-0 border-r-0 border-blue-500" />
          <Text className="text-xl font-bold text-white mb-4 [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">{rootPath}</Text>
          <View className="flex-row flex-wrap justify-center gap-2">
            {lessons.map((lesson) => (
              <TouchableOpacity
                key={`${rootPath} ${lesson}`}
                onPress={() => handleSelect(lesson)}
                className="bg-blue-500 rounded-xl px-4 py-2"
              >
                <Text className="text-white font-bold text-lg [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">{lesson}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};


export default LessonSelectBadge;