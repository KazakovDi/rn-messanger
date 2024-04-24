import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import InterestsList from '../../Functional/InterestsList/InterestsList';
import {useThemeMode, useTheme} from '@rneui/themed';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import {faPen} from '@fortawesome/free-solid-svg-icons/faPen';
import {faSun} from '@fortawesome/free-solid-svg-icons/faSun';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import FloatingBtn from '../../Functional/FloatIcon/FloatingBtn';
import NavBar from '../../Functional/NavBar/NavBar';
const ChatsList = ({navigation}) => {
  const {mode, setMode} = useThemeMode();
  const {theme} = useTheme();
  return (
    <View style={{backgroundColor: theme.colors.bg, flex: 1}}>
      <View style={{height: 50}}>
        <NavBar
          rightBtn={faMagnifyingGlass}
          rightOnPress={() => {
            navigation.navigate('Find');
          }}>
          <TouchableOpacity
            onPress={() => {
              if (mode === 'light' || mode === 'undefined') setMode('dark');
              else setMode('light');
            }}>
            <FontAwesomeIcon color={theme.colors.bg} size={24} icon={faSun} />
          </TouchableOpacity>
        </NavBar>
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
