import React from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import InterestItem from '../../UI/InterestItem/InterestItem';

import {RootState, useAppSelector} from '../../../store/store';

const InterestsList = ({navigation}) => {
  const rooms = useAppSelector((state: RootState) => state.rooms.data);
  return (
    <FlatList
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Chat', {roomId: item.id});
          }}>
          <InterestItem
            avatarUrl={item.avatarUrl}
            title={item.name}
            msg={item.msgs.length ? item.msgs[item.msgs.length - 1].body : ''}
          />
        </TouchableOpacity>
      )}
      data={rooms}
      style={{paddingHorizontal: 5, marginTop: 10}}
    />
  );
};

export default InterestsList;
