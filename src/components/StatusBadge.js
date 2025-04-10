import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, Spacing } from '../constants/styles';

const StatusBadge = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return Colors.success;
      case 'in-progress':
        return Colors.warning;
      case 'not-started':
        return Colors.error;
      default:
        return Colors.textSecondary;
    }
  };

  return (
    <View style={[styles.badge, { backgroundColor: getStatusColor() }]}>
      <Text style={styles.text}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.small / 2,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: Fonts.size.small,
    fontWeight: Fonts.weight.medium,
    color: Colors.background,
    textTransform: 'capitalize',
  },
});

export { StatusBadge };