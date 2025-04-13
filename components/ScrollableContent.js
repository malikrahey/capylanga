import React from 'react';
import { ScrollView } from 'react-native';

export default function ScrollableContent({ children }) {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="flex-1"
    >
      {children}
    </ScrollView>
  );
}
