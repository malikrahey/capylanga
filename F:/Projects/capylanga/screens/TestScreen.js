import { View, Text, TouchableOpacity } from 'react-native';
import styles from './TestScreen.styles';

export default function TestScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test Screen</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Press Me</Text>
      </TouchableOpacity>
    </View>
  );
}
