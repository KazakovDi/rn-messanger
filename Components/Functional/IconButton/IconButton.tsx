import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const IconButton = ({title, onPress, icon}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <FontAwesomeIcon size={35} icon={icon} />
        <Text>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default IconButton;
