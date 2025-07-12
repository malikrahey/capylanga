import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';

const GetCreditsScreen = () => {
  const handleWatchVideo = () => {
    // TODO: Implement video watching logic and credit reward
    console.log('Watch Video button pressed');
    // Example: reward credits after video
    // updateCredits(credits + 1);
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-100">
      <View className="flex-1 justify-center items-center">
        <Text className="text-2xl font-bold mb-8">Get More Credits</Text>
        <TouchableOpacity
          className="bg-blue-500 p-4 rounded-xl shadow-md"
          onPress={handleWatchVideo}
        >
          <Text className="text-white text-lg font-bold">Watch a video</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default GetCreditsScreen; 