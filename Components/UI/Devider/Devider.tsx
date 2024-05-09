import React from 'react';
import {Text, View} from 'react-native';
import {useTheme} from '@rneui/themed';

const Devider = ({title}: {title: string}) => {
  const {theme} = useTheme();
  return (
    <View
      style={{
        marginVertical: 5,
        paddingLeft: 10,
        backgroundColor: theme.colors.bgSecondary,
      }}>
      <Text style={{color: theme.colors.primary}}>{title}</Text>
    </View>
  );
};

export default Devider;
