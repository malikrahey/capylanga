import { View, Text, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';
import { addCredits, getCredits, CREDIT_REWARDS } from '../api/credits';
import { MaterialIcons } from '@expo/vector-icons';

const GetCreditsScreen = ({navigation}) => {

  const [loaded, setLoaded] = useState(false);
  const [credits, setCredits] = useState(0);

  const rewarded = RewardedAd.createForAdRequest(TestIds.REWARDED);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Get Credits",
    })
  }, []);

  // Load credits when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      const loadCredits = async () => {
        try {
          const currentCredits = await getCredits();
          setCredits(currentCredits);
        } catch (error) {
          console.error('Error loading credits:', error);
        }
      };
      loadCredits();
    }, [])
  );

  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      setLoaded(true);
    });



    const unsubscribeEarned = rewarded.addAdEventListener(RewardedAdEventType.EARNED_REWARD, async (reward) => {
      console.log('Ad rewarded');
      try {
        const newCredits = await addCredits(CREDIT_REWARDS.REWARDED_VIDEO);
        setCredits(newCredits);
        Alert.alert(
          'Credits Earned!', 
          `You've earned ${CREDIT_REWARDS.REWARDED_VIDEO} credits! You now have ${newCredits} credits total.`,
          [{ text: 'Great!', style: 'default' }]
        );
      } catch (error) {
        console.error('Error adding credits:', error);
        Alert.alert('Error', 'Failed to add credits. Please try again.');
      }
    });

    rewarded.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    }
  }, []);

  const handleWatchVideo = () => {
    if (loaded) {
      try {
        rewarded.show();  
      } catch (error) {
        Alert.alert('Error', 'Failed to show video. Please try again.');
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-100">
      <View className="flex-1 justify-center items-center p-6">
        {/* Credits Display */}
        <View className="bg-white p-6 rounded-xl shadow-md mb-8 items-center">
          <MaterialIcons name="stars" size={48} color="#f59e0b" />
          <Text className="text-3xl font-bold mt-2">{credits}</Text>
          <Text className="text-lg text-gray-600">Credits Available</Text>
        </View>

        {/* Get Credits Section */}
        <View className="bg-white p-6 rounded-xl shadow-md w-full items-center">
          <Text className="text-2xl font-bold mb-4">Earn More Credits</Text>
          <Text className="text-gray-600 text-center mb-6">
            Watch a short video to earn {CREDIT_REWARDS.REWARDED_VIDEO} credits instantly!
          </Text>
          
          <TouchableOpacity
            className={`bg-blue-500 p-4 rounded-xl shadow-md ${!loaded ? 'opacity-50' : ''}`}
            onPress={handleWatchVideo}
            disabled={!loaded}
          >
            <View className="flex-row items-center">
              <MaterialIcons name="play-circle-fill" size={24} color="white" />
              <Text className="text-white text-lg font-bold ml-2">
                {loaded ? 'Watch Video' : 'Loading...'}
              </Text>
            </View>
          </TouchableOpacity>

          {!loaded && (
            <Text className="text-gray-500 text-sm mt-2">Please wait while the video loads...</Text>
          )}
        </View>

        {/* Credits Usage Info */}
        <View className="bg-gray-50 p-4 rounded-lg mt-6 w-full">
          <Text className="text-lg font-semibold mb-2 text-center">Credit Costs:</Text>
          <Text className="text-gray-700 text-center">• Create Personalized Course: 3 credits</Text>
          <Text className="text-gray-700 text-center">• Generate On-Demand Lesson: 1 credit</Text>
          <Text className="text-gray-700 text-center">• Generate Course Module: 1 credit</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GetCreditsScreen; 