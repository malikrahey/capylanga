import React from 'react';
import { View, Image } from 'react-native';

export default function MediaElement() {
  return (
    <View className="my-4 rounded-lg overflow-hidden">
      <Image
        source={{ uri: 'https://via.placeholder.com/300' }}
        className="w-full h-48"
        resizeMode="cover"
      />
    </View>
  );
}
