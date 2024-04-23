import React from 'react';
import {View, Text, Image, Touchable, TouchableOpacity} from 'react-native';

import {useAppDispatch} from '../../store/store';
const Message = ({isUser, type, uri, body, onLongPress}) => {
  return (
    <TouchableOpacity delayPressIn={500} onLongPress={onLongPress}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: !isUser ? 'flex-start' : 'flex-end',
          marginVertical: 8,
        }}>
        <View
          style={{
            backgroundColor: !isUser ? 'red' : 'blue',
            width: '80%',
            paddingHorizontal: 5,
            paddingVertical: 10,
            borderRadius: 10,
          }}>
          {type === 'img' ? (
            <Image
              source={{
                uri: uri.uri,
              }}
              style={{width: '100%', height: 350}}
            />
          ) : (
            <Text>{body}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Message;
