import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Input, Button} from '@rneui/themed';
import InterestsList from '../../Functional/InterestsList/InterestsList';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import {faPen} from '@fortawesome/free-solid-svg-icons/faPen';

import FloatingBtn from '../../Functional/FloatIcon/FloatingBtn';

const ChatsList = ({navigation}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <View style={{flex: 1, marginHorizontal: 10}}>
      <View style={{height: 50}}>
        {isActive ? (
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => setIsActive(false)}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </TouchableOpacity>
            <Input onChangeText={e => {}} placeholder="Поиск" />
          </View>
        ) : null}
        {isActive ? null : (
          <TouchableOpacity onPress={() => setIsActive(true)}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </TouchableOpacity>
        )}
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
