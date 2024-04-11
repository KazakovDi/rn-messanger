import React from 'react';
import {Button, ThemeProvider, Avatar} from '@rneui/themed';
import {View, Text} from 'react-native';

const InterestItem = ({avatar, title, msg}) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        paddingVertical: 10,
      }}>
      <Avatar
        size={64}
        rounded
        title={title[0] + title[1]}
        containerStyle={{backgroundColor: '#6733b9'}}
      />
      <View style={{marginLeft: 15, paddingVertical: 6}}>
        <Text style={{fontWeight: 700}}>{title}</Text>
        <Text numberOfLines={1}>{msg}</Text>
      </View>
    </View>
  );
};

export default InterestItem;
