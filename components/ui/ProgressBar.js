import React, { useEffect } from 'react';
import { View, Text, Animated } from 'react-native';

const ProgressBar = ({ 
  value, 
  label, 
  color = '#4CAF50',
  height = 12,
  width = 200,
  showPercentage = true
}) => {
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const widthInterpolated = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View className="mb-1">
      <View className="flex-row justify-between mb-1">
        <Text className="text-base font-medium">{label}</Text>
        {showPercentage && (
          <Text className="text-base font-medium">{Math.round(value)}%</Text>
        )}
      </View>
      <View 
        style={{ 
          height, 
          width,
          backgroundColor: '#E0E0E0',
          borderRadius: height / 2,
          overflow: 'hidden'
        }}
      >
        <Animated.View
          style={{
            height: '100%',
            width: widthInterpolated,
            backgroundColor: color,
            borderRadius: height / 2,
          }}
        />
      </View>
    </View>
  );
};

export default ProgressBar; 