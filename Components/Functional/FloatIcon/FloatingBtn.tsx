import React from 'react';
import {Button} from '@rneui/themed';
import {faUserPlus} from '@fortawesome/free-solid-svg-icons/faUserPlus';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {TouchableOpacity, View} from 'react-native';
const FloatingBtn = ({icon, pos}) => {
  return (
    <TouchableOpacity>
      <View
        style={{
          width: 64,
          height: 64,
          backgroundColor: 'red',
          borderRadius: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          ...pos,
        }}>
        <FontAwesomeIcon icon={faUserPlus}></FontAwesomeIcon>
      </View>
    </TouchableOpacity>
  );
};

export default FloatingBtn;
