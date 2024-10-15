import React, {useState} from 'react'
import Test from '../components/lesson/Test';

const TrainingScreen = ({navigation}) => {
  const {sessionCards} = navigation.getParam('sessionCards');
  const [index, setIndex] = useState(0);


  return (
    <View>
      <Test test={sessionCards} />
    </View>
  )
}

export default TrainingScreen