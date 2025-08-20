import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
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
    <View className='flex-1 bg-gray-50'>
      {currentStage === 'introduction' ? (
        <View className='flex-1 px-6 py-8 justify-between'>
          {/* Header Section */}
          <View className='flex-1 justify-center'>
            <View className='items-center mb-8'>
              <View className='bg-purple-500 rounded-full p-6 mb-6 shadow-lg'>
                <MaterialIcons name="school" size={48} color="white" />
              </View>
              <Text className='text-2xl font-bold text-gray-800 text-center mb-2'>
                {title}
              </Text>
              <View className='w-16 h-1 bg-purple-500 rounded-full'></View>
            </View>
            
            {/* Introduction Content */}
            <View className='bg-white rounded-3xl p-6 mx-2 shadow-lg border border-gray-100'>
              <View className='flex-row items-center mb-4'>
                <View className='bg-purple-100 rounded-full p-2 mr-3'>
                  <MaterialIcons name="info" size={20} color="#7c3aed" />
                </View>
                <Text className='text-sm font-semibold text-purple-600 uppercase tracking-wide'>
                  Lesson Overview
                </Text>
              </View>
              <Text className='text-lg text-gray-700 leading-relaxed'>
                {intro}
              </Text>
            </View>
          </View>
          
          {/* Action Section */}
          <View className='pt-6'>
            <RaisedButton 
              variant="continue" 
              buttonStyles="mx-4 rounded-2xl shadow-lg" 
              onPress={() => setCurrentStage('story')}
            >
              <View className='flex-row items-center'>
                <Text className='text-lg font-bold text-white mr-2'>Start Lesson</Text>
                <MaterialIcons name="arrow-forward" size={20} color="white" />
              </View>
            </RaisedButton>
          </View>
        </View>
      ) : currentStage === 'story' ? (
        <Conversation lesson={lesson} advanceStage={advanceStage} />
      ) : (
        <ScrollView className='p-4'>
          <Test test={test} onComplete={advanceStage}/>
        </ScrollView>
      )}
    </View>
  )
}

export default LessonScreen;