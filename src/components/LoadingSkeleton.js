import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Spacing } from '../constants/styles';

const LoadingSkeleton = () => {
  return (
    <View style={styles.container}>
      {[...Array(5)].map((_, index) => (
        <View key={index} style={styles.card} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.large,
    backgroundColor: Colors.background,
  },
  card: {
    height: 100,
    backgroundColor: Colors.textSecondary,
    opacity: 0.1,
    borderRadius: 8,
    marginBottom: Spacing.medium,
  },
});

export { LoadingSkeleton };