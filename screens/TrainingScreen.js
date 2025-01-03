import React, {useLayoutEffect, useState} from 'react'
import Test from '../components/lesson/Test';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

const TrainingScreen = ({route}) => {
  const navigation = useNavigation();
  const {sessionCards} = route.params;
  const [index, setIndex] = useState(0);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: ''
  })
  }, [])


  return (
    <View>
      <Test test={sessionCards} isTraining={true} />
    </View>
  )
}

export default TrainingScreen