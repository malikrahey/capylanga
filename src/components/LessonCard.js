import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Fonts, Spacing } from '../constants/styles';
import { StatusBadge } from './StatusBadge';

const LessonCard = ({ lesson }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.content}>
        <Text style={styles.title}>{lesson.title}</Text>
        <Text style={styles.description}>{lesson.description}</Text>
        <StatusBadge status={lesson.status} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: Spacing.medium,
    marginHorizontal: Spacing.large,
    marginBottom: Spacing.medium,
    shadowColor: Colors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    gap: Spacing.small,
  },
  title: {
    fontSize: Fonts.size.medium,
    fontWeight: Fonts.weight.bold,
    color: Colors.textPrimary,
  },
  description: {
    fontSize: Fonts.size.small,
    color: Colors.textSecondary,
  },
});

export { LessonCard };