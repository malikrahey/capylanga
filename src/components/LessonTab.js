import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { LessonTabStyles } from './LessonTab.styles';
import { StatusBadge } from './StatusBadge';
import { LessonCard } from './LessonCard';
import { ProgressIndicator } from './ProgressIndicator';
import { LoadingSkeleton } from './LoadingSkeleton';

export const LessonTab = ({ lessons, loading, onPressLesson }) => {
  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <View style={LessonTabStyles.container}>
      <FlatList
        data={lessons}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onPressLesson(item)}>
            <LessonCard lesson={item} />
          </TouchableOpacity>
        )}
        ListHeaderComponent={() => (
          <View style={LessonTabStyles.header}>
            <Text style={LessonTabStyles.title}>Lessons</Text>
            <ProgressIndicator progress={lessons.filter(lesson => lesson.completed).length / lessons.length} />
          </View>
        )}
        contentContainerStyle={LessonTabStyles.listContent}
      />
    </View>
  );
};