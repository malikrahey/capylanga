import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { Checkbox, ProgressBar } from 'react-native-paper';
import * as Speech from 'expo-speech';
import useLanguage from '../../hooks/useLanguage';
import RaisedButton from '../ui/RaisedButton';

const ExplanationBubble = ({message}) => {

  return (
    <View className={`justify-center bg-purple-300 rounded-lg m-1 p-4 w-[80%] shadow-md`}>
      <MaterialIcons name="star-rate" size={24} color="black" />
      <Text className='text-lg font-semibold'>{message}</Text>
    </View>
  )
}

const ConversationBubble = ({showTranslations, speaker, message, translation}) => {

  const color = speaker === 'speaker1' ? 'bg-blue-200' : 'bg-red-300';
  const justify = speaker === 'speaker1' ? 'self-start' : 'self-end';
  const face = speaker === 'speaker1' ? 'face' : 'face-2';
  const border = speaker === 'speaker1' ? 'border-blue-600' : 'border-red-600';
  const {selectedLanguage} = useLanguage();
  const voiceIndex = speaker === 'speaker1' ? 0 :2 

  useEffect(() => {

    Speech.speak(message, {
      language: selectedLanguage,
      _voiceIndex: voiceIndex
    })
  }, [])
  
  
  return (
    <View className={`${justify} ${color} rounded-lg m-1 p-4 w-[70%] ${border} border-2 shadow-md`}>
      <MaterialIcons name={`${face}`} size={24} color="black" />
      <Text className='text-lg font-semibold'>{message}</Text>
      {showTranslations && (
        <Text className='text-sm text-gray-600'>{translation}</Text>
      )}
    </View>
  )
}

const Conversation = ({lesson, advanceStage}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showTranslations, setShowTranslations] = useState(true);
  const scrollViewRef = useRef();

  const handleNext = () => {
    const nextStep = currentStep + 1;
    Speech.stop()
    if (nextStep >= lesson.length) {
      advanceStage();
      return;
    }
    setCurrentStep(nextStep);
  };

  const renderedContent = lesson.slice(0, currentStep + 1).map((item, index) => {
    return item.type === 'dialogue' ?
      <ConversationBubble key={index} showTranslations={showTranslations} {...item} /> :
      <ExplanationBubble key={index} {...item} />;
  });

  return (
    <View className='bg-gray-50 p-4 rounded-lg'>
      <ProgressBar progress={currentStep/lesson.length} color="#6366f1" />
      <View className='flex-row items-center ml-2 mb-4'>
        <Text className='text-lg font-medium'>Show Translations: </Text>
        <Checkbox
          status={showTranslations ? 'checked' : 'unchecked'}
          onPress={() => setShowTranslations(!showTranslations)}
          color="#6366f1"
        />
      </View>
      
      <ScrollView className='w-full'
       ref={scrollViewRef}
       onContentSizeChange={() => scrollViewRef.current.scrollToEnd({animated: true})}
       contentContainerStyle={{
        paddingBottom: 200
       }}
      >
        {renderedContent}
        <RaisedButton variant={'continue'} buttonStyles="p-4 mt-4" onPress={handleNext}>
          <Text className='text-white font-bold'>Next</Text>
        </RaisedButton>
      </ScrollView>
    </View>
  );
};
export default Conversation