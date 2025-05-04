import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Conversation() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is a conversation component.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#e2e8f0',
    borderRadius: 10,
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    color: '#2d3748',
  },
});