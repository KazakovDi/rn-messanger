import React from 'react';
import {View, Text, Image, Touchable, TouchableOpacity} from 'react-native';

import {useTheme} from '@rneui/themed';
const Message = ({isUser, type, uri, body, onLongPress}) => {
  const {theme} = useTheme();
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
            backgroundColor: !isUser
              ? theme.colors.msgOpposite
              : theme.colors.msg,
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
            <Text style={{color: theme.colors.primary}}>{body}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Message;
