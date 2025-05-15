import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import Conversation from '../components/lesson/Conversation';
import Test from '../components/lesson/Test';
import useLanguage from '../hooks/useLanguage';
import { Button } from 'react-native-paper';
import { getLesson } from '../api/lessons';
import * as lessonContent from "../public/lessonContent.json"
import RaisedButton from '../components/ui/RaisedButton';
import { markLessonAsComplete } from '../utils/completedLessons';

const LessonScreen = ({ route, navigation }) => {
  const { selectedLanguage } = useLanguage();
  const { rootPath, lessonIndex, lessonContent: onDemandContent } = route.params;
  const [lesson, setLesson] = useState([]);
  const [intro, setIntro] = useState('');
  const [title, setTitle] = useState('');
  const [lessonType, setLessonType] = useState(null);
  const [test, setTest] = useState([]);
  const [currentStage, setCurrentStage] = useState('introduction');
  const [shouldShowTranslation, setShouldShowTranslation] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let lessonData;
        
        if (onDemandContent) {
          // Use the on-demand lesson content
          lessonData = onDemandContent.lesson;
        } else {
          // Fetch from regular lesson content
          lessonData = lessonContent[selectedLanguage][rootPath][lessonIndex]["lesson"];
        }

        setLessonType(lessonData.type);
        setLesson(lessonData.story);
        setTest(lessonData.tests);
        setIntro(lessonData.introduction);
        setTitle(lessonData.title);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, [onDemandContent, selectedLanguage, rootPath, lessonIndex]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title
    })
  }, [title])

  const advanceStage = () => {
    if (currentStage === 'story') {
      setCurrentStage('test');
    } else if (currentStage === 'test') {
      // Mark lesson as complete when test is finished
      markLessonAsComplete(selectedLanguage, rootPath, lessonIndex);
      navigation.navigate('LessonComplete');
    }
  }

  return (
    <View className='p-4'>
      {currentStage === 'introduction' ? (
        <View className='flex flex-col h-full p-4 justify-between'>
          <View className='p-2 bg-white border shadow-md rounded-lg'>
            <Text className='text-lg m-2'>{intro}</Text>
          </View>
          
          <RaisedButton variant="continue" buttonStyles="p-4" onPress={() => setCurrentStage('story')}>
            <Text>Continue</Text>
          </RaisedButton>
        </View>
      ) : currentStage === 'story' ? (
        <View>
          <Conversation lesson={lesson} advanceStage={advanceStage} />
        </View>
      ) : (
          <Test test={test} onComplete={advanceStage}/>
      )}
    </View>
  )
}

export default LessonScreen;