import React, {useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, TextInput} from 'react-native';

import {faCircleArrowRight} from '@fortawesome/free-solid-svg-icons/faCircleArrowRight';
import {faMicrophone} from '@fortawesome/free-solid-svg-icons/faMicrophone';
import {faPaperclip} from '@fortawesome/free-solid-svg-icons/faPaperclip';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const ChatInput = ({onSendMsg}) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <View
      style={{
        paddingVertical: 5,
        display: 'flex',
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'flex-end',
      }}>
      <TextInput
        style={{maxHeight: 110, width: '80%'}}
        multiline
        placeholder="отправить"
        onChangeText={e => {
          setIsActive(!!e);
        }}
      />
      <TouchableOpacity>
        <FontAwesomeIcon
          size={30}
          icon={isActive ? faCircleArrowRight : faMicrophone}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onSendMsg}>
        <FontAwesomeIcon size={30} icon={faPaperclip} />
      </TouchableOpacity>
    </View>
  );
};

export default ChatInput;
