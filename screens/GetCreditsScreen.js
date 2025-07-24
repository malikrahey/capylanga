import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';
import { StatusBar } from 'expo-status-bar';

const GetCreditsScreen = () => {

  const [loaded, setLoaded] = useState(false);

  const rewarded = RewardedAd.createForAdRequest(TestIds.REWARDED);

  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      setLoaded(true);
    });


    const unsubscribeEarned = rewarded.addAdEventListener(RewardedAdEventType.EARNED_REWARD, (reward) => {
      console.log('Ad rewarded');
    });

    rewarded.load();

    return () => {
      unsubscribeLoaded();
      
      unsubscribeEarned();
    }
  }, []);

  const handleWatchVideo = () => {
    if (loaded) {
      rewarded.show();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-100">
      <View className="flex-1 justify-center items-center">
        <Text className="text-2xl font-bold mb-8">Get More Credits</Text>
        <TouchableOpacity
          className={`bg-blue-500 p-4 rounded-xl shadow-md ${!loaded ? 'opacity-50' : ''}`}
          onPress={handleWatchVideo}
          disabled={!loaded}
        >
          <Text className="text-white text-lg font-bold">Watch a video</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default GetCreditsScreen; 