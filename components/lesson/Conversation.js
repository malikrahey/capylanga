import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { Checkbox, ProgressBar } from 'react-native-paper';
import * as Speech from 'expo-speech';
import useLanguage from '../../hooks/useLanguage';
import RaisedButton from '../ui/RaisedButton';

const ExplanationBubble = ({message}) => {

  return (
    <View className="justify-center bg-purple-600 rounded-2xl mx-4 my-3 p-5 shadow-lg">
      <View className="flex-row items-center mb-2">
        <View className="bg-white bg-opacity-20 rounded-full p-2 mr-3">
          <MaterialIcons name="lightbulb" size={20} color="white" />
        </View>
        <Text className="text-xs font-medium text-white opacity-80 uppercase tracking-wide">Explanation</Text>
      </View>
      <Text className="text-lg font-medium text-white leading-relaxed">{message}</Text>
    </View>
  )
}

const ConversationBubble = ({showTranslations, speaker, message, translation}) => {

  const isUser = speaker === 'speaker1';
  const bubbleStyles = isUser 
    ? 'bg-blue-500 self-end mr-4 ml-12' 
    : 'bg-gray-100 self-start ml-4 mr-12';
  const textColor = isUser ? 'text-white' : 'text-gray-800';
  const translationColor = isUser ? 'text-blue-100' : 'text-gray-500';
  const iconColor = isUser ? 'white' : '#374151';
  const face = speaker === 'speaker1' ? 'person' : 'support-agent';
  const {selectedLanguage} = useLanguage();
  const voiceIndex = speaker === 'speaker1' ? 0 : 2 

  useEffect(() => {
    Speech.speak(message, {
      language: selectedLanguage,
      _voiceIndex: voiceIndex
    })
  }, [])
  
  return (
    <View className="w-full my-2">
      <View className={`${bubbleStyles} rounded-2xl px-5 py-4 shadow-md max-w-[85%]`}>
        <View className="flex-row items-center mb-2">
          <View className={`${isUser ? 'bg-white/20' : 'bg-gray-200'} rounded-full p-1.5 mr-2`}>
            <MaterialIcons name={face} size={16} color={iconColor} />
          </View>
          <Text className={`text-xs font-medium ${isUser ? 'text-white/80' : 'text-gray-500'} uppercase tracking-wide`}>
            {isUser ? 'You' : 'Teacher'}
          </Text>
        </View>
        <Text className={`text-lg font-medium ${textColor} leading-relaxed mb-1`}>
          {message}
        </Text>
        {showTranslations && translation && (
          <View className={`mt-3 pt-3 ${isUser ? 'border-t border-white/20' : 'border-t border-gray-200'}`}>
            <Text className={`text-sm ${translationColor} italic leading-relaxed`}>
              {translation}
            </Text>
          </View>
        )}
      </View>
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
    <View className='flex-1 relative bg-gray-50'>
      
      <View className='absolute top-0 z-[5] bg-white/95 backdrop-blur-sm w-full shadow-sm'>
        <View className='px-4 pt-3'>
          <ProgressBar animatedValue={currentStep/lesson.length} />
        </View>
        <View className='flex-row items-center px-4 pb-3 pt-2'>
          <Text className='text-base font-medium text-gray-700 mr-3'>Show Translations</Text>
          <Checkbox
            borderColor='#6366f1'
            color='#6366f1'
            status={showTranslations ? 'checked' : 'unchecked'}
            onPress={() => setShowTranslations(!showTranslations)}
          />
        </View>
      </View>
      
      <ScrollView 
        className='w-full flex-1 mt-20'
        ref={scrollViewRef}
        contentContainerStyle={{
          paddingBottom: 120,
          paddingTop: 20
        }}
        showsVerticalScrollIndicator={false}
      >
        {renderedContent}
        
      </ScrollView>
      <View className='absolute bottom-6 left-4 right-4 z-100'>
          <RaisedButton 
            variant={'continue'} 
            buttonStyles="px-8 py-4 min-w-[200px] rounded-2xl shadow-lg"
            onPress={handleNext}
          >
            <Text className='text-lg font-bold text-white'>Next</Text>
          </RaisedButton>
      </View>
    </View>
  );
};
export default Conversation