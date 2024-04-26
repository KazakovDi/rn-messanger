import React from 'react';
import {useTheme} from '@rneui/themed';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Button, TouchableOpacity, View} from 'react-native';
const FloatingBtn = ({icon, pos, Press}) => {
  const {theme} = useTheme();
  return (
    <TouchableOpacity onPress={Press}>
      <View
        style={{
          width: 64,
          height: 64,
          backgroundColor: theme.colors.primary,
          borderRadius: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          ...pos,
        }}>
        <FontAwesomeIcon color={theme.colors.bg} icon={icon} />
      </View>
    </TouchableOpacity>
  );
};

export default FloatingBtn;
