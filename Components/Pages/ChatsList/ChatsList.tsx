import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Input, Button} from '@rneui/themed';
import InterestsList from '../../Functional/InterestsList/InterestsList';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import FloatingBtn from '../../Functional/FloatIcon/FloatingBtn';

const ChatsList = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <View>
      <View style={{height: 50}}>
        {isActive ? (
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => setIsActive(false)}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </TouchableOpacity>
            <Input placeholder="Поиск" />
          </View>
        ) : null}
        {isActive ? null : (
          <TouchableOpacity onPress={() => setIsActive(true)}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </TouchableOpacity>
        )}
      </View>
      <InterestsList />
      <FloatingBtn pos={{right: 10, bottom: 15}} />
    </View>
  );
};

export default ChatsList;
