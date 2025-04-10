import { StyleSheet } from 'react-native';
import { Colors, Fonts, Spacing } from '../constants/styles';

export const LessonTabStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: Spacing.large,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: Fonts.size.large,
    fontWeight: Fonts.weight.bold,
    color: Colors.textPrimary,
  },
  listContent: {
    paddingBottom: Spacing.large,
  },
});