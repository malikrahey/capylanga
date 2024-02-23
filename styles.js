import { StyleSheet, Platform, StatusBar } from 'react-native'
import { DefaultTheme } from 'react-native-paper';

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});


export default styles;