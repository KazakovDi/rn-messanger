import React from 'react';
import {Text, View} from 'react-native';
import {useTheme} from '@rneui/themed';

const Devider = ({title}) => {
  return (
    <View
      style={{marginVertical: 5, paddingLeft: 10, backgroundColor: '#c7c7c7'}}>
      <Text style={{color: '#000'}}>{title}</Text>
    </View>
  );
};

export default Devider;
