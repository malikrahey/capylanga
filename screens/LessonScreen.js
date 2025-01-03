import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import Conversation from '../components/lesson/Conversation';
import Test from '../components/lesson/Test';
import useLanguage from '../hooks/useLanguage';
import { Button } from 'react-native-paper';
import { getLesson } from '../api/lessons';
import * as lessonContent from "../public/lessonContent.json"
import RaisedButton from '../components/ui/RaisedButton';

const LessonScreen = ({ route, navigation, lessonPath }) => {
  const { selectedLanguage } = useLanguage();
  const { rootPath, lessonIndex } = route.params;
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
        console.log(lessonContent)
        // const lessonData = await getLesson(selectedLanguage, rootPath, lessonIndex);
        const lessonData = lessonContent[selectedLanguage][rootPath][lessonIndex]["lesson"]

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
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title
    })
  }, [title])

  const advanceStage = () => {
    setCurrentStage('test');
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
          <Test test={test}/>
      )
      }
      
    </View>
  )
}

export default LessonScreen