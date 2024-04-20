import React from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import InterestItem from '../../UI/InterestItem/InterestItem';

import {RootState, useAppSelector} from '../../../store/store';

const InterestsList = ({navigation}) => {
  const rooms = useAppSelector((state: RootState) => {
    return state.user.rooms.map(item => {
      for (let room of state.rooms.data) {
        console.log('item', item, room.id);
        if (room.id == item)
          return {
            title: room.name,
            lastMsg: room.msgs[room.msgs.length - 1]?.body,
            id: room.id,
          };
      }
    });
  });
  return (
    <FlatList
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Chat', {roomId: item.id});
          }}>
          <InterestItem
            title={item.title}
            msg={item.lastMsg ? item.lastMsg : ''}
          />
        </TouchableOpacity>
      )}
      data={rooms}>
      InterestsList
    </FlatList>
  );
};

export default InterestsList;
