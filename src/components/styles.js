import { StyleSheet, Platform, StatusBar } from 'react-native'
import { DefaultTheme } from 'react-native-paper';

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  lessonContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  lessonTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333'
  },
  lessonContent: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    marginBottom: 20
  },
  lessonButton: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20
  },
  lessonButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});


export default styles;