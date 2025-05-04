import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useLanguage } from '../../hooks/useLanguage';

export default function FarmTab() {
  const { t } = useLanguage();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('farm')}</Text>
      <Image source={require('../../assets/capyai.png')} style={styles.image} />
      <Text style={styles.description}>{t('farmDescription')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f4f7',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
  },
});