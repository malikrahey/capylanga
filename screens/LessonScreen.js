import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import Conversation from '../components/lesson/Conversation';
import Test from '../components/lesson/Test';
import * as lessonContent from '../public/lessons/lessonContent.json'
import useLanguage from '../hooks/useLanguage';
import { Button } from 'react-native-paper';

const LessonScreen = ({route, navigation, lessonPath}) => {

  const {selectedLanguage} = useLanguage();
  const {rootPath, lessonIndex} = route.params
  const [lesson, setLesson] = useState([]);
  const [intro, setIntro] = useState('');
  const [title, setTitle] = useState('');
  const [lessonType, setLessonType] = useState(null);
  const [test, setTest] = useState([]);
  const [currentStage, setCurrentStage] = useState('introduction')
  const [shouldShowTranslation, setShouldShowTranslation] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(rootPath)
        const lessonContents = lessonContent[selectedLanguage][rootPath][lessonIndex]['lesson'];
        console.log(JSON.stringify(lessonContents))

        setLessonType(lessonContents.type);
        setLesson(lessonContents.story);
        setTest(lessonContents.tests);
        setIntro(lessonContents.introduction);
        setTitle(lessonContents.title);
      } catch (e) {
        console.error(e);
      }
    }

    fetchData();
    
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title
    })
  }, [title])

  const advanceStage = () => {
    setCurrentStage('test');
  }

  return (
    <View className=''>
      {currentStage === 'introduction' ? (
        <View>
          <Text className='text-lg m-2'>{intro}</Text>
          <Button onPress={() => setCurrentStage('story')}>
            <Text>Continue</Text>
          </Button>
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