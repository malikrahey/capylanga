import { StyleSheet } from 'react-native';
import { colors, fonts, spacing } from './designSystem';

export const lessonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.large,
    backgroundColor: colors.primary,
  },
  title: {
    fontSize: fonts.size.large,
    fontWeight: fonts.weight.bold,
    color: colors.white,
  },
  content: {
    padding: spacing.large,
  },
  text: {
    fontSize: fonts.size.medium,
    color: colors.text,
    lineHeight: fonts.lineHeight,
  },
});
