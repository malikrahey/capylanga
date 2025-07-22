import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { Checkbox, ProgressBar } from 'react-native-paper';
import * as Speech from 'expo-speech';
import useLanguage from '../../hooks/useLanguage';
import RaisedButton from '../ui/RaisedButton';

const ExplanationBubble = ({message}) => {

  return (
    <View className={`justify-center bg-purple-300 rounded-lg m-1 p-4 w-[80%]`}>
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
    <View className={`${justify} ${color} rounded-lg m-1 p-4 w-[70%] ${border} border-2`}>
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

  // Simple scroll to bottom after new message appears
  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 50); // Give time for new content to render
  };

  // Trigger scroll when new message appears
  useEffect(() => {
    if (currentStep > 0) {
      scrollToBottom();
    }
  }, [currentStep]);


  const renderedContent = lesson.slice(0, currentStep + 1).map((item, index) => {
    return item.type === 'dialogue' ?
      <ConversationBubble key={index} showTranslations={showTranslations} {...item} /> :
      <ExplanationBubble key={index} {...item} />;
  });

  return (
    <View className='flex-1 relative'>
      
      <View className='absolute top-0 z-[5] bg-white w-full'>
        <View className=''>
          <ProgressBar  animatedValue={currentStep/lesson.length} />
        </View>
        <View className='flex-row items-center'>
          <Text className='text-lg'>Show Translations: </Text>
          <Checkbox
            borderColor='black'
            size={10}
            status={showTranslations ? 'checked' : 'unchecked'}
            onPress={() => setShowTranslations(!showTranslations)}
          />
        </View>
      </View>
      
      <ScrollView 
        className='w-full h-[80vh] mt-8 pt-8'
        ref={scrollViewRef}
        contentContainerStyle={{
          paddingBottom: 150
        }}
        showsVerticalScrollIndicator={false}
      >
        {renderedContent}
        
      </ScrollView>
      <View className='mt-6 items-center absolute bottom-10 left-0 right-0 z-100'>
          <RaisedButton 
            variant={'continue'} 
            buttonStyles="px-8 py-4 min-w-[200px]"
            onPress={handleNext}
          >
            <Text className='text-lg font-bold text-gray-800'>Next</Text>
          </RaisedButton>
      </View>
    </View>
  );
};
export default Conversation