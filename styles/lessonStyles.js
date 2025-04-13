import { StyleSheet } from 'react-native';

export const lessonStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  introContainer: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  introBox: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  introText: {
    fontSize: 18,
    margin: 10,
    color: '#333',
  },
  continueButton: {
    padding: 15,
    backgroundColor: '#6200ee',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  storyContainer: {
    flex: 1,
  },
});