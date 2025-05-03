import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLanguage } from '../../hooks/useLanguage';

export const Test = ({ questions }) => {
  const { currentLanguage } = useLanguage();

  return (
    <View style={styles.container}>
      <Text style={styles.language}>{currentLanguage}</Text>
      <View style={styles.questionsContainer}>
        {questions.map((question, index) => (
          <View key={index} style={styles.questionContainer}>
            <Text style={styles.question}>{question.question}</Text>
            {question.options.map((option, optionIndex) => (
              <Text key={optionIndex} style={styles.option}>
                {option}
              </Text>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  language: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#343a40',
  },
  questionsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  questionContainer: {
    marginBottom: 16,
  },
  question: {
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 8,
  },
  option: {
    color: '#212529',
    marginBottom: 4,
    lineHeight: 20,
  },
});