import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLanguage } from '../../hooks/useLanguage';
import Card from '../ui/Card';
import RaisedButton from '../ui/RaisedButton';

export default function Conversation({ route }) {
  const { t } = useLanguage();
  const { lesson } = route.params;

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.title}>{t('conversation')}</Text>
        <Text style={styles.description}>{lesson.conversationDescription}</Text>
        <RaisedButton text={t('startConversation')} onPress={() => {}} />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  card: {
    width: '90%',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
  },
});