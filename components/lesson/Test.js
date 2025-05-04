import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Test() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is a test component.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#edf2f7',
    borderRadius: 10,
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    color: '#2d3748',
  },
});