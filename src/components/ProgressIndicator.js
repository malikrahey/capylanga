import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Spacing } from '../constants/styles';

const ProgressIndicator = ({ progress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <View style={[styles.progress, { width: `${progress * 100}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 8,
  },
  track: {
    flex: 1,
    backgroundColor: Colors.textSecondary,
    opacity: 0.2,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
});

export { ProgressIndicator };