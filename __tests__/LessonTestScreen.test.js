import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LessonTestScreen from '../screens/LessonTestScreen';

const mockQuestions = [
  {
    question: 'What is 2 + 2?',
    answers: ['3', '4', '5'],
    correctAnswer: '4',
  },
  {
    question: 'What is the capital of France?',
    answers: ['London', 'Paris', 'Berlin'],
    correctAnswer: 'Paris',
  },
];

const mockNavigation = {
  navigate: jest.fn(),
};

describe('LessonTestScreen', () => {
  it('handles incorrect answer by readding question to the end', () => {
    const { getByText } = render(
      <LessonTestScreen
        route={{ params: { questions: mockQuestions } }}
        navigation={mockNavigation}
      />
    );

    fireEvent.press(getByText('3'));
    expect(mockNavigation.navigate).not.toHaveBeenCalled();
  });

  it('navigates to results when all questions are answered', () => {
    const { getByText } = render(
      <LessonTestScreen
        route={{ params: { questions: mockQuestions } }}
        navigation={mockNavigation}
      />
    );

    fireEvent.press(getByText('4'));
    fireEvent.press(getByText('Paris'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('TestResults', {
      score: 2,
      totalQuestions: 2,
    });
  });
});