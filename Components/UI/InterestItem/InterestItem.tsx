import React from 'react';
import {Avatar} from '@rneui/themed';
import {View, Text} from 'react-native';
import {useTheme} from '@rneui/themed';
const InterestItem = ({title, msg}) => {
  const {theme} = useTheme();
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
        <Text style={{color: theme.colors.primary, fontWeight: '700'}}>
          {title}
        </Text>
        <Text style={{color: theme.colors.primary}} numberOfLines={1}>
          {msg}
        </Text>
      </View>
    </View>
  );
};

export default InterestItem;
