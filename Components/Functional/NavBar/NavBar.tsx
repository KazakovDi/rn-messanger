import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const NavBar = ({leftBtn, leftOnPress, rightBtn, rightOnPress, children}) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 15,
        justifyContent: 'space-between',

        width: '100%',
      }}>
      <TouchableOpacity style={{paddingHorizontal: 2}} onPress={leftOnPress}>
        <FontAwesomeIcon size={28} icon={leftBtn} />
      </TouchableOpacity>
      <View style={{flexGrow: 1}}>{children}</View>
      <TouchableOpacity style={{paddingHorizontal: 2}} onPress={rightOnPress}>
        <FontAwesomeIcon size={28} icon={rightBtn} />
      </TouchableOpacity>
    </View>
  );
};

export default NavBar;
