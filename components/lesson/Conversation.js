import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLanguage } from '../../hooks/useLanguage';

export const Conversation = ({ conversation }) => {
  const { currentLanguage } = useLanguage();

  return (
    <View style={styles.container}>
      <Text style={styles.language}>{currentLanguage}</Text>
      <View style={styles.conversationContainer}>
        {conversation.map((item, index) => (
          <View key={index} style={styles.messageContainer}>
            <Text style={styles.speaker}>{item.speaker}:</Text>
            <Text style={styles.message}>{item.message}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  language: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#343a40',
  },
  conversationContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  messageContainer: {
    marginBottom: 12,
  },
  speaker: {
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 4,
  },
  message: {
    color: '#212529',
    lineHeight: 20,
  },
});