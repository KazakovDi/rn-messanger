import React from 'react';
import {View, Text, Image} from 'react-native';
const Message = ({isUser, type, uri, body}) => {
  console.log('uri', type, uri, body);
  return (
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
          width: '50%',
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
  );
};

export default Message;
