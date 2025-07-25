import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getCredits } from '../../api/credits';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const CreditsDisplay = ({ 
  showGetMore = true, 
  size = 'medium', 
  variant = 'default',
  onPress 
}) => {
  const [credits, setCredits] = useState(0);
  const navigation = useNavigation();

  // Load credits when component is focused
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

  const getStyles = () => {
    const baseClasses = "flex-row items-center";
    const sizeClasses = {
      small: "p-2",
      medium: "p-3",
      large: "p-4"
    };
    const variantClasses = {
      default: "bg-white rounded-lg shadow-sm",
      card: "bg-white rounded-xl shadow-md",
      minimal: "bg-transparent",
      compact: "bg-gray-100 rounded-full px-3 py-1"
    };

    return `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]}`;
  };

  const getTextSize = () => {
    switch (size) {
      case 'small': return 'text-sm';
      case 'large': return 'text-xl';
      default: return 'text-lg';
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'small': return 16;
      case 'large': return 24;
      default: return 20;
    }
  };

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (showGetMore) {
      navigation.navigate('GetCreditsScreen');
    }
  };

  return (
    <TouchableOpacity 
      className={getStyles()}
      onPress={handlePress}
      disabled={!showGetMore && !onPress}
    >
      <MaterialIcons name="stars" size={getIconSize()} color="#8b5cf6" />
      <Text className={`${getTextSize()} font-semibold ml-2`}>{credits}</Text>
      
      {showGetMore && (
        <MaterialIcons name="add" size={getIconSize()} color="#6b7280" style={{ marginLeft: 8 }} />
      )}
    </TouchableOpacity>
  );
};

export default CreditsDisplay; 