import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useTheme} from '@rneui/themed';

const IconButton = ({title, onPress, icon}) => {
  const {theme} = useTheme();
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <FontAwesomeIcon
          style={{marginHorizontal: 20, color: theme.colors.primary}}
          size={35}
          icon={icon}
        />
        <Text style={{color: theme.colors.primary}}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default IconButton;
