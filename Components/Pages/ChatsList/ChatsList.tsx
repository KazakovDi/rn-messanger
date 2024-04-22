import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import InterestsList from '../../Functional/InterestsList/InterestsList';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import {faPen} from '@fortawesome/free-solid-svg-icons/faPen';

import FloatingBtn from '../../Functional/FloatIcon/FloatingBtn';
import NavBar from '../../Functional/NavBar/NavBar';
const ChatsList = ({navigation}) => {
  return (
    <View style={{flex: 1, marginHorizontal: 10}}>
      <View style={{height: 50}}>
        <NavBar
          rightBtn={faMagnifyingGlass}
          rightOnPress={() => {
            navigation.navigate('Find');
          }}
        />
      </View>
      <InterestsList navigation={navigation} />
      <FloatingBtn
        onPress={() => navigation.navigate('Create')}
        pos={{right: 10, bottom: 15}}
        icon={faPen}
      />
    </View>
  );
};

export default ChatsList;
