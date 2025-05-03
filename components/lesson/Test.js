import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Card from '../ui/Card';
import RaisedButton from '../ui/RaisedButton';

export default function Test() {
  return (
    <View className="flex-1 p-4 bg-blue-50">
      <Card className="mb-4 p-4 bg-white rounded-lg shadow-md">
        <Text className="text-lg font-bold text-gray-800 mb-2">Question 1</Text>
        <Text className="text-gray-600 mb-4">What is the correct translation for 'Hello'?</Text>
        <View className="space-y-2">
          <RaisedButton className="bg-blue-100 p-3 rounded-lg">
            <Text className="text-blue-800">Hola</Text>
          </RaisedButton>
          <RaisedButton className="bg-blue-100 p-3 rounded-lg">
            <Text className="text-blue-800">Bonjour</Text>
          </RaisedButton>
          <RaisedButton className="bg-blue-100 p-3 rounded-lg">
            <Text className="text-blue-800">Ciao</Text>
          </RaisedButton>
        </View>
      </Card>
      <View className="flex-row justify-between mt-4">
        <RaisedButton className="bg-gray-200 p-3 rounded-lg flex-1 mr-2">
          <Text className="text-gray-800">Previous</Text>
        </RaisedButton>
        <RaisedButton className="bg-blue-500 p-3 rounded-lg flex-1 ml-2">
          <Text className="text-white">Next</Text>
        </RaisedButton>
      </View>
    </View>
  );
}
